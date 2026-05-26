"use client";

import { useEffect, useMemo, useState } from "react";
import type { SemesterEvent } from "@/data/semesterprogramm";

interface SemesterprogrammEventsProps {
  events: SemesterEvent[];
}

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  hour: "2-digit",
  minute: "2-digit",
});

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

function formatTimeRange(event: SemesterEvent): string {
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : undefined;

  if (!end) {
    return timeFormatter.format(start);
  }

  const sameDay = dateKeyFormatter.format(start) === dateKeyFormatter.format(end);
  if (!sameDay) {
    return `${timeFormatter.format(start)} bis ${formatDate(event.end ?? event.start)}`;
  }

  return `${timeFormatter.format(start)} bis ${timeFormatter.format(end)}`;
}

export function SemesterprogrammEvents({ events }: SemesterprogrammEventsProps) {
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    setCurrentTime(Date.now());
  }, []);

  const upcomingEvents = useMemo(() => {
    if (currentTime === null) return [];

    return events
      .filter((event) => Date.parse(event.end ?? event.start) >= currentTime)
      .slice(0, 6);
  }, [currentTime, events]);

  if (currentTime === null) {
    return (
      <div className="rounded-xl border border-accent/10 bg-background p-6 text-muted-fg shadow-sm">
        Kommende Termine werden geladen...
      </div>
    );
  }

  if (upcomingEvents.length === 0) {
    return (
      <div className="rounded-xl border border-accent/10 bg-background p-6 shadow-sm">
        <p className="font-serif text-xl text-foreground mb-2">Semesterprogramm abgeschlossen</p>
        <p className="text-muted-fg leading-relaxed">
          Das vollständige Programm steht weiterhin als PDF und Kalenderdatei bereit.
        </p>
      </div>
    );
  }

  return (
    <ol className="space-y-4">
      {upcomingEvents.map((event) => (
        <li
          key={event.uid}
          className="grid grid-cols-1 gap-3 rounded-xl border border-accent/10 bg-background p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 sm:grid-cols-[7rem_1fr] sm:gap-5 md:p-6"
        >
          <div className="sm:border-r sm:border-accent/10 sm:pr-5">
            <p className="font-serif text-xl text-accent leading-tight">{formatDate(event.start)}</p>
            <p className="text-sm text-muted-fg mt-1">{formatTimeRange(event)}</p>
          </div>
          <div>
            <h4 className="font-serif text-lg md:text-xl text-foreground leading-snug">
              {event.title}
            </h4>
            {event.location ? (
              <p className="text-sm text-muted-fg mt-1.5">{event.location}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
