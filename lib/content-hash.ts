import { createHash } from "node:crypto";
import * as content from "@/content";
import { publicSiteUrl } from "./site";

/**
 * Fingerprint of everything the PDFs are built from (all of /content plus the public URL).
 * It is written into each PDF's metadata, and `npm run pdf:check` compares it with the
 * current content to detect PDFs that are out of date.
 */
export function contentHash(): string {
  const payload = JSON.stringify({ content, publicSiteUrl });
  return createHash("sha256").update(payload).digest("hex").slice(0, 16);
}
