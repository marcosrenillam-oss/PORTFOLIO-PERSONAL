import { notFound } from "next/navigation";
import { skillCategories } from "@/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
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
      <section data-surface="light" className="px-gutter pb-32 md:pb-44">
        {skillCategories.map((cat, i) => (
          <div key={cat.id} id={cat.id} className="group grid scroll-mt-28 gap-8 border-t border-charcoal/15 py-14 md:grid-cols-12 md:py-20">
            <Reveal className="md:col-span-5">
              <span className="label tabular-nums text-steel-ink">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em] transition-colors duration-500 group-hover:text-steel-ink">
                {cat.title[locale]}
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-ink-2">
                <Txt>{cat.description[locale]}</Txt>
              </p>
            </Reveal>
            <Reveal delay={0.05} className="md:col-span-6 md:col-start-7">
              <ul className="divide-y divide-charcoal/10 border-b border-charcoal/10">
                {cat.skills[locale].map((skill, j) => (
                  <li key={j} className="flex items-baseline justify-between gap-4 py-3.5 text-lg">
                    <Txt>{skill}</Txt>
                  </li>
                ))}
              </ul>
              {cat.tools.length > 0 && (
                <div className="mt-8">
                  <h3 className="label text-steel-ink">{d.pages.skills.tools}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.tools.map((tool, j) => (
                      <Chip key={j}>{tool}</Chip>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        ))}
      </section>
    </>
  );
}
