/**
 * PDF verification — `npm run pdf:check`.
 * Fails if a PDF is missing, was generated from older content, or its extracted text
 * doesn't contain the data it should (proves the text is selectable / ATS-readable).
 */
import fs from "node:fs";
import path from "node:path";
import { extractText, getDocumentProxy, getMeta } from "unpdf";
import { experience, person, projects, skillCategories } from "@/content";
import { locales, type Locale } from "@/content/types";
import { contentHash } from "@/lib/content-hash";
import { getDictionary } from "@/lib/i18n";
import { isEmptyOrPlaceholder } from "@/lib/placeholder";
import { downloads } from "@/lib/site";

const hash = contentHash();
const errors: string[] = [];
const warnings: string[] = [];
const norm = (s: string) => s.replace(/\s+/g, " ").trim();

async function inspect(rel: string) {
  const file = path.join(process.cwd(), "public", rel);
  if (!fs.existsSync(file)) {
    errors.push(`${rel}: missing — run npm run export:all`);
    return null;
  }
  const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(file)));
  const meta = await getMeta(pdf);
  const { text, totalPages } = await extractText(pdf, { mergePages: true });
  const creator = String((meta.info as unknown as Record<string, unknown>).Creator ?? "");
  if (!creator.includes(`content:${hash}`)) errors.push(`${rel}: generated from older content — run npm run export:all`);
  return { text: norm(text), pages: totalPages };
}

function expect(rel: string, text: string, needles: string[]) {
  for (const n of needles) if (!isEmptyOrPlaceholder(n) && !text.includes(norm(n))) errors.push(`${rel}: text "${n}" not found`);
}

async function main() {
  for (const locale of locales as readonly Locale[]) {
    const d = getDictionary(locale);

    const cvRel = downloads.cv(locale);
    const cv = await inspect(cvRel);
    if (cv) {
      expect(cvRel, cv.text, [person.fullName, person.positioning[locale]]);
      expect(cvRel, cv.text.toLowerCase(), [d.cv.profile, d.cv.experience, d.cv.education, d.cv.skills, d.cv.languages].map((h) => h.toLowerCase()));
      for (const e of experience.filter((x) => x.inCv)) expect(cvRel, cv.text, [e.organization, e.role[locale]]);
      for (const c of skillCategories) expect(cvRel, cv.text, [c.title[locale]]);
      if (/\b(?:[A-Z] ){4,}[A-Z]\b/.test(cv.text)) warnings.push(`${cvRel}: spaced-out capitals detected (bad for ATS)`);
      if (cv.pages > 1) warnings.push(`${cvRel}: ${cv.pages} pages (target is 1)`);
      console.log(`  ✓ ${cvRel} — ${cv.pages} page(s), ${cv.text.length} characters of selectable text`);
    }

    const pfRel = downloads.portfolio(locale);
    const pf = await inspect(pfRel);
    if (pf) {
      expect(pfRel, pf.text, [person.positioning[locale]]);
      for (const p of projects.filter((x) => x.inPortfolio)) expect(pfRel, pf.text, [p.title[locale]]);
      console.log(`  ✓ ${pfRel} — ${pf.pages} page(s)`);
    }
  }

  warnings.forEach((w) => console.log(`⚠ ${w}`));
  errors.forEach((e) => console.log(`✗ ${e}`));
  if (errors.length) process.exit(1);
  console.log(`✓ PDFs match content ${hash}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
