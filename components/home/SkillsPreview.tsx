import type { Locale, Skills } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { routes } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Skills as one flowing editorial line, separated by steel slashes. */
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

      <ul className="mt-16 border-t border-charcoal/15 pt-10 md:mt-24 md:pt-14">
        {list.map((skill, i) => (
          <Reveal
            as="li"
            key={skill}
            delay={Math.min(i, 8) * 0.04}
            className="mr-3 inline font-display text-[clamp(1.6rem,3.6vw,3.25rem)] leading-[1.25] tracking-[-0.035em] md:mr-5"
          >
            <span className="transition-colors duration-500 hover:text-steel-ink">
              <Txt>{skill}</Txt>
            </span>
            {i < list.length - 1 && (
              <span aria-hidden className="ml-3 font-serif font-normal italic text-steel md:ml-5">
                /
              </span>
            )}
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
