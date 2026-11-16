import localFont from "next/font/local";

/**
 * Fonts are self-hosted from @fontsource packages (no network call at build time).
 * The PDF generators load the same families from the same packages (pdf/fonts.ts).
 */
export const display = localFont({
  variable: "--font-space-grotesk",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2", weight: "600" },
  ],
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const sans = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2", weight: "600" },
  ],
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});

export const serif = localFont({
  variable: "--font-instrument-serif",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  fallback: ["Georgia", "serif"],
});
