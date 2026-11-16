import { notFound } from "next/navigation";
import { experience } from "@/content";
import { formatRange, getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Txt } from "@/components/ui/Txt";
import { Chip } from "@/components/ui/Chip";
import { TimelineDot } from "@/components/ui/TimelineDot";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMetadata(locale, "/experience", d.pages.experience.title, d.pages.experience.lead);
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <>
      <PageHeader index="02" label={d.nav.experience} title={d.pages.experience.title} lead={d.pages.experience.lead} />
      <section data-surface="light" className="px-gutter pb-32 md:pb-44">
        <ol className="relative border-t border-charcoal/15">
          {experience.map((item, i) => (
            <li key={item.id} id={item.id} className="relative grid scroll-mt-28 gap-8 border-b border-charcoal/15 py-14 md:grid-cols-12 md:py-20">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <div className="flex items-center gap-4">
                    <TimelineDot />
                    <span className="label tabular-nums text-steel-ink">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-6 font-display text-xl tracking-[-0.02em]">
                    <Txt>{formatRange(item.start, item.end, locale)}</Txt>
                  </p>
                  <p className="mt-2 text-sm text-ink-2">
                    <Txt>{item.employmentType[locale]}</Txt>
                    <span aria-hidden> · </span>
                    <Txt>{item.location[locale]}</Txt>
                  </p>
                </div>
              </div>
              <div className="md:col-span-8">
                <Reveal>
                  <h2 className="font-display text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em]">
                    <Txt>{item.role[locale]}</Txt>
                  </h2>
                  <p className="mt-3 font-serif text-2xl italic text-ink-2">
                    <Txt>{item.organization}</Txt>
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="mt-8 max-w-2xl text-lg leading-relaxed">
                    <Txt>{item.summary[locale]}</Txt>
                  </p>
                </Reveal>
                <div className="mt-10 grid gap-10 lg:grid-cols-2">
                  <Reveal delay={0.1}>
                    <h3 className="label text-steel-ink">{d.pages.experience.responsibilities}</h3>
                    <ul className="mt-4 space-y-3">
                      {item.responsibilities[locale].map((r, j) => (
                        <li key={j} className="flex gap-3 leading-relaxed text-ink-2">
                          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-charcoal/40" />
                          <span>
                            <Txt>{r}</Txt>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <h3 className="label text-steel-ink">{d.pages.experience.learnings}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.learnings[locale].map((l, j) => (
                        <Chip key={j}>{l}</Chip>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
