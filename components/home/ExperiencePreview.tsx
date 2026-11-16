import Link from "next/link";
import type { Experience, Locale } from "@/content/types";
import { formatRange, type Dictionary } from "@/lib/i18n";
import { routes } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ExperiencePreview({ locale, dict, items }: { locale: Locale; dict: Dictionary; items: Experience[] }) {
  return (
    <section data-surface="light" className="px-gutter py-28 md:py-40">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <SectionLabel index="03">{dict.home.experienceLabel}</SectionLabel>
          </Reveal>
        </div>
        <SplitReveal lines={[dict.nav.experience]} className="display-tight text-display md:col-span-8" />
      </div>

      <ul className="mt-16 border-t border-charcoal/15 md:mt-24">
        {items.map((item, i) => (
          <Reveal as="li" key={item.id} delay={i * 0.06} className="border-b border-charcoal/15">
            <Link
              href={`${routes.experience(locale)}#${item.id}`}
              className="group relative grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-7 md:py-9"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-stone/70 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
              />
              <span className="label col-span-12 tabular-nums text-ink-2 md:col-span-3">
                <Txt>{formatRange(item.start, item.end, locale)}</Txt>
              </span>
              <span className="col-span-10 font-display text-[clamp(1.4rem,2.6vw,2.25rem)] leading-tight tracking-[-0.03em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3 md:col-span-5">
                <Txt>{item.role[locale]}</Txt>
              </span>
              <span className="col-span-10 text-ink-2 md:col-span-3">
                <Txt>{item.organization}</Txt>
              </span>
              <span className="col-span-2 flex justify-end md:col-span-1">
                <Arrow className="h-5 w-5 -rotate-45 opacity-40 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-12">
        <ButtonLink href={routes.experience(locale)} variant="outline">
          {dict.actions.fullExperience}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
