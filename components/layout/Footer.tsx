import Link from "next/link";
import { contact, person } from "@/content";
import type { Locale } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { downloads, hasPortfolio, navItems, routes } from "@/lib/site";
import { isEmptyOrPlaceholder } from "@/lib/placeholder";
import { Txt } from "@/components/ui/Txt";
import { BackToTop } from "./BackToTop";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const profiles = [contact.linkedin, ...contact.links].filter((l) => l.url);
  const hasEmail = !isEmptyOrPlaceholder(contact.email);

  return (
    <footer data-surface="dark" className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="px-gutter grid gap-12 border-t border-ivory/10 pb-10 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <p className="label text-steel">{dict.nav.contact}</p>
          {hasEmail ? (
            <a href={`mailto:${contact.email}`} className="link-underline mt-4 inline-block font-display text-2xl tracking-tight md:text-3xl">
              {contact.email}
            </a>
          ) : (
            <p className="mt-4 font-display text-2xl tracking-tight md:text-3xl">
              <Txt>{contact.email}</Txt>
            </p>
          )}
          <p className="mt-3 max-w-sm text-sm text-ivory/60">
            <Txt>{person.positioning[locale]}</Txt>
          </p>
        </div>

        <nav aria-label={dict.nav.mainNavigation} className="md:col-span-3">
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item}>
                <Link href={routes[item](locale)} className="link-underline text-ivory/80 hover:text-ivory">
                  {dict.nav[item]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2 text-sm md:col-span-4">
          {profiles.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="link-underline block text-ivory/80 hover:text-ivory">
              {p.label} ↗
            </a>
          ))}
          <a href={downloads.cv(locale)} download className="link-underline block text-ivory/80 hover:text-ivory">
            {dict.actions.downloadCv} ↓
          </a>
          {hasPortfolio && (
            <a href={downloads.portfolio(locale)} download className="link-underline block text-ivory/80 hover:text-ivory">
              {dict.actions.downloadPortfolio} ↓
            </a>
          )}
        </div>
      </div>

      <div className="px-gutter" aria-hidden>
        <p className="display-tight select-none whitespace-nowrap text-center text-[12.6vw] uppercase leading-[0.8] text-ivory/[0.07]">
          {person.brandName}
        </p>
      </div>

      <div className="px-gutter flex flex-col gap-3 border-t border-ivory/10 py-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {person.brandName}. {dict.footer.rights}
        </p>
        <BackToTop label={dict.actions.backToTop} />
      </div>
    </footer>
  );
}
