import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { person } from "@/content";
import { locales, type Locale } from "@/content/types";
import { brand } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Marcos Renilla — Portfolio";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const font = (file: string) => readFile(path.join(process.cwd(), "node_modules/@fontsource", file));

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (locales as readonly string[]).includes(locale) ? (locale as Locale) : "es";
  const [grotesk, serif] = await Promise.all([
    font("space-grotesk/files/space-grotesk-latin-500-normal.woff"),
    font("instrument-serif/files/instrument-serif-latin-400-italic.woff"),
  ]);
  const [first, ...rest] = person.brandName.toUpperCase().split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: brand.ivory,
          color: brand.charcoal,
          fontFamily: "Grotesk",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3 }}>
          <span>PORTFOLIO</span>
          <span style={{ color: brand.steel }}>ES / EN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, lineHeight: 0.86, letterSpacing: -8 }}>
          <span>{first}</span>
          <span style={{ paddingLeft: 120 }}>{rest.join(" ")}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontFamily: "Serif", fontStyle: "italic", fontSize: 40 }}>{person.positioning[l]}</span>
          <span style={{ width: 18, height: 18, borderRadius: 18, background: brand.steel }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Grotesk", data: grotesk, weight: 500, style: "normal" },
        { name: "Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
