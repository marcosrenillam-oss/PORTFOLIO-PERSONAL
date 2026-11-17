import type { Profile } from "./types";

/**
 * PROFESSIONAL PRESENTATION
 * Edit here: home introduction, About page text, CV summary, interests,
 * way of working and the fields you are open to.
 * Written from Marcos's own description of himself (Nov 2026).
 */

export const profile: Profile = {
  intro: {
    es: "Comunicación, deporte y herramientas digitales. Estudio Periodismo en la Universidad Francisco de Vitoria y combino creatividad e IA para crear contenido y sacar proyectos adelante.",
    en: "Communication, sport and digital tools. I study Journalism at Universidad Francisco de Vitoria and combine creativity with AI to create content and get projects off the ground.",
  },
  about: {
    es: [
      "Soy alegre, positivo, creativo e imaginativo. Y un poco perfeccionista: me gusta que las cosas salgan bien y cuidar los detalles.",
      "Estudio Periodismo (Deportivo) en la Universidad Francisco de Vitoria. En El Toro TV llevé una sección semanal de radio con el resumen de las corridas de la feria de Madrid, y durante más de dos años he trabajado como celador a jornada completa en el Hospital Clínico San Carlos, compaginándolo con la carrera.",
      "Trabajo con herramientas de creación como Canva, CapCut, Photoshop y Lightroom, y con herramientas de IA y automatización como Claude, ChatGPT, Base44, Notion, n8n, Make o Supabase para crear contenido y organizar proyectos.",
      "Busco mi sitio en comunicación, marketing, contenido y medios deportivos: un equipo al que aportar energía, creatividad y ganas de hacer las cosas bien.",
    ],
    en: [
      "I'm cheerful, positive, creative and imaginative. And a bit of a perfectionist: I like things done right, down to the details.",
      "I study Journalism (Sports) at Universidad Francisco de Vitoria. At El Toro TV I ran a weekly radio segment recapping the bullfights of the Madrid fair, and for more than two years I've worked full-time as a hospital porter at Hospital Clínico San Carlos while studying.",
      "I work with creative tools such as Canva, CapCut, Photoshop and Lightroom, and with AI and automation tools such as Claude, ChatGPT, Base44, Notion, n8n, Make and Supabase to create content and organise projects.",
      "I'm looking for my place in communications, marketing, content and sports media: a team I can bring energy, creativity and a drive to do things well.",
    ],
  },
  cvSummary: {
    es: "Estudiante de Periodismo (Deportivo) en la Universidad Francisco de Vitoria, con experiencia en radio y más de dos años compaginando los estudios con un trabajo a jornada completa de atención al público. Perfil creativo, positivo y detallista, con manejo de herramientas de contenido (Canva, CapCut, Photoshop, Lightroom) y de IA y automatización (Claude, ChatGPT, Notion, n8n, Make).",
    en: "Journalism (Sports) student at Universidad Francisco de Vitoria with radio experience and more than two years combining my studies with a full-time, public-facing job. Creative, positive and detail-oriented, skilled with content tools (Canva, CapCut, Photoshop, Lightroom) and AI and automation tools (Claude, ChatGPT, Notion, n8n, Make).",
  },
  interests: {
    es: ["Deporte", "Viajar, con el viaje bien planeado", "Planes con adrenalina", "Inteligencia artificial"],
    en: ["Sport", "Travel, with every trip well planned", "Adrenaline-filled plans", "Artificial intelligence"],
  },
  approach: [
    {
      title: { es: "Actitud positiva", en: "Positive attitude" },
      text: {
        es: "Afronto el trabajo con alegría y buena energía, también cuando aprieta la presión.",
        en: "I bring good energy to the job, even when the pressure is on.",
      },
    },
    {
      title: { es: "Atención al detalle", en: "Attention to detail" },
      text: {
        es: "Soy perfeccionista: planifico, reviso y cuido cada entrega.",
        en: "I'm a perfectionist: I plan, check and take care of every deliverable.",
      },
    },
    {
      title: { es: "Creatividad con herramientas", en: "Creativity, amplified" },
      text: {
        es: "Uno imaginación, IA y herramientas digitales para llegar más lejos y más rápido.",
        en: "I combine imagination with AI and digital tools to go further, faster.",
      },
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
