import { locales, type Locale, type Localized } from "@/content/types";
import { ui } from "@/content/ui";

export { locales, defaultLocale, type Locale } from "@/content/types";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pick the value for the current locale. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

type Resolve<T> = T extends { readonly es: infer U; readonly en: unknown }
  ? U
  : T extends object
    ? { [K in keyof T]: Resolve<T[K]> }
    : T;

function isLocalized(value: unknown): value is Localized<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "es" in value &&
    "en" in value &&
    Object.keys(value).length === 2
  );
}

function resolve<T>(value: T, locale: Locale): Resolve<T> {
  if (isLocalized(value)) return value[locale] as Resolve<T>;
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, inner]) => [key, resolve(inner, locale)]),
    ) as Resolve<T>;
  }
  return value as Resolve<T>;
}

const dictionaries = Object.fromEntries(locales.map((l) => [l, resolve(ui, l)])) as Record<
  Locale,
  Resolve<typeof ui>
>;

/** The interface dictionary (content/ui.ts) resolved to one language. */
export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
export type Dictionary = Resolve<typeof ui>;

export const localeLabels: Record<Locale, { short: string; long: string }> = {
  es: { short: "ES", long: "Español" },
  en: { short: "EN", long: "English" },
};

export const htmlLang: Record<Locale, string> = { es: "es-ES", en: "en" };
export const ogLocale: Record<Locale, string> = { es: "es_ES", en: "en_US" };

const months: Record<Locale, string[]> = {
  es: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** "2025-06" → "jun. 2025" / "Jun 2025". Placeholders and free text are returned unchanged. */
export function formatDate(value: string, locale: Locale): string {
  const match = /^(\d{4})(?:-(\d{2}))?$/.exec(value.trim());
  if (!match) return value;
  const [, year, month] = match;
  if (!month) return year;
  return `${months[locale][Number(month) - 1]} ${year}`;
}

export function formatRange(start: string, end: string | null, locale: Locale): string {
  const to = end === null ? ui.dates.present[locale] : formatDate(end, locale);
  const from = formatDate(start, locale);
  return from === to ? from : `${from} – ${to}`;
}

/** Swap the locale segment of a pathname: "/es/projects" → "/en/projects". */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = target;
    return parts.join("/") || `/${target}`;
  }
  return `/${target}`;
}
