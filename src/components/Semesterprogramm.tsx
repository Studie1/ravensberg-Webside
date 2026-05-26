import Image from "next/image";
import { semesterprogramm } from "@/data/semesterprogramm";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/components/Section";
import { SemesterprogrammEvents } from "@/components/SemesterprogrammEvents";

export function Semesterprogramm() {
  return (
    <Section id="semesterprogramm" bgClassName="bg-muted">
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <AnimatedHeading className="font-serif text-4xl md:text-5xl text-accent mb-3">
            Semesterprogramm
          </AnimatedHeading>
          <p className="font-serif text-xl md:text-2xl text-foreground mb-4">
            {semesterprogramm.title}
          </p>
          <p className="text-muted-fg text-lg leading-relaxed">
            Unsere nächsten Veranstaltungen auf einen Blick. Das vollständige Programm gibt es als
            PDF und zum Eintragen in deinen Kalender.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,20rem)_1fr] gap-10 lg:gap-14 items-start">
        <ScrollReveal delay={0.1}>
          <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            <a
              href={semesterprogramm.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl bg-background p-3 shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[314/437] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={semesterprogramm.coverImage}
                  alt={`Cover ${semesterprogramm.title}`}
                  fill
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 60vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  unoptimized
                />
              </div>
            </a>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={semesterprogramm.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background shadow-md transition-colors hover:bg-foreground"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 3h7v7" />
                  <path d="M21 3 10 14" />
                  <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                </svg>
                Programm öffnen
              </a>
              <a
                href={semesterprogramm.pdfUrl}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent/40 px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M12 15V3" />
                </svg>
                PDF herunterladen
              </a>
              <a
                href={semesterprogramm.icsUrl}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent/40 px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
                Kalender herunterladen
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Kommende Termine</h3>
          <SemesterprogrammEvents events={semesterprogramm.events} />
        </ScrollReveal>
      </div>
    </Section>
  );
}
