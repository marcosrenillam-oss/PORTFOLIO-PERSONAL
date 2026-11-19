import type { Profile } from "./types";

/**
 * PROFESSIONAL PRESENTATION
 * Edit here: home introduction, About page text, CV summary, interests,
 * way of working and the fields you are open to.
 * Written from Marcos's own description of himself (Nov 2026).
 */

export const profile: Profile = {
  intro: {
    es: [
      "Comunicación, redes sociales y contenido. Periodismo en la Universidad Francisco de Vitoria.",
      "Me gusta que las cosas salgan bien: organizo, cuido los detalles y pongo energía y creatividad en todo lo que hago.",
    ],
    en: [
      "Communication, social media and content. Journalism at Universidad Francisco de Vitoria.",
      "I like things done right: I organise, care about the details and bring energy and creativity to everything I do.",
    ],
  },
  about: {
    es: [
      "Soy alegre, positivo y muy creativo. Me encanta imaginar cosas nuevas y, como buen perfeccionista, no paro hasta que salen bien.",
      "Fuera del trabajo me encontrarás haciendo deporte, buscando planes con adrenalina o preparando el próximo viaje, siempre bien planeado: disfruto organizando y viendo cómo cada detalle encaja.",
      "Esa forma de ser es la que llevo a lo que hago. Periodismo en la Universidad Francisco de Vitoria, una sección semanal de radio en El Toro TV y más de dos años como celador a jornada completa, compaginándolo con la carrera, me han enseñado a tratar con personas y a mantener la calma cuando aprieta la presión.",
    ],
    en: [
      "I'm cheerful, positive and very creative. I love imagining new things and, being a perfectionist, I don't stop until they turn out right.",
      "Away from work you'll find me doing sport, looking for adrenaline-filled plans or preparing my next trip, always well planned: I enjoy organising and seeing every detail fall into place.",
      "That's the way I bring to my work. Journalism at Universidad Francisco de Vitoria, a weekly radio segment at El Toro TV and more than two years as a full-time hospital porter alongside my degree have taught me to deal with people and stay calm when the pressure is on.",
    ],
  },
  cvSummary: {
    es: "Estudiante de Periodismo en la Universidad Francisco de Vitoria, con experiencia en radio y más de dos años compaginando los estudios con un trabajo a jornada completa de atención al público. Perfil creativo, organizado y detallista, con soltura en redes sociales, creación de contenido y herramientas como Canva, CapCut, Photoshop, Lightroom y Notion.",
    en: "Journalism student at Universidad Francisco de Vitoria with radio experience and more than two years combining my studies with a full-time, public-facing job. Creative, organised and detail-oriented, comfortable with social media, content creation and tools such as Canva, CapCut, Photoshop, Lightroom and Notion.",
  },
  interests: {
    es: ["Deporte", "Viajar, con el viaje bien planeado", "Planes con adrenalina", "Redes sociales y cultura digital", "Tecnología"],
    en: ["Sport", "Travel, with every trip well planned", "Adrenaline-filled plans", "Social media and digital culture", "Technology"],
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
  // Fields Marcos wants to work in. Kept generic on purpose (no single company targeted).
  openTo: {
    es: [
      "Comunicación y relaciones públicas",
      "Marketing y marketing digital",
      "Redes sociales y contenido",
      "Agencias creativas",
      "Influencer marketing y talent management",
      "Medios y entretenimiento",
      "Tecnología y startups",
      "Gestión y coordinación de proyectos",
    ],
    en: [
      "Communications & PR",
      "Marketing & digital marketing",
      "Social media & content",
      "Creative agencies",
      "Influencer marketing & talent management",
      "Media & entertainment",
      "Tech companies & startups",
      "Project management & coordination",
    ],
  },
};
