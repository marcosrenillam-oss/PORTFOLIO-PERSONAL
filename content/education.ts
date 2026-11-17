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
    details: { es: [], en: [] },
  },
];

export const courses: Credential[] = [];

export const certifications: Credential[] = [];

export const languages: Language[] = [
  { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
  { name: { es: "Inglés", en: "English" }, level: { es: "B2", en: "B2 (upper intermediate)" } },
];
