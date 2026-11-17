import { notFound } from "next/navigation";
import { contact, person } from "@/content";
import { locales } from "@/content/types";
import { getDictionary, isLocale, localeLabels } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { downloads, hasPortfolio } from "@/lib/site";
import { isEmptyOrPlaceholder } from "@/lib/placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Txt } from "@/components/ui/Txt";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Arrow } from "@/components/ui/Arrow";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMetadata(locale, "/contact", d.pages.contact.title, d.pages.contact.lead);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const c = d.pages.contact;
  const hasEmail = !isEmptyOrPlaceholder(contact.email);
  const profiles = [contact.linkedin, ...contact.links];

  const docs = [
    ...locales.map((l) => ({ label: `CV — ${localeLabels[l].long}`, href: downloads.cv(l) })),
    ...(hasPortfolio ? locales.map((l) => ({ label: `Portfolio — ${localeLabels[l].long}`, href: downloads.portfolio(l) })) : []),
  ];

  return (
    <section data-surface="dark" className="px-gutter min-h-[100svh] bg-charcoal pb-24 pt-32 text-ivory md:pb-32 md:pt-48">
      <Reveal>
        <SectionLabel index="06" className="text-steel">
          {c.title}
        </SectionLabel>
      </Reveal>
      <SplitReveal
        as="h1"
        immediate
        lines={[c.bigLine1, c.bigLine2]}
        className="display-tight mt-10 text-giant"
        lineClassNames={["", "font-serif font-normal italic tracking-[-0.02em] text-steel"]}
      />
      <Reveal delay={0.4} className="mt-10 max-w-md">
        <p className="text-lg text-ivory/65">{c.lead}</p>
      </Reveal>

      {/* Email */}
      <Reveal delay={0.5} className="mt-16 border-t border-ivory/10 pt-10 md:mt-24">
        <p className="label text-ivory/50">{c.email}</p>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          {hasEmail ? (
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-4 font-display text-[clamp(1.75rem,5.5vw,4.5rem)] leading-none tracking-[-0.04em]"
            >
              <span className="link-underline">{contact.email}</span>
              <Arrow direction="up-right" className="h-[0.6em] w-[0.6em] transition-transform duration-500 group-hover:rotate-45" />
            </a>
          ) : (
            <p className="font-display text-[clamp(1.75rem,5.5vw,4.5rem)] leading-none tracking-[-0.04em]">
              <Txt>{contact.email}</Txt>
            </p>
          )}
          {hasEmail && <CopyEmail email={contact.email} label={d.actions.copyEmail} copiedLabel={d.actions.copied} />}
        </div>
        {contact.phone && (
          <p className="mt-6 text-lg text-ivory/75">
            <span className="label mr-3 text-ivory/50">{c.phone}</span>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-underline">
              {contact.phone}
            </a>
          </p>
        )}
      </Reveal>

      <div className="mt-16 grid gap-12 border-t border-ivory/10 pt-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="label text-ivory/50">{c.elsewhere}</p>
          <ul className="mt-5 space-y-3">
            {profiles.map((p, i) => (
              <li key={i} className="text-lg">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {p.label} ↗
                  </a>
                ) : (
                  <span>
                    {p.label} — <Txt>{p.display}</Txt>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.05} className="md:col-span-4">
          <p className="label text-ivory/50">{c.documents}</p>
          <ul className="mt-5 space-y-3">
            {docs.map((doc) => (
              <li key={doc.href} className="text-lg">
                <a href={doc.href} download className="link-underline">
                  {doc.label} ↓
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 md:col-span-4">
          <div>
            <p className="label text-ivory/50">{c.location}</p>
            <p className="mt-3 text-lg">
              <Txt>{person.location[locale]}</Txt>
            </p>
          </div>
          <div>
            <p className="label text-ivory/50">{c.availability}</p>
            <p className="mt-3 text-lg">
              <Txt>{person.availability[locale]}</Txt>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
