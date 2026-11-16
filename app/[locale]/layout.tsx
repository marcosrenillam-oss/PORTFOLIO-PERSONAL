import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { person } from "@/content";
import { locales } from "@/content/types";
import { getDictionary, htmlLang, isLocale } from "@/lib/i18n";
import { downloads, siteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { display, sans, serif } from "@/lib/fonts";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Cursor } from "@/components/layout/Cursor";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#F3F0E9",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(siteUrl),
    ...pageMetadata(locale, ""),
    authors: [{ name: person.fullName }],
    creator: person.fullName,
    formatDetection: { telephone: false, email: false },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]} className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body className="bg-ivory font-sans text-charcoal antialiased">
        <a
          href="#main"
          className="label fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-charcoal px-4 py-3 text-ivory transition-transform focus:translate-y-0"
        >
          {dict.nav.skipToContent}
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Header locale={locale} dict={dict} brandName={person.brandName} cvHref={downloads.cv(locale)} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
