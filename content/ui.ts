/**
 * INTERFACE COPY — navigation, section titles, buttons and labels used by the
 * website and both PDFs. This is interface language only: no personal facts here.
 * Keep both languages natural rather than literal translations.
 */

export const ui = {
  meta: {
    siteTitle: {
      es: "Marcos Renilla — Comunicación, creatividad y proyectos digitales",
      en: "Marcos Renilla — Communication, Creativity & Digital Projects",
    },
    siteDescription: {
      es: "Portfolio de Marcos Renilla: comunicación, creatividad y proyectos digitales. Experiencia, proyectos, competencias y CV descargable.",
      en: "Marcos Renilla's portfolio: communication, creativity and digital projects. Experience, selected work, skills and a downloadable CV.",
    },
  },

  nav: {
    home: { es: "Inicio", en: "Home" },
    about: { es: "Sobre mí", en: "About" },
    experience: { es: "Experiencia", en: "Experience" },
    projects: { es: "Proyectos", en: "Work" },
    skills: { es: "Habilidades", en: "Skills" },
    education: { es: "Formación", en: "Education" },
    contact: { es: "Contacto", en: "Contact" },
    menu: { es: "Menú", en: "Menu" },
    close: { es: "Cerrar", en: "Close" },
    skipToContent: { es: "Saltar al contenido", en: "Skip to content" },
    language: { es: "Idioma", en: "Language" },
    switchTo: { es: "View in English", en: "Ver en español" },
    mainNavigation: { es: "Navegación principal", en: "Main navigation" },
  },

  actions: {
    downloadCv: { es: "Descargar CV", en: "Download CV" },
    downloadPortfolio: { es: "Portfolio PDF", en: "Portfolio PDF" },
    contact: { es: "Hablemos", en: "Get in touch" },
    viewProject: { es: "Ver caso", en: "View case" },
    allProjects: { es: "Todos los proyectos", en: "All work" },
    fullExperience: { es: "Experiencia completa", en: "Full experience" },
    allSkills: { es: "Todas las habilidades", en: "All skills" },
    readMore: { es: "Conocer más", en: "Read more" },
    backToProjects: { es: "Volver a proyectos", en: "Back to work" },
    nextProject: { es: "Siguiente proyecto", en: "Next project" },
    copyEmail: { es: "Copiar correo", en: "Copy email" },
    copied: { es: "Copiado", en: "Copied" },
    backToTop: { es: "Volver arriba", en: "Back to top" },
    scroll: { es: "Desliza", en: "Scroll" },
  },

  home: {
    heroEyebrow: { es: "Portfolio", en: "Portfolio" },
    introLabel: { es: "Introducción", en: "Introduction" },
    openToLabel: { es: "Abierto a oportunidades en", en: "Open to opportunities in" },
    selectedWork: { es: "Proyectos seleccionados", en: "Selected work" },
    selectedWorkNote: { es: "Una selección de proyectos reales, personales y conceptuales.", en: "A selection of professional, personal and concept work." },
    experienceLabel: { es: "Trayectoria", en: "Experience" },
    skillsLabel: { es: "Habilidades", en: "Skills" },
    ctaTitle: { es: "¿Trabajamos juntos?", en: "Let's work together" },
    ctaText: {
      es: "Descarga el CV o el portfolio completo, o escríbeme directamente.",
      en: "Download the CV or the full portfolio, or write to me directly.",
    },
  },

  pages: {
    about: {
      title: { es: "Sobre mí", en: "About" },
      lead: { es: "Perfil, intereses y forma de trabajar.", en: "Profile, interests and the way I work." },
      profile: { es: "Perfil profesional", en: "Professional profile" },
      interests: { es: "Intereses", en: "Interests" },
      approach: { es: "Forma de trabajar", en: "How I work" },
      multidisciplinary: { es: "Enfoque multidisciplinar", en: "A multidisciplinary approach" },
      multidisciplinaryText: {
        es: "Comunicación, creatividad y proyectos digitales como un mismo terreno de trabajo.",
        en: "Communication, creativity and digital projects treated as one field of work.",
      },
    },
    experience: {
      title: { es: "Experiencia", en: "Experience" },
      lead: { es: "Cronología profesional, responsabilidades y aprendizajes.", en: "Timeline, responsibilities and what each role taught me." },
      responsibilities: { es: "Responsabilidades", en: "Responsibilities" },
      learnings: { es: "Aprendizajes y competencias", en: "Learnings & competences" },
    },
    projects: {
      title: { es: "Proyectos", en: "Work" },
      lead: {
        es: "Casos de estudio. Cada proyecto indica si es real, personal o un ejercicio conceptual.",
        en: "Case studies. Every project states whether it is professional work, a personal project or a concept.",
      },
      filterAll: { es: "Todos", en: "All" },
      filterLabel: { es: "Filtrar proyectos", en: "Filter work" },
      empty: { es: "No hay proyectos en esta categoría.", en: "No projects in this category yet." },
    },
    caseStudy: {
      overview: { es: "Resumen", en: "Overview" },
      year: { es: "Año", en: "Year" },
      organization: { es: "Organización", en: "Organization" },
      type: { es: "Tipo", en: "Type" },
      myRole: { es: "Mi papel", en: "My role" },
      context: { es: "Contexto", en: "Context" },
      objective: { es: "Objetivo", en: "Objective" },
      challenge: { es: "Reto", en: "Challenge" },
      process: { es: "Investigación y proceso", en: "Research & process" },
      strategy: { es: "Estrategia", en: "Strategy" },
      execution: { es: "Ejecución", en: "Execution" },
      tools: { es: "Herramientas", en: "Tools" },
      results: { es: "Resultados", en: "Results" },
      resultsNote: { es: "Solo resultados reales y verificables.", en: "Real, verifiable results only." },
      learnings: { es: "Aprendizajes", en: "Learnings" },
      visuals: { es: "Material visual", en: "Visuals" },
    },
    skills: {
      title: { es: "Habilidades", en: "Skills" },
      lead: { es: "Lo que aporto a un equipo y las herramientas con las que trabajo.", en: "What I bring to a team, and the tools I work with." },
      tools: { es: "Herramientas", en: "Tools" },
    },
    education: {
      title: { es: "Formación", en: "Education" },
      lead: { es: "Formación académica, cursos, certificaciones e idiomas.", en: "Academic background, courses, certifications and languages." },
      academic: { es: "Formación académica", en: "Academic background" },
      courses: { es: "Cursos", en: "Courses" },
      certifications: { es: "Certificaciones", en: "Certifications" },
      languages: { es: "Idiomas", en: "Languages" },
      viewCredential: { es: "Ver credencial", en: "View credential" },
    },
    contact: {
      title: { es: "Contacto", en: "Contact" },
      lead: { es: "Para oportunidades, colaboraciones o una conversación.", en: "For opportunities, collaborations or a conversation." },
      bigLine1: { es: "Construyamos", en: "Let's build" },
      bigLine2: { es: "algo que comunique.", en: "something that speaks." },
      email: { es: "Correo electrónico", en: "Email" },
      phone: { es: "Teléfono", en: "Phone" },
      elsewhere: { es: "En otros sitios", en: "Elsewhere" },
      documents: { es: "Documentos", en: "Documents" },
      location: { es: "Ubicación", en: "Based in" },
      availability: { es: "Disponibilidad", en: "Availability" },
    },
    notFound: {
      title: { es: "Página no encontrada", en: "Page not found" },
      text: { es: "La página que buscas no existe o se ha movido.", en: "The page you are looking for doesn't exist or has moved." },
      back: { es: "Volver al inicio", en: "Back home" },
    },
  },

  dates: {
    present: { es: "Actualidad", en: "Present" },
  },

  /** Headings used in the CV PDF. Standard wording on purpose: ATS systems look for them. */
  cv: {
    profile: { es: "Perfil", en: "Profile" },
    experience: { es: "Experiencia profesional", en: "Professional Experience" },
    education: { es: "Formación", en: "Education" },
    courses: { es: "Cursos y certificaciones", en: "Courses & Certifications" },
    skills: { es: "Habilidades", en: "Skills" },
    tools: { es: "Herramientas", en: "Tools" },
    languages: { es: "Idiomas", en: "Languages" },
    links: { es: "Portfolio", en: "Portfolio" },
  },

  portfolioPdf: {
    title: { es: "Portfolio", en: "Portfolio" },
    edition: { es: "Edición", en: "Edition" },
    contents: { es: "Índice", en: "Contents" },
    introduction: { es: "Presentación", en: "Introduction" },
    selectedProjects: { es: "Proyectos seleccionados", en: "Selected projects" },
    caseStudy: { es: "Caso de estudio", en: "Case study" },
    contact: { es: "Contacto", en: "Contact" },
    thanks: { es: "Gracias.", en: "Thank you." },
    onlineVersion: { es: "Versión online", en: "Online version" },
    imagePlaceholder: { es: "[ADD PROJECT IMAGE]", en: "[ADD PROJECT IMAGE]" },
  },

  footer: {
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    builtWith: { es: "Diseñado y desarrollado con cuidado.", en: "Designed and built with care." },
  },
} as const;
