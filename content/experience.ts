import type { Experience } from "./types";

/**
 * PROFESSIONAL EXPERIENCE — newest first.
 * Dates: "YYYY-MM" (e.g. "2025-06"). `end: null` means "present".
 * To add a role, copy one block, give it a unique `id` and fill in both languages.
 */

const placeholderRole = (id: string): Experience => ({
  id,
  organization: "[ADD EXPERIENCE]",
  role: { es: "[ADD ROLE]", en: "[ADD ROLE]" },
  employmentType: { es: "[ADD TYPE]", en: "[ADD TYPE]" },
  location: { es: "[ADD LOCATION]", en: "[ADD LOCATION]" },
  start: "[ADD DATE]",
  end: "[ADD DATE]",
  summary: { es: "[ADD EXPERIENCE]", en: "[ADD EXPERIENCE]" },
  responsibilities: {
    es: ["[ADD RESPONSIBILITY]", "[ADD RESPONSIBILITY]"],
    en: ["[ADD RESPONSIBILITY]", "[ADD RESPONSIBILITY]"],
  },
  learnings: {
    es: ["[ADD LEARNING]"],
    en: ["[ADD LEARNING]"],
  },
  inCv: true,
});

export const experience: Experience[] = [
  placeholderRole("experience-01"),
  placeholderRole("experience-02"),
  placeholderRole("experience-03"),
];
