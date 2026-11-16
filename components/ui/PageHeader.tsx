import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "./SectionLabel";

/** Opening block of every inner page: index label, very large title, short lead. */
export function PageHeader({ index, label, title, lead }: { index: string; label: string; title: string; lead: string }) {
  return (
    <header data-surface="light" className="px-gutter pb-16 pt-32 md:pb-24 md:pt-48">
      <Reveal>
        <SectionLabel index={index}>{label}</SectionLabel>
      </Reveal>
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
        <SplitReveal as="h1" immediate lines={[title]} className="display-tight text-giant md:col-span-12" />
        <Reveal delay={0.3} className="md:col-span-4 md:col-start-9">
          <p className="max-w-sm font-serif text-xl italic leading-snug text-ink-2 md:text-2xl">{lead}</p>
        </Reveal>
      </div>
    </header>
  );
}
