/**
 * Generates the PDFs from /content.
 *
 *   npm run export:cv          → public/downloads/marcos-renilla-cv-{es,en}.pdf
 *   npm run export:portfolio   → public/downloads/marcos-renilla-portfolio-{es,en}.pdf
 *   npm run export:all         → all four
 *
 * Runs automatically before `npm run build` (prebuild), so every deployment ships PDFs
 * that match the content of that deployment.
 */
import fs from "node:fs";
import path from "node:path";
import { renderToFile } from "@react-pdf/renderer";
import { locales } from "@/content/types";
import { registerFonts } from "@/pdf/fonts";
import { CvDocument } from "@/pdf/CvDocument";
import { PortfolioDocument } from "@/pdf/PortfolioDocument";
import { contentHash } from "@/lib/content-hash";
import { downloads, publicSiteUrl } from "@/lib/site";

type Target = "cv" | "portfolio";

async function main() {
  const arg = process.argv[2] ?? "all";
  const targets: Target[] = arg === "all" ? ["cv", "portfolio"] : arg === "cv" || arg === "portfolio" ? [arg] : [];
  if (targets.length === 0) {
    console.error(`Unknown target "${arg}". Use: cv | portfolio | all`);
    process.exit(1);
  }

  registerFonts();
  const hash = contentHash();
  const outDir = path.join(process.cwd(), "public", "downloads");
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Generating PDFs (content ${hash}, site URL: ${publicSiteUrl ?? "not set → placeholder"})`);
  for (const target of targets) {
    for (const locale of locales) {
      const rel = target === "cv" ? downloads.cv(locale) : downloads.portfolio(locale);
      const file = path.join(process.cwd(), "public", rel);
      const doc =
        target === "cv" ? (
          <CvDocument locale={locale} siteUrl={publicSiteUrl} contentHash={hash} />
        ) : (
          <PortfolioDocument locale={locale} siteUrl={publicSiteUrl} contentHash={hash} />
        );
      const started = Date.now();
      await renderToFile(doc, file);
      const kb = Math.round(fs.statSync(file).size / 1024);
      console.log(`  ✓ ${rel}  (${kb} KB, ${Date.now() - started} ms)`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
