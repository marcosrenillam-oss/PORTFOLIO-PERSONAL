import type { Credential, Education, Language } from "./types";

/**
 * EDUCATION, COURSES, CERTIFICATIONS AND LANGUAGES — newest first.
 */

export const education: Education[] = [
  {
    id: "ufv-periodismo",
    institution: "Universidad Francisco de Vitoria",
    // As listed on LinkedIn: "Periodismo, Deportivo". Confirm the official degree title.
    degree: { es: "Periodismo (Deportivo)", en: "Journalism (Sports)" },
    location: { es: "Madrid, España", en: "Madrid, Spain" },
    start: "2021",
    end: "2026",
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
