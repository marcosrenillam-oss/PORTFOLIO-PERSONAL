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

const renivyaImg = (file: string, es: string, en: string, width: number, height: number) => ({
  src: `/images/projects/renivya/${file}`,
  alt: { es, en },
  width,
  height,
});

const sastreaImg = (file: string, es: string, en: string, width: number, height: number) => ({
  src: `/images/projects/sastrea/${file}`,
  alt: { es, en },
  width,
  height,
});

const atlasImg = (file: string, es: string, en: string, width: number, height: number) => ({
  src: `/images/projects/atlas/${file}`,
  alt: { es, en },
  width,
  height,
});

/**
 * Order = order on the site: Renivya, Sastrea, Atlas.
 * To start one quickly: copy the Atlas block, or use placeholderProject("my-slug", "personal") and fill it in.
 */
export const projects: Project[] = [
  {
    slug: "renivya",
    title: { es: "RENIVYA — Inteligencia informativa", en: "RENIVYA — News intelligence" },
    kind: "personal",
    categories: ["journalism", "technology"],
    year: "2026",
    organization: null,
    role: {
      es: "Idea, criterio editorial y dirección de diseño · Desarrollo con Claude Code",
      en: "Concept, editorial direction and design direction · Developed with Claude Code",
    },
    summary: {
      es: "App de noticias que reúne lo que cuentan varios periódicos sobre una misma historia, contrasta sus versiones y te dice qué está confirmado y qué no.",
      en: "A news app that brings together what several newspapers report on the same story, compares their versions and tells you what is confirmed and what is not.",
    },
    cover: renivyaImg("cover.jpg", "Tres pantallas de Renivya: bienvenida, portada del día y una historia", "Three Renivya screens: welcome, daily front page and a story", 2400, 1500),
    featured: true,
    inPortfolio: true,
    links: [
      { label: { es: "Abrir la app", en: "Open the app" }, url: "https://marcosrenillam-oss.github.io/Renivya/" },
      { label: { es: "Código en GitHub", en: "Code on GitHub" }, url: "https://github.com/marcosrenillam-oss/Renivya" },
    ],
    caseStudy: {
      context: {
        es: "Una misma noticia aparece contada de formas distintas en cada medio, y comparar versiones lleva tiempo. Desde el Periodismo, la idea era ofrecer una portada que haga ese trabajo de contraste por el lector.",
        en: "The same news is told differently by every outlet, and comparing versions takes time. Coming from Journalism, the idea was a front page that does that cross-checking for the reader.",
      },
      objective: {
        es: "Reunir las noticias del país del lector y del mundo, agrupar las fuentes en historias y mostrar de forma clara qué está confirmado, en español o en inglés.",
        en: "Gather news from the reader's country and the world, group sources into stories and clearly show what is confirmed, in Spanish or English.",
      },
      challenge: {
        es: "Agrupar muchas fuentes sin mezclar historias distintas, medir relevancia y solidez de forma objetiva y que la app se mantenga al día sola, sin servidor.",
        en: "Grouping many sources without mixing different stories, measuring relevance and reliability objectively, and keeping the app up to date on its own, with no server.",
      },
      role: {
        es: "Idea, criterio editorial (qué es una historia, cómo se contrasta, qué se muestra en portada), dirección de diseño y revisión de cada versión. El código se desarrolló con Claude Code a partir de mis indicaciones.",
        en: "Concept, editorial criteria (what a story is, how it is cross-checked, what goes on the front page), design direction and review of every version. The code was developed with Claude Code following my direction.",
      },
      process: {
        es: "Definí la experiencia como un periódico: portada por país, primeras planas, lo más importante por secciones, ficha de cada historia con «lo que hay que saber» y una sección de analítica. Después la fui construyendo y ajustando por iteraciones.",
        en: "I shaped the experience like a newspaper: a front page per country, front-page covers, top stories by section, a page per story with \"what you need to know\" and an analytics section. Then I built and refined it in iterations.",
      },
      strategy: {
        es: "Criterio periodístico por encima de todo: la relevancia y la solidez de cada historia se calculan con reglas fijas, no con IA, y cada lector ve solo la prensa de su país y en su idioma. Diseño de periódico clásico: cabecera gótica, columnas y blanco y negro.",
        en: "Journalistic criteria first: each story's relevance and reliability are calculated with fixed rules, not AI, and each reader sees only their country's press in their language. Classic newspaper design: blackletter masthead, columns and black and white.",
      },
      execution: {
        es: "Aplicación web instalable en el iPhone que se actualiza sola cada 15 minutos: descarga feeds de prensa por país, agrupa y contrasta las noticias, traduce entre español e inglés y publica la nueva edición. Funciona sin conexión con las últimas noticias descargadas.",
        en: "A web app installable on the iPhone that updates itself every 15 minutes: it fetches press feeds by country, groups and cross-checks the news, translates between Spanish and English and publishes the new edition. It works offline with the latest downloaded news.",
      },
      tools: ["Claude Code", "React", "Vite", "Tailwind CSS", "GitHub Actions", "RSS", "Claude API", "GitHub Pages"],
      results: {
        es: [
          "Publicada y en funcionamiento en GitHub Pages.",
          "Se actualiza sola cada 15 minutos, sin servidor.",
          "Portada por país y lectura en español o inglés.",
          "Funciona sin conexión una vez instalada.",
        ],
        en: [
          "Live and working on GitHub Pages.",
          "Updates itself every 15 minutes, with no server.",
          "A front page per country, readable in Spanish or English.",
          "Works offline once installed.",
        ],
      },
      learnings: {
        es: "Llevar el criterio periodístico a un producto digital: decidir qué hace que algo sea noticia, cómo se contrasta y cómo se presenta para que el lector lo entienda de un vistazo.",
        en: "Bringing journalistic judgement into a digital product: deciding what makes something news, how it is cross-checked and how to present it so readers get it at a glance.",
      },
      gallery: [
        renivyaImg("gallery-01.jpg", "Elección de país, analítica y lo más importante", "Country choice, analytics and top stories", 2400, 1500),
        renivyaImg("gallery-02.jpg", "Portada del día con primeras planas", "Daily front page with front-page covers", 1600, 2000),
        renivyaImg("gallery-03.jpg", "Ficha de una historia: lo que hay que saber", "Story page: what you need to know", 1600, 2000),
      ],
    },
  },
  {
    slug: "sastrea",
    title: { es: "SASTREA — Armario virtual", en: "SASTREA — Virtual wardrobe" },
    kind: "personal",
    categories: ["technology", "content"],
    year: "2026",
    organization: null,
    role: {
      es: "Idea, producto y dirección de diseño · Desarrollo con Claude Code",
      en: "Concept, product and design direction · Developed with Claude Code",
    },
    summary: {
      es: "Armario virtual para decidir qué ponerse: tus prendas presentadas como una tienda, un probador con un avatar tuyo y un Color Book para combinar colores con criterio.",
      en: "A virtual wardrobe to decide what to wear: your clothes displayed like a shop, a fitting room with your own avatar and a Color Book to combine colours with confidence.",
    },
    cover: sastreaImg("cover.jpg", "Tres pantallas de Sastrea: Color Book, inicio con el avatar y el armario", "Three Sastrea screens: Color Book, home with the avatar and the wardrobe", 2400, 1500),
    featured: true,
    inPortfolio: true,
    caseStudy: {
      context: {
        es: "Elegir qué ponerse cada día suele hacerse con prisa y sin ver todo lo que tienes. Me interesaba unir moda, color y tecnología en una experiencia cuidada, más cercana a una tienda que a una lista.",
        en: "Choosing what to wear is usually rushed, without seeing everything you own. I wanted to bring fashion, colour and technology together in a polished experience, closer to a shop than to a list.",
      },
      objective: {
        es: "Crear una app que ayude a vestir con intención: ver el armario de un vistazo, probar combinaciones sobre un avatar propio y entender por qué unos colores funcionan juntos.",
        en: "Build an app that helps you dress with intention: see your wardrobe at a glance, try combinations on your own avatar and understand why some colours work together.",
      },
      challenge: {
        es: "Que la teoría del color resulte fácil y útil, y que el probador y el armario se sientan visuales y agradables, no técnicos.",
        en: "Making colour theory easy and useful, and making the fitting room and wardrobe feel visual and enjoyable rather than technical.",
      },
      role: {
        es: "Idea, definición de funciones, dirección de diseño y revisión de cada versión. El código se desarrolló con Claude Code a partir de mis indicaciones.",
        en: "Concept, feature definition, design direction and review of every version. The code was developed with Claude Code following my direction.",
      },
      process: {
        es: "Partí de cómo se elige la ropa en la vida real: mirar el armario, probarse cosas, pensar en el tiempo que hace y planificar el día siguiente. Cada uno de esos momentos se convirtió en una sección de la app.",
        en: "I started from how people actually choose clothes: looking at the wardrobe, trying things on, thinking about the weather and planning the next day. Each of those moments became a section of the app.",
      },
      strategy: {
        es: "Estética de tienda de moda: fotos de prenda limpias, tonos cálidos y tipografía editorial. Un Color Book inspirado en un clásico libro japonés de combinaciones de color, con nociones de colorimetría para combinar sin miedo.",
        en: "A fashion-store aesthetic: clean product shots, warm tones and editorial type. A Color Book inspired by a classic Japanese book of colour combinations, with colour-theory basics to combine without fear.",
      },
      execution: {
        es: "Inicio con saludo, tiempo del día y avatar vestido; probador virtual con un avatar propio; armario por prendas, cápsulas y conjuntos con buscador y filtros; «Elegir el de hoy» y «Planificar mañana»; y un Color Book con biblioteca de combinaciones, rueda de color interactiva y combinaciones guardadas.",
        en: "A home screen with a greeting, the day's weather and a dressed avatar; a virtual fitting room with your own avatar; a wardrobe by items, capsules and outfits with search and filters; \"Choose today's\" and \"Plan tomorrow\"; and a Color Book with a library of combinations, an interactive colour wheel and saved palettes.",
      },
      tools: ["Claude Code"],
      results: {
        es: ["Prototipo funcional en el iPhone, con armario, probador y Color Book."],
        en: ["Working prototype on the iPhone, with wardrobe, fitting room and Color Book."],
      },
      learnings: {
        es: "Cómo convertir un hábito diario en un producto: observar qué hace la gente de verdad y diseñar cada pantalla para ese momento concreto.",
        en: "How to turn a daily habit into a product: observe what people really do and design each screen for that specific moment.",
      },
      gallery: [
        sastreaImg("gallery-01.jpg", "Color Book, rueda de color y armario", "Color Book, colour wheel and wardrobe", 2400, 1500),
        sastreaImg("gallery-02.jpg", "Inicio con el avatar vestido y el tiempo del día", "Home with the dressed avatar and the day's weather", 1600, 2000),
        sastreaImg("gallery-03.jpg", "Biblioteca de combinaciones del Color Book", "Color Book library of combinations", 1600, 2000),
      ],
    },
  },
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
