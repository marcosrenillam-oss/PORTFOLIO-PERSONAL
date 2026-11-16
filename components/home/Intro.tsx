import type { Locale, Person, Profile } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { routes } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Intro({ locale, dict, profile }: { locale: Locale; dict: Dictionary; profile: Profile; person: Person }) {
  const fields = profile.openTo[locale];
  return (
    <section id="intro" data-surface="light" className="relative scroll-mt-20 pt-24 md:pt-40">
      <div className="px-gutter grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <SectionLabel index="01">{dict.home.introLabel}</SectionLabel>
        </Reveal>
        <div className="md:col-span-9 lg:col-span-8">
          <Reveal>
            <p className="font-display text-headline font-normal leading-[1.08] tracking-[-0.03em]">
              <Txt>{profile.intro[locale]}</Txt>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={routes.about(locale)} variant="outline">
              {dict.actions.readMore}
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      {/* Fields Marcos is open to — moving band */}
      <div className="mt-24 border-y border-charcoal/10 py-6 md:mt-36">
        <p className="px-gutter label mb-5 text-steel-ink">{dict.home.openToLabel}</p>
        <ul className="sr-only">
          {fields.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div aria-hidden className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap">
            {[...fields, ...fields].map((f, i) => (
              <span key={i} className="flex items-center font-display text-[clamp(1.75rem,4vw,3.25rem)] tracking-[-0.03em]">
                <span className="px-6 md:px-10">{f}</span>
                <span className="font-serif text-[0.8em] italic text-steel">&</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
