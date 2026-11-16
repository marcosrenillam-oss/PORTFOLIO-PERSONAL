import type { Locale, SkillCategory } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { routes } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SkillsPreview({ locale, dict, categories }: { locale: Locale; dict: Dictionary; categories: SkillCategory[] }) {
  return (
    <section data-surface="light" className="px-gutter pb-28 md:pb-40">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <SectionLabel index="04">{dict.home.skillsLabel}</SectionLabel>
          </Reveal>
        </div>
        <SplitReveal lines={[dict.nav.skills]} className="display-tight text-display md:col-span-8" />
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-charcoal/12 sm:grid-cols-2 md:mt-24 lg:grid-cols-5">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.06} className="group relative bg-ivory p-6 md:p-7">
            <div className="flex flex-col justify-between gap-8 sm:min-h-56 lg:min-h-80">
              <span className="label tabular-nums text-steel-ink">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-2xl leading-[1.05] tracking-[-0.03em] md:text-[1.7rem]">{cat.title[locale]}</h3>
                <ul className="mt-5 space-y-1.5 text-sm text-ink-2">
                  {cat.skills[locale].slice(0, 4).map((s, j) => (
                    <li key={j}>
                      <Txt>{s}</Txt>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-steel transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100"
            />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12">
        <ButtonLink href={routes.skills(locale)} variant="outline">
          {dict.actions.allSkills}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
