import type { Experience } from "./types";

/**
 * PROFESSIONAL EXPERIENCE — newest first.
 * Dates: "YYYY-MM" (e.g. "2025-06"). `end: null` means "present".
 * To add a role, copy one block, give it a unique `id` and fill in both languages.
 * Source: LinkedIn profile (screenshots provided by Marcos, Nov 2026).
 */

export const experience: Experience[] = [
  {
    id: "hospital-clinico-san-carlos",
    organization: "Hospital Clínico San Carlos",
    role: { es: "Celador", en: "Hospital Porter" },
    employmentType: { es: "Jornada completa", en: "Full-time" },
    location: { es: "Madrid, España · Presencial", en: "Madrid, Spain · On-site" },
    start: "2024-07",
    end: "2026-11",
    summary: { es: "[ADD EXPERIENCE]", en: "[ADD EXPERIENCE]" },
    responsibilities: {
      es: ["[ADD RESPONSIBILITY]", "[ADD RESPONSIBILITY]"],
      en: ["[ADD RESPONSIBILITY]", "[ADD RESPONSIBILITY]"],
    },
    learnings: {
      es: ["Manejo de la presión", "Don de gentes"],
      en: ["Working under pressure", "People skills"],
    },
    inCv: true,
  },
  {
    id: "el-toro-tv",
    organization: "El Toro TV",
    role: { es: "Colaborador de radio", en: "Radio Contributor" },
    employmentType: { es: "Formación Profesional Dual", en: "Dual vocational training placement" },
    location: { es: "Madrid, España · Presencial", en: "Madrid, Spain · On-site" },
    start: "2024-03",
    end: "2024-05",
    summary: { es: "[ADD EXPERIENCE]", en: "[ADD EXPERIENCE]" },
    responsibilities: {
      es: ["[ADD RESPONSIBILITY]", "[ADD RESPONSIBILITY]"],
      en: ["[ADD RESPONSIBILITY]", "[ADD RESPONSIBILITY]"],
    },
    learnings: {
      es: ["Gestión de proyectos", "Manejo de la presión"],
      en: ["Project management", "Working under pressure"],
    },
    inCv: true,
  },
];
