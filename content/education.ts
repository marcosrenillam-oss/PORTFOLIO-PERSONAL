import type { Credential, Education, Language } from "./types";

/**
 * EDUCATION, COURSES, CERTIFICATIONS AND LANGUAGES — newest first.
 */

export const education: Education[] = [
  {
    id: "education-01",
    institution: "[ADD EDUCATION]",
    degree: { es: "[ADD DEGREE]", en: "[ADD DEGREE]" },
    location: { es: "[ADD LOCATION]", en: "[ADD LOCATION]" },
    start: "[ADD DATE]",
    end: "[ADD DATE]",
    details: { es: ["[ADD DETAIL]"], en: ["[ADD DETAIL]"] },
  },
];

export const courses: Credential[] = [
  {
    id: "course-01",
    name: { es: "[ADD COURSE]", en: "[ADD COURSE]" },
    issuer: "[ADD ISSUER]",
    date: "[ADD DATE]",
    url: null,
  },
];

export const certifications: Credential[] = [
  {
    id: "certification-01",
    name: { es: "[ADD CERTIFICATION]", en: "[ADD CERTIFICATION]" },
    issuer: "[ADD ISSUER]",
    date: "[ADD DATE]",
    url: null,
  },
];

export const languages: Language[] = [
  { name: { es: "[ADD LANGUAGE]", en: "[ADD LANGUAGE]" }, level: { es: "[ADD LEVEL]", en: "[ADD LEVEL]" } },
  { name: { es: "[ADD LANGUAGE]", en: "[ADD LANGUAGE]" }, level: { es: "[ADD LEVEL]", en: "[ADD LEVEL]" } },
];
