import Image from "next/image";
import { willkommen } from "@/data/content";
import { Section } from "@/components/Section";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { richText } from "@/lib/richText";

export function Willkommen() {
  const currentYear = new Date().getFullYear();
  const yearsOfTradition = currentYear - 1919;

  return (
    <Section id="willkommen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <AnimatedHeading className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            {willkommen.heading}
          </AnimatedHeading>
          <p className="text-muted-fg leading-relaxed mb-8">{richText(willkommen.text)}</p>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl text-accent">
              <AnimatedCounter target={yearsOfTradition} suffix="+" />
            </span>
            <span className="text-muted-fg text-sm">Jahre Tradition seit 1919</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={willkommen.image}
              alt="KStV Ravensberg Gruppenfoto"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
