import { notFound } from "next/navigation";
import { certifications, courses, education, languages } from "@/content";
import type { Credential, Locale } from "@/content/types";
import { formatDate, formatRange, getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMetadata(locale, "/education", d.pages.education.title, d.pages.education.lead);
}

function CredentialList({ items, locale, linkLabel }: { items: Credential[]; locale: Locale; linkLabel: string }) {
  return (
    <ul className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item, i) => (
        <Reveal as="li" key={item.id} delay={i * 0.04} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
          <div>
            <p className="text-lg leading-snug">
              <Txt>{item.name[locale]}</Txt>
            </p>
            <p className="mt-1 text-sm text-ink-2">
              <Txt>{item.issuer}</Txt>
              {item.url && (
                <>
                  {" · "}
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {linkLabel} ↗
                  </a>
                </>
              )}
            </p>
          </div>
          <p className="label tabular-nums text-steel-ink sm:pt-1.5">
            <Txt>{formatDate(item.date, locale)}</Txt>
          </p>
        </Reveal>
      ))}
    </ul>
  );
}

export default async function EducationPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const e = d.pages.education;

  return (
    <>
      <PageHeader index="05" label={d.nav.education} title={e.title} lead={e.lead} />

      <section data-surface="light" className="px-gutter pb-24 md:pb-36">
        <Reveal>
          <SectionLabel index="01">{e.academic}</SectionLabel>
        </Reveal>
        <div className="mt-10 border-t border-charcoal/15">
          {education.map((item) => (
            <div key={item.id} className="grid gap-6 border-b border-charcoal/15 py-12 md:grid-cols-12">
              <Reveal className="md:col-span-3">
                <p className="font-display text-xl tracking-[-0.02em]">
                  <Txt>{formatRange(item.start, item.end, locale)}</Txt>
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  <Txt>{item.location[locale]}</Txt>
                </p>
              </Reveal>
              <Reveal delay={0.05} className="md:col-span-8 md:col-start-5">
                <h2 className="font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1] tracking-[-0.04em]">
                  <Txt>{item.degree[locale]}</Txt>
                </h2>
                <p className="mt-3 font-serif text-2xl italic text-ink-2">
                  <Txt>{item.institution}</Txt>
                </p>
                <ul className="mt-6 space-y-2 text-ink-2">
                  {item.details[locale].map((detail, j) => (
                    <li key={j} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-charcoal/40" />
                      <span>
                        <Txt>{detail}</Txt>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {(courses.length > 0 || certifications.length > 0) && (
        <section data-surface="light" className="px-gutter grid gap-16 pb-24 md:grid-cols-2 md:pb-36">
          {courses.length > 0 && (
            <div>
              <Reveal>
                <SectionLabel index="02">{e.courses}</SectionLabel>
              </Reveal>
              <CredentialList items={courses} locale={locale} linkLabel={e.viewCredential} />
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <Reveal>
                <SectionLabel index="03">{e.certifications}</SectionLabel>
              </Reveal>
              <CredentialList items={certifications} locale={locale} linkLabel={e.viewCredential} />
            </div>
          )}
        </section>
      )}

      <section data-surface="dark" className="px-gutter bg-charcoal py-24 text-ivory md:py-36">
        <Reveal>
          <SectionLabel index={courses.length > 0 || certifications.length > 0 ? "04" : "02"} className="text-steel">
            {e.languages}
          </SectionLabel>
        </Reveal>
        <ul className="mt-12 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {languages.map((lang, i) => (
            <Reveal as="li" key={i} delay={i * 0.06} className="bg-charcoal py-8 sm:pr-8">
              <p className="font-display text-4xl tracking-[-0.03em] md:text-5xl">
                <Txt>{lang.name[locale]}</Txt>
              </p>
              <p className="mt-3 font-serif text-xl italic text-ivory/60">
                <Txt>{lang.level[locale]}</Txt>
              </p>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
