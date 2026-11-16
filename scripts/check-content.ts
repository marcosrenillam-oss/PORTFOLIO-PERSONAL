/**
 * Content validation — `npm run content:check` (add `-- --strict` to fail while placeholders remain).
 *
 * Errors (exit 1):   missing language, ES/EN arrays of different length, duplicate ids/slugs,
 *                    invalid slugs, missing image files.
 * Warnings:          one language filled while the other is still a placeholder, WebP/AVIF images
 *                    (the PDFs can't embed them).
 * Report:            every remaining "[ADD …]" placeholder, grouped by section.
 */
import fs from "node:fs";
import path from "node:path";
import * as content from "@/content";
import { locales } from "@/content/types";
import { PLACEHOLDER_PATTERN_GLOBAL, isPlaceholder } from "@/lib/placeholder";

const strict = process.argv.includes("--strict");
const errors: string[] = [];
const warnings: string[] = [];
const placeholders = new Map<string, number>();

function isLocalized(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v) && "es" in v && "en" in v;
}

function countPlaceholders(where: string, value: string) {
  const n = value.match(PLACEHOLDER_PATTERN_GLOBAL)?.length ?? 0;
  if (n) placeholders.set(where.split(/[.[]/)[0], (placeholders.get(where.split(/[.[]/)[0]) ?? 0) + n);
}

function walk(value: unknown, where: string) {
  if (typeof value === "string") {
    if (!where.startsWith("ui.")) countPlaceholders(where, value);
    return;
  }
  if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${where}[${i}]`));
  if (typeof value !== "object" || value === null) return;

  if (isLocalized(value)) {
    for (const l of locales) if (!(l in value)) errors.push(`${where}: missing "${l}"`);
    const [a, b] = [value.es, value.en];
    if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) errors.push(`${where}: ES and EN have different types`);
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) errors.push(`${where}: ES has ${a.length} items, EN has ${b.length}`);
      a.forEach((item, i) => {
        if (typeof item === "string" && typeof b[i] === "string" && isPlaceholder(item) !== isPlaceholder(b[i] as string))
          warnings.push(`${where}[${i}]: only one language is filled in`);
      });
    }
    if (typeof a === "string" && typeof b === "string") {
      if (!a.trim() || !b.trim()) errors.push(`${where}: empty text`);
      if (isPlaceholder(a) !== isPlaceholder(b)) warnings.push(`${where}: only one language is filled in`);
    }
  }
  for (const [k, v] of Object.entries(value)) {
    if ((k === "src" || k === "image") && typeof v === "string") checkImage(v, where);
    walk(v, `${where}.${k}`);
  }
}

function checkImage(src: string, where: string) {
  const file = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  if (!fs.existsSync(file)) errors.push(`${where}: image not found → public${src}`);
  else if (!/\.(jpe?g|png)$/i.test(src)) warnings.push(`${where}: ${src} is not JPG/PNG — it will be skipped in the PDFs`);
}

function unique(list: string[], label: string) {
  const seen = new Set<string>();
  for (const id of list) {
    if (seen.has(id)) errors.push(`Duplicate ${label}: "${id}"`);
    seen.add(id);
  }
}

const { ui, ...data } = content as Record<string, unknown>;
for (const [key, value] of Object.entries(data)) walk(value, key);
walk(ui, "ui");

unique(content.projects.map((p) => p.slug), "project slug");
unique(content.experience.map((e) => e.id), "experience id");
unique(content.education.map((e) => e.id), "education id");
for (const p of content.projects) if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) errors.push(`Invalid slug "${p.slug}" (use lowercase-with-dashes)`);
for (const p of content.projects)
  if (p.kind !== "professional" && p.organization) warnings.push(`projects/${p.slug}: organization set on a ${p.kind} project`);

const total = [...placeholders.values()].reduce((a, b) => a + b, 0);
console.log("\nContent check");
console.log("─────────────");
if (total) {
  console.log(`Placeholders still to fill: ${total}`);
  for (const [section, n] of [...placeholders.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${section.padEnd(18)} ${n}`);
} else console.log("No placeholders left. ✓");
warnings.forEach((w) => console.log(`⚠ ${w}`));
errors.forEach((e) => console.log(`✗ ${e}`));
if (errors.length || (strict && total)) {
  console.log(`\n${errors.length} error(s)${strict && total ? `, ${total} placeholder(s) in strict mode` : ""}.`);
  process.exit(1);
}
console.log(`\n✓ Structure valid (${warnings.length} warning(s)).`);
