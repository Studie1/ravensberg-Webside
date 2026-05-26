import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";

interface ImportOptions {
  pdf: string;
  ics: string;
  slug: string;
  title: string;
}

interface CalendarEvent {
  uid: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
}

const USAGE = `Usage:
  bun run import:semester -- --pdf "/path/to/sempro.pdf" --ics "/path/to/calendar.ics" --slug "sose-2026" --title "Sommersemester 2026"`;

function parseArgs(args: string[]): ImportOptions {
  const values = new Map<string, string>();

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg.startsWith("--")) continue;

    const key = arg.slice(2);
    const value = args[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}\n\n${USAGE}`);
    }

    values.set(key, value);
    i += 1;
  }

  const pdf = values.get("pdf");
  const ics = values.get("ics");
  const slug = values.get("slug");
  const title = values.get("title");

  if (!pdf || !ics || !slug || !title) {
    throw new Error(`Missing required arguments.\n\n${USAGE}`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug must use lowercase letters, numbers, and hyphens only.");
  }

  return {
    pdf: resolve(pdf),
    ics: resolve(ics),
    slug,
    title,
  };
}

function unfoldIcs(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .reduce<string[]>((lines, line) => {
      if ((line.startsWith(" ") || line.startsWith("\t")) && lines.length > 0) {
        lines[lines.length - 1] += line.slice(1);
      } else {
        lines.push(line);
      }
      return lines;
    }, []);
}

function unescapeIcsValue(value: string): string {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function getTimeZoneOffset(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(date);
  const offset = parts.find((part) => part.type === "timeZoneName")?.value;
  const match = offset?.match(/GMT([+-]\d{2}:\d{2})/);

  if (!match) {
    throw new Error(`Could not determine timezone offset for ${timeZone}.`);
  }

  return match[1];
}

function parseIcsDate(rawValue: string, params: string[]): string {
  const value = rawValue.trim();
  const tzid = params.find((param) => param.startsWith("TZID="))?.slice("TZID=".length);
  const isDateOnly = params.includes("VALUE=DATE");

  const dateOnlyMatch = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (dateOnlyMatch || isDateOnly) {
    const match = dateOnlyMatch ?? value.match(/^(\d{4})(\d{2})(\d{2})/);
    if (!match) throw new Error(`Unsupported date value: ${value}`);
    return `${match[1]}-${match[2]}-${match[3]}T00:00:00`;
  }

  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
  if (!match) {
    throw new Error(`Unsupported date value: ${value}`);
  }

  const [, year, month, day, hour, minute, second, utc] = match;
  if (utc === "Z") {
    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
  }

  const offsetTimeZone = tzid || "Europe/Berlin";
  const utcGuess = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
  const offset = getTimeZoneOffset(utcGuess, offsetTimeZone);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${offset}`;
}

function parseEvents(icsPath: string): CalendarEvent[] {
  const lines = unfoldIcs(readFileSync(icsPath, "utf8"));
  const events: CalendarEvent[] = [];
  let current: Partial<CalendarEvent> | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      current = {};
      continue;
    }

    if (line === "END:VEVENT") {
      if (!current?.uid || !current.title || !current.start) {
        throw new Error(`Invalid VEVENT in ${basename(icsPath)}: UID, SUMMARY, and DTSTART are required.`);
      }
      events.push(current as CalendarEvent);
      current = null;
      continue;
    }

    if (!current) continue;

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const property = line.slice(0, separatorIndex);
    const value = line.slice(separatorIndex + 1);
    const [name, ...params] = property.split(";");

    switch (name) {
      case "UID":
        current.uid = unescapeIcsValue(value);
        break;
      case "SUMMARY":
        current.title = unescapeIcsValue(value);
        break;
      case "DTSTART":
        current.start = parseIcsDate(value, params);
        break;
      case "DTEND":
        current.end = parseIcsDate(value, params);
        break;
      case "LOCATION":
        current.location = unescapeIcsValue(value);
        break;
      case "DESCRIPTION":
        current.description = unescapeIcsValue(value);
        break;
    }
  }

  if (events.length === 0) {
    throw new Error(`No VEVENT entries found in ${basename(icsPath)}.`);
  }

  return events.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}

function requireExecutable(name: string): string {
  const executable = execFileSync("which", [name], { encoding: "utf8" }).trim();
  if (!executable) {
    throw new Error(`Missing required executable: ${name}`);
  }
  return executable;
}

function generateCover(pdfPath: string, coverPath: string): void {
  const pdftoppm = requireExecutable("pdftoppm");
  let converter = "";

  try {
    converter = requireExecutable("magick");
  } catch {
    converter = requireExecutable("convert");
  }

  const tmp = mkdtempSync(join(tmpdir(), "ravensberg-semester-"));
  const tmpBase = join(tmp, "cover");
  const tmpJpeg = `${tmpBase}.jpg`;

  try {
    execFileSync(pdftoppm, ["-f", "1", "-l", "1", "-singlefile", "-r", "220", "-jpeg", pdfPath, tmpBase], {
      stdio: "inherit",
    });
    execFileSync(converter, [tmpJpeg, "-quality", "86", coverPath], { stdio: "inherit" });
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function writeSemesterData(options: ImportOptions, events: CalendarEvent[]): void {
  const dataPath = resolve("src/data/semesterprogramm.ts");
  const value = {
    title: options.title,
    slug: options.slug,
    pdfUrl: `/semesterprogramm/${options.slug}.pdf`,
    icsUrl: `/semesterprogramm/${options.slug}.ics`,
    coverImage: `/semesterprogramm/${options.slug}-cover.webp`,
    events,
  };

  const content = `export interface SemesterEvent {
  uid: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
}

export interface Semesterprogramm {
  title: string;
  slug: string;
  pdfUrl: string;
  icsUrl: string;
  coverImage: string;
  events: SemesterEvent[];
}

export const semesterprogramm: Semesterprogramm = ${JSON.stringify(value, null, 2)};
`;

  writeFileSync(dataPath, content);
}

function main(): void {
  const options = parseArgs(process.argv.slice(2));

  if (!existsSync(options.pdf)) {
    throw new Error(`PDF not found: ${options.pdf}`);
  }

  if (!existsSync(options.ics)) {
    throw new Error(`ICS not found: ${options.ics}`);
  }

  const outputDir = resolve("public/semesterprogramm");
  mkdirSync(outputDir, { recursive: true });

  const pdfOutput = join(outputDir, `${options.slug}.pdf`);
  const icsOutput = join(outputDir, `${options.slug}.ics`);
  const coverOutput = join(outputDir, `${options.slug}-cover.webp`);

  const events = parseEvents(options.ics);
  copyFileSync(options.pdf, pdfOutput);
  copyFileSync(options.ics, icsOutput);
  generateCover(options.pdf, coverOutput);
  writeSemesterData(options, events);

  const first = events[0];
  const last = events[events.length - 1];

  console.log(`Imported ${options.title}`);
  console.log(`PDF: ${pdfOutput}`);
  console.log(`ICS: ${icsOutput}`);
  console.log(`Cover: ${coverOutput}`);
  console.log(`Events: ${events.length}`);
  console.log(`First event: ${first.start} ${first.title}`);
  console.log(`Last event: ${last.start} ${last.title}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
