import type { Locale } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { downloads, hasPortfolio, routes } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";

export function CtaBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section data-surface="dark" className="px-gutter relative overflow-hidden bg-charcoal pb-24 pt-28 text-ivory md:pb-32 md:pt-40">
      <Reveal>
        <SectionLabel index="05" className="text-steel">
          {dict.nav.contact}
        </SectionLabel>
      </Reveal>
      <SplitReveal lines={[dict.home.ctaTitle]} className="display-tight mt-8 max-w-[14ch] text-giant" />
      <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-ivory/70">{dict.home.ctaText}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-3 md:col-span-7 md:justify-end">
          <Magnetic>
            <ButtonLink href={routes.contact(locale)} tone="dark">
              {dict.actions.contact}
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href={downloads.cv(locale)} download tone="dark" variant="outline" icon="down">
              {dict.actions.downloadCv}
            </ButtonLink>
          </Magnetic>
          {hasPortfolio && (
            <Magnetic>
              <ButtonLink href={downloads.portfolio(locale)} download tone="dark" variant="outline" icon="down">
                {dict.actions.downloadPortfolio}
              </ButtonLink>
            </Magnetic>
          )}
        </Reveal>
      </div>
    </section>
  );
}
