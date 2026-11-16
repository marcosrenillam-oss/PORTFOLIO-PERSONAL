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

export const projects: Project[] = [
  placeholderProject("project-01", "professional"),
  placeholderProject("project-02", "personal"),
  placeholderProject("project-03", "concept"),
];
