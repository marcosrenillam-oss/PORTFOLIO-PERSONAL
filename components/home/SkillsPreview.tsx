import type { Locale, Skills } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { routes } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Skills in an airy numbered grid (one per row on mobile, three columns on desktop). */
export function SkillsPreview({ locale, dict, skills }: { locale: Locale; dict: Dictionary; skills: Skills }) {
  const list = skills.list[locale];
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

      <ul className="mt-16 grid gap-x-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
        {list.map((skill, i) => (
          <Reveal
            as="li"
            key={skill}
            delay={(i % 3) * 0.06}
            className="group flex items-baseline gap-5 border-t border-charcoal/15 py-6 md:py-7"
          >
            <span className="label w-7 shrink-0 tabular-nums text-steel-ink">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[clamp(1.3rem,2vw,1.85rem)] leading-[1.1] tracking-[-0.025em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
              <Txt>{skill}</Txt>
            </span>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-14">
        <ButtonLink href={routes.skills(locale)} variant="outline">
          {dict.actions.allSkills}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
