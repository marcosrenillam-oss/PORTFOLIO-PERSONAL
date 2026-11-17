import type { Localized, Project, ProjectCategoryId, ProjectKind } from "./types";

/**
 * PROJECTS & CASE STUDIES
 * Each project feeds: the Projects gallery, its case-study page (/[locale]/projects/[slug]),
 * the home "Selected work" section (featured: true) and the portfolio PDF (inPortfolio: true).
 *
 * Images: put files in /public/images/projects/<slug>/ (JPG or PNG) and reference them
 * as "/images/projects/<slug>/cover.jpg". `cover: null` renders an editorial placeholder.
 *
 * Kind: "professional" (real work), "personal" (self-initiated, real) or "concept"
 * (exercise / academic / speculative). Concept work is always labelled as such.
 */

export const projectKinds: Record<ProjectKind, { label: Localized; description: Localized }> = {
  professional: {
    label: { es: "Proyecto real", en: "Professional work" },
    description: { es: "Trabajo realizado para una organización", en: "Work delivered for an organization" },
  },
  personal: {
    label: { es: "Proyecto personal", en: "Personal project" },
    description: { es: "Iniciativa propia, real y ejecutada", en: "Self-initiated, real and executed" },
  },
  concept: {
    label: { es: "Ejercicio conceptual", en: "Concept" },
    description: { es: "Propuesta académica o especulativa, no ejecutada", en: "Academic or speculative proposal, not executed" },
  },
};

export const projectCategories: Record<ProjectCategoryId, Localized> = {
  communication: { es: "Comunicación", en: "Communication" },
  marketing: { es: "Marketing", en: "Marketing" },
  content: { es: "Contenido", en: "Content" },
  events: { es: "Eventos", en: "Events" },
  journalism: { es: "Periodismo", en: "Journalism" },
  strategy: { es: "Estrategia", en: "Strategy" },
  technology: { es: "Tecnología", en: "Technology" },
};

const ph = (tag: string): Localized => ({ es: `[${tag}]`, en: `[${tag}]` });

const placeholderProject = (slug: string, kind: ProjectKind): Project => ({
  slug,
  title: ph("ADD PROJECT"),
  kind,
  categories: [],
  year: "[ADD DATE]",
  organization: kind === "professional" ? "[ADD ORGANIZATION]" : null,
  role: ph("ADD ROLE"),
  summary: ph("ADD PROJECT DESCRIPTION"),
  cover: null, // [ADD PROJECT IMAGE]
  featured: true,
  inPortfolio: true,
  caseStudy: {
    context: ph("ADD CONTEXT"),
    objective: ph("ADD OBJECTIVE"),
    challenge: ph("ADD CHALLENGE"),
    role: ph("ADD ROLE"),
    process: ph("ADD RESEARCH AND PROCESS"),
    strategy: ph("ADD STRATEGY"),
    execution: ph("ADD EXECUTION"),
    tools: ["[ADD TOOL]"],
    results: { es: ["[ADD VERIFIED RESULT]"], en: ["[ADD VERIFIED RESULT]"] },
    learnings: ph("ADD LEARNINGS"),
    gallery: [], // [ADD PROJECT IMAGE] — up to any number of ImageAsset entries
  },
});

const atlasImg = (file: string, es: string, en: string, width: number, height: number) => ({
  src: `/images/projects/atlas/${file}`,
  alt: { es, en },
  width,
  height,
});

/**
 * Planned next: AI virtual wardrobe, Neryvia app.
 * To start one quickly: copy the Atlas block, or use placeholderProject("my-slug", "personal") and fill it in.
 */
export const projects: Project[] = [
  {
    slug: "atlas",
    title: { es: "ATLAS — Travel Control Center", en: "ATLAS — Travel Control Center" },
    kind: "personal",
    categories: ["technology"],
    year: "2026",
    organization: null,
    role: {
      es: "Idea, producto y dirección de diseño · Desarrollo con IA (Claude Code)",
      en: "Concept, product and design direction · AI-assisted development (Claude Code)",
    },
    summary: {
      es: "App web para planificar y gestionar viajes: itinerario, mapas, gastos compartidos, documentos y equipaje, en el iPhone y también sin conexión.",
      en: "A web app to plan and manage trips: itinerary, maps, shared expenses, documents and packing, on the iPhone and offline too.",
    },
    cover: atlasImg("cover.jpg", "Tres pantallas de la app ATLAS: bienvenida, Mundo ATLAS en 3D y Explorar", "Three ATLAS screens: welcome, 3D ATLAS World and Explore", 2400, 1500),
    featured: true,
    inPortfolio: true,
    links: [
      { label: { es: "Abrir la app", en: "Open the app" }, url: "https://marcosrenillam-oss.github.io/Atlas/" },
      { label: { es: "Código en GitHub", en: "Code on GitHub" }, url: "https://github.com/marcosrenillam-oss/Atlas" },
    ],
    caseStudy: {
      context: {
        es: "Nace de una afición personal: viajar con el viaje bien planeado. La idea era reunir en un solo sitio todo lo que necesita un viaje, en lugar de tenerlo repartido entre notas, capturas y varias apps.",
        en: "It comes from something I enjoy: travelling with every trip well planned. The idea was to bring everything a trip needs into one place, instead of spreading it across notes, screenshots and several apps.",
      },
      objective: {
        es: "Crear una app gratuita, sin cuentas ni suscripciones, que se instale en el iPhone como una app más y funcione sin conexión.",
        en: "Build a free app, with no accounts or subscriptions, that installs on the iPhone like any other app and works offline.",
      },
      challenge: {
        es: "Que todo funcione en modo avión, que los gastos compartidos cuadren al céntimo entre varias personas y que la experiencia sea visual y agradable, no una hoja de cálculo.",
        en: "Making everything work in airplane mode, getting shared expenses to add up to the cent across several people, and keeping the experience visual and enjoyable rather than a spreadsheet.",
      },
      role: {
        es: "Idea, definición de funciones, dirección de diseño y revisión de cada versión. El código se desarrolló con Claude Code, una herramienta de IA para programar, a partir de mis indicaciones.",
        en: "Concept, feature definition, design direction and review of every version. The code was developed with Claude Code, an AI coding tool, following my direction.",
      },
      process: {
        es: "Definí las secciones de la app (viajes, itinerario, mapas, gastos, documentos y equipaje) y la fui construyendo por iteraciones con IA: describir cada función, generarla, revisarla y ajustarla.",
        en: "I defined the app's sections (trips, itinerary, maps, expenses, documents and packing) and built it in iterations with AI: describe each feature, generate it, review it and refine it.",
      },
      strategy: {
        es: "Local primero: todo se guarda en el dispositivo y los servicios externos (mapas, tiempo, tipos de cambio) son opcionales y gratuitos. Diseño editorial: fotos a sangre, titulares altos y estrechos y una barra de pestañas flotante.",
        en: "Local-first: everything is stored on the device and external services (maps, weather, exchange rates) are optional and free. Editorial design: full-bleed photos, tall condensed headlines and a floating tab bar.",
      },
      execution: {
        es: "Aplicación web progresiva con itinerario por días, mapas de OpenStreetMap, gastos compartidos con tres modos de reparto y varias monedas, documentos disponibles sin conexión, listas de equipaje con plantillas y el «Mundo ATLAS»: un mini-mundo 3D con un monumento por cada uno de los 195 países.",
        en: "A progressive web app with a day-by-day itinerary, OpenStreetMap maps, shared expenses with three split modes and multiple currencies, offline documents, packing lists with templates and \"ATLAS World\": a 3D mini-world with a landmark for each of the 195 countries.",
      },
      tools: ["Claude Code", "React", "TypeScript", "Vite", "IndexedDB (Dexie)", "MapLibre", "OpenStreetMap", "Three.js", "GitHub Pages"],
      results: {
        es: [
          "Publicada y en funcionamiento en GitHub Pages.",
          "Se instala en el iPhone y funciona sin conexión.",
          "Mundo ATLAS: los 195 países, cada uno con su monumento.",
          "Pruebas automáticas: unitarias y 25 escenarios en iPhone emulado.",
        ],
        en: [
          "Live and working on GitHub Pages.",
          "Installs on the iPhone and works offline.",
          "ATLAS World: all 195 countries, each with its landmark.",
          "Automated tests: unit tests plus 25 end-to-end scenarios on an emulated iPhone.",
        ],
      },
      learnings: {
        es: "Cómo convertir una idea en un producto digital completo con IA: definir bien lo que quiero, revisar lo que se genera y decidir qué es imprescindible.",
        en: "How to turn an idea into a complete digital product with AI: define clearly what I want, review what gets generated and decide what really matters.",
      },
      gallery: [
        atlasImg("gallery-01.jpg", "Pantallas de viajes, explorar y gastos", "Trips, explore and expenses screens", 2400, 1500),
        atlasImg("gallery-02.jpg", "Mundo ATLAS: mini-mundo 3D con los 195 países", "ATLAS World: 3D mini-world with 195 countries", 1600, 2000),
        atlasImg("gallery-03.jpg", "Pantalla de bienvenida de ATLAS", "ATLAS welcome screen", 1600, 2000),
      ],
    },
  },
];

/** Template helper kept for convenience when adding new projects. */
export { placeholderProject };
