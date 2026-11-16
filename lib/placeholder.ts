/** Placeholders look like "[ADD SOMETHING]". They mark information still to be provided. */
export const PLACEHOLDER_PATTERN = /\[ADD [A-Z0-9 &/-]+\]/;
export const PLACEHOLDER_PATTERN_GLOBAL = /\[ADD [A-Z0-9 &/-]+\]/g;

export function isPlaceholder(value: string | null | undefined): boolean {
  return typeof value === "string" && PLACEHOLDER_PATTERN.test(value);
}

/** True when the value is missing or is only a placeholder. */
export function isEmptyOrPlaceholder(value: string | null | undefined): boolean {
  return !value || value.trim() === "" || isPlaceholder(value);
}
