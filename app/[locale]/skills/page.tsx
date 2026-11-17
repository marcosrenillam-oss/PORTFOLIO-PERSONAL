import { notFound } from "next/navigation";
import { skills } from "@/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";
import { Chip } from "@/components/ui/Chip";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMetadata(locale, "/skills", d.pages.skills.title, d.pages.skills.lead);
}

export default async function SkillsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <>
      <PageHeader index="04" label={d.nav.skills} title={d.pages.skills.title} lead={d.pages.skills.lead} />
      <section data-surface="light" className="px-gutter pb-24 md:pb-36">
        <ol className="grid border-t border-charcoal/15 md:grid-cols-2 md:gap-x-12">
          {skills.list[locale].map((skill, i) => (
            <Reveal
              as="li"
              key={skill}
              delay={(i % 2) * 0.05}
              className="group flex items-baseline gap-6 border-b border-charcoal/15 py-6 md:py-8"
            >
              <span className="label w-8 shrink-0 tabular-nums text-steel-ink">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.035em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
                <Txt>{skill}</Txt>
              </span>
            </Reveal>
          ))}
        </ol>
      </section>

      {skills.tools.length > 0 && (
        <section data-surface="dark" className="px-gutter bg-charcoal py-24 text-ivory md:py-32">
          <Reveal>
            <SectionLabel className="text-steel">{d.pages.skills.tools}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05} className="mt-10 flex flex-wrap gap-3">
            {skills.tools.map((tool, i) => (
              <Chip key={i} tone="dark" className="px-5 py-2 text-base">
                {tool}
              </Chip>
            ))}
          </Reveal>
        </section>
      )}
    </>
  );
}
