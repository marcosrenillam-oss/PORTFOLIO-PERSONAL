import type { Metadata } from "next";
import { locales, type Locale } from "@/content/types";
import { person } from "@/content";
import { getDictionary, ogLocale } from "./i18n";
import { siteUrl } from "./site";

/**
 * Builds per-page metadata with canonical URL, hreflang alternates and Open Graph.
 * `path` is the part after the locale, e.g. "/projects".
 */
export function pageMetadata(locale: Locale, path: string, title?: string, description?: string): Metadata {
  const dict = getDictionary(locale);
  const fullTitle = title ? `${title} — ${person.brandName}` : dict.meta.siteTitle;
  const desc = description || dict.meta.siteDescription;
  const url = `${siteUrl}/${locale}${path}`;
  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l === "es" ? "es-ES" : "en", `${siteUrl}/${l}${path}`])),
        "x-default": `${siteUrl}/es${path}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: person.brandName,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
  };
}
