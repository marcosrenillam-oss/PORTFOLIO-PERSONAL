import path from "node:path";
import { Font } from "@react-pdf/renderer";

/**
 * Registers the brand fonts for the PDFs from the same @fontsource packages the website uses.
 * Hyphenation is disabled on purpose: split words break ATS keyword matching.
 */
let registered = false;

export function registerFonts() {
  if (registered) return;
  const dir = (pkg: string) => path.join(process.cwd(), "node_modules/@fontsource", pkg, "files");

  Font.register({
    family: "Inter",
    fonts: [
      { src: path.join(dir("inter"), "inter-latin-400-normal.woff"), fontWeight: 400 },
      { src: path.join(dir("inter"), "inter-latin-500-normal.woff"), fontWeight: 500 },
      { src: path.join(dir("inter"), "inter-latin-600-normal.woff"), fontWeight: 600 },
    ],
  });
  Font.register({
    family: "SpaceGrotesk",
    fonts: [
      { src: path.join(dir("space-grotesk"), "space-grotesk-latin-400-normal.woff"), fontWeight: 400 },
      { src: path.join(dir("space-grotesk"), "space-grotesk-latin-500-normal.woff"), fontWeight: 500 },
      { src: path.join(dir("space-grotesk"), "space-grotesk-latin-600-normal.woff"), fontWeight: 600 },
    ],
  });
  Font.register({
    family: "InstrumentSerif",
    fonts: [
      { src: path.join(dir("instrument-serif"), "instrument-serif-latin-400-normal.woff"), fontWeight: 400 },
      { src: path.join(dir("instrument-serif"), "instrument-serif-latin-400-italic.woff"), fontWeight: 400, fontStyle: "italic" },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}
