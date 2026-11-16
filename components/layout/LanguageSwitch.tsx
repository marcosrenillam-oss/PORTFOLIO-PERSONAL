"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/content/types";
import { localeLabels, switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/** ES / EN switch that keeps the visitor on the same page. */
export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  return (
    <div className="label flex items-center gap-1.5" role="group" aria-label={label}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="opacity-30">/</span>}
          {l === locale ? (
            <span aria-current="true" className="opacity-100">
              {localeLabels[l].short}
            </span>
          ) : (
            <Link
              href={switchLocalePath(pathname, l)}
              hrefLang={l}
              lang={l}
              aria-label={localeLabels[l].long}
              className={cn("opacity-45 transition-opacity hover:opacity-100")}
            >
              {localeLabels[l].short}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
