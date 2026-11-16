import type { Profile } from "./types";

/**
 * PROFESSIONAL PRESENTATION
 * Edit here: home introduction, About page text, CV summary, interests,
 * way of working and the fields you are open to.
 */

export const profile: Profile = {
  intro: {
    es: "[ADD PROFESSIONAL INTRODUCTION]",
    en: "[ADD PROFESSIONAL INTRODUCTION]",
  },
  about: {
    es: ["[ADD PROFESSIONAL INTRODUCTION]"],
    en: ["[ADD PROFESSIONAL INTRODUCTION]"],
  },
  cvSummary: {
    es: "[ADD PROFESSIONAL INTRODUCTION]",
    en: "[ADD PROFESSIONAL INTRODUCTION]",
  },
  interests: {
    es: ["[ADD INTEREST]", "[ADD INTEREST]", "[ADD INTEREST]"],
    en: ["[ADD INTEREST]", "[ADD INTEREST]", "[ADD INTEREST]"],
  },
  approach: [
    {
      title: { es: "[ADD PRINCIPLE]", en: "[ADD PRINCIPLE]" },
      text: { es: "[ADD DESCRIPTION]", en: "[ADD DESCRIPTION]" },
    },
    {
      title: { es: "[ADD PRINCIPLE]", en: "[ADD PRINCIPLE]" },
      text: { es: "[ADD DESCRIPTION]", en: "[ADD DESCRIPTION]" },
    },
    {
      title: { es: "[ADD PRINCIPLE]", en: "[ADD PRINCIPLE]" },
      text: { es: "[ADD DESCRIPTION]", en: "[ADD DESCRIPTION]" },
    },
  ],
  // Fields Marcos wants to work in (provided in the project brief).
  openTo: {
    es: [
      "Comunicación y relaciones públicas",
      "Marketing y marketing digital",
      "Agencias creativas",
      "Influencer marketing y talent management",
      "Redes sociales y contenido",
      "Periodismo y medios deportivos",
      "Tecnología y startups",
      "Gestión y coordinación de proyectos",
      "Deporte y entretenimiento",
    ],
    en: [
      "Communications & PR",
      "Marketing & digital marketing",
      "Creative agencies",
      "Influencer marketing & talent management",
      "Social media & content",
      "Journalism & sports media",
      "Tech companies & startups",
      "Project management & coordination",
      "Sports & entertainment",
    ],
  },
};
