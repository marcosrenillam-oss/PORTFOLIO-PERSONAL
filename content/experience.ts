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
    end: "2026-12",
    summary: {
      es: "Celador a jornada completa en uno de los grandes hospitales públicos de Madrid, compaginado con los estudios de Periodismo.",
      en: "Full-time hospital porter at one of Madrid's major public hospitals, combined with my Journalism degree.",
    },
    responsibilities: {
      es: [
        "Traslado y acompañamiento de pacientes entre unidades, plantas y pruebas.",
        "Apoyo al personal sanitario en la movilización de pacientes.",
        "Atención e información a pacientes y familiares.",
      ],
      en: [
        "Transferred and accompanied patients between wards, units and tests.",
        "Supported clinical staff with patient handling.",
        "Assisted and informed patients and their families.",
      ],
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
    summary: {
      es: "Responsable de una sección semanal de radio dedicada a resumir las corridas de toros de la feria de Madrid.",
      en: "In charge of a weekly radio segment recapping the bullfights of the Madrid bullfighting fair.",
    },
    responsibilities: {
      es: [
        "Conducción de una sección semanal con el resumen de las corridas de la feria de Madrid.",
        "Seguimiento de la feria y selección de lo más relevante de cada semana para la sección.",
      ],
      en: [
        "Hosted a weekly segment summarising the bullfights of the Madrid fair.",
        "Followed the fair and selected each week's key moments for the segment.",
      ],
    },
    learnings: {
      es: ["Gestión de proyectos", "Manejo de la presión"],
      en: ["Project management", "Working under pressure"],
    },
    inCv: true,
  },
];
