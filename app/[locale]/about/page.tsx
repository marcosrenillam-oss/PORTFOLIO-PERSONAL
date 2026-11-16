import { notFound } from "next/navigation";
import { person, profile } from "@/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { downloads, routes } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMetadata(locale, "/about", d.pages.about.title, d.pages.about.lead);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const pillars = person.positioning[locale].split(/,\s*|\s+(?:y|&|and)\s+/i).filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));

  return (
    <>
      <PageHeader index="01" label={d.nav.about} title={d.pages.about.title} lead={d.pages.about.lead} />

      {/* Portrait + profile */}
      <section data-surface="light" className="px-gutter grid gap-12 pb-28 md:grid-cols-12 md:pb-40">
        <div className="md:col-span-5">
          <EditorialImage
            image={person.aboutPhoto ?? person.portrait}
            locale={locale}
            aspect="4 / 5"
            placeholder="[ADD PROFILE PHOTO]"
            figure="Fig. 01"
            parallax
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-24">
          <Reveal>
            <SectionLabel>{d.pages.about.profile}</SectionLabel>
          </Reveal>
          <div className="mt-8 space-y-6">
            {profile.about[locale].map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={i === 0 ? "font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.15] tracking-[-0.02em]" : "text-lg leading-relaxed text-ink-2"}>
                  <Txt>{paragraph}</Txt>
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={downloads.cv(locale)} download icon="down">
              {d.actions.downloadCv}
            </ButtonLink>
            <ButtonLink href={routes.contact(locale)} variant="outline">
              {d.actions.contact}
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Multidisciplinary approach (dark) */}
      <section data-surface="dark" className="px-gutter bg-charcoal py-28 text-ivory md:py-40">
        <Reveal>
          <SectionLabel index="02" className="text-steel">
            {d.pages.about.multidisciplinary}
          </SectionLabel>
        </Reveal>
        <SplitReveal
          lines={pillars}
          className="display-tight mt-10 text-giant"
          lineClassNames={pillars.map((_, i) => (i % 2 === 1 ? "pl-[8vw] text-steel" : ""))}
        />
        <Reveal className="mt-12 max-w-lg">
          <p className="font-serif text-2xl italic leading-snug text-ivory/75">{d.pages.about.multidisciplinaryText}</p>
        </Reveal>
      </section>

      {/* Way of working */}
      <section data-surface="light" className="px-gutter py-28 md:py-40">
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel index="03">{d.pages.about.approach}</SectionLabel>
          </Reveal>
        </div>
        <ol className="mt-14 grid gap-px bg-charcoal/12 md:grid-cols-3">
          {profile.approach.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} className="bg-ivory py-8 md:px-8 md:first:pl-0">
              <span className="font-serif text-5xl italic text-steel">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 font-display text-2xl tracking-[-0.03em]">
                <Txt>{item.title[locale]}</Txt>
              </h3>
              <p className="mt-3 leading-relaxed text-ink-2">
                <Txt>{item.text[locale]}</Txt>
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Interests + open to */}
      <section data-surface="light" className="px-gutter grid gap-16 border-t border-charcoal/10 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-5">
          <Reveal>
            <SectionLabel index="04">{d.pages.about.interests}</SectionLabel>
          </Reveal>
          <ul className="mt-10 space-y-3">
            {profile.interests[locale].map((interest, i) => (
              <Reveal as="li" key={i} delay={i * 0.05} className="font-display text-3xl tracking-[-0.03em] md:text-4xl">
                <Txt>{interest}</Txt>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <SectionLabel index="05">{d.home.openToLabel}</SectionLabel>
          </Reveal>
          <ul className="mt-10 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {profile.openTo[locale].map((field, i) => (
              <Reveal as="li" key={field} delay={i * 0.03} className="flex items-baseline gap-6 py-3.5">
                <span className="label tabular-nums text-steel-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg">{field}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
