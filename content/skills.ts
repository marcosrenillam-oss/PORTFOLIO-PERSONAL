import type { SkillCategory } from "./types";

/**
 * SKILLS & TOOLS — grouped in five categories.
 * No percentages or invented levels: list skills and tools you can actually back up.
 * `tools` are product names (identical in both languages).
 * Skills below come from Marcos's LinkedIn "Aptitudes" section.
 */

const placeholderSkills = { es: ["[ADD SKILL]", "[ADD SKILL]", "[ADD SKILL]"], en: ["[ADD SKILL]", "[ADD SKILL]", "[ADD SKILL]"] };

export const skillCategories: SkillCategory[] = [
  {
    id: "communication",
    title: { es: "Comunicación", en: "Communication" },
    description: { es: "[ADD SKILL]", en: "[ADD SKILL]" },
    skills: { es: ["Don de gentes"], en: ["People skills"] },
    tools: ["[ADD TOOL]"],
  },
  {
    id: "marketing",
    title: { es: "Marketing y digital", en: "Marketing & Digital" },
    description: { es: "[ADD SKILL]", en: "[ADD SKILL]" },
    skills: { es: ["Medios digitales"], en: ["Digital media"] },
    tools: ["[ADD TOOL]"],
  },
  {
    id: "creativity",
    title: { es: "Creatividad y contenido", en: "Creativity & Content" },
    description: { es: "[ADD SKILL]", en: "[ADD SKILL]" },
    skills: { es: ["Creación de contenido"], en: ["Content creation"] },
    tools: ["[ADD TOOL]"],
  },
  {
    id: "project-management",
    title: { es: "Gestión de proyectos", en: "Project Management" },
    description: { es: "[ADD SKILL]", en: "[ADD SKILL]" },
    skills: { es: ["Gestión de proyectos", "Manejo de la presión"], en: ["Project management", "Working under pressure"] },
    tools: ["[ADD TOOL]"],
  },
  {
    id: "technology",
    title: { es: "Tecnología e innovación", en: "Technology & Innovation" },
    description: { es: "[ADD SKILL]", en: "[ADD SKILL]" },
    skills: placeholderSkills,
    tools: ["[ADD TOOL]"],
  },
];
