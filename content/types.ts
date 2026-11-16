/**
 * Content model — the single source of truth for the website, the CV PDF and
 * the portfolio PDF. Every user-facing fact about Marcos lives in /content.
 *
 * Rules:
 * - Every text a visitor reads is `Localized` (Spanish + English).
 * - Missing information is written as a placeholder: "[ADD SOMETHING]".
 *   Placeholders are rendered in a distinct style on the web and in the PDFs,
 *   and `npm run content:check` lists all of them.
 * - Never invent facts, metrics, clients or results.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** A value in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

/** A date written as "YYYY", "YYYY-MM" or a placeholder such as "[ADD DATE]". */
export type DateString = string;

export interface ImageAsset {
  /** Path inside /public, e.g. "/images/projects/my-project/cover.jpg". Use JPG or PNG (the PDFs can't embed WebP/AVIF). */
  src: string;
  alt: Localized;
  width: number;
  height: number;
  caption?: Localized;
}

export interface ExternalLink {
  /** Visible label, e.g. "LinkedIn". */
  label: string;
  url: string;
  /** Short handle shown on the CV, e.g. "linkedin.com/in/…". */
  display: string;
}

export interface Person {
  /** Brand name as displayed in large type. */
  brandName: string;
  /** Full name as it should appear on the CV. */
  fullName: string;
  /** Professional positioning line. */
  positioning: Localized;
  /** City / country. */
  location: Localized;
  /** Current availability, e.g. "Open to internships from September 2027". */
  availability: Localized;
  /** Portrait photo. `null` renders an editorial placeholder frame. */
  portrait: ImageAsset | null;
  /** Secondary photo for the About page. */
  aboutPhoto: ImageAsset | null;
}

export interface Contact {
  email: string;
  phone: string | null;
  linkedin: ExternalLink;
  /** Other professional profiles (Instagram, X, Behance, Medium…). */
  links: ExternalLink[];
}

export interface Profile {
  /** One or two sentences for the home hero / intro. */
  intro: Localized;
  /** About page paragraphs. */
  about: Localized<string[]>;
  /** Three to four line summary used at the top of the CV. */
  cvSummary: Localized;
  /** Personal and professional interests. */
  interests: Localized<string[]>;
  /** How Marcos works — short principles with a title and a sentence. */
  approach: { title: Localized; text: Localized }[];
  /** Fields / industries Marcos is open to working in. */
  openTo: Localized<string[]>;
}

export interface Experience {
  id: string;
  organization: string;
  role: Localized;
  /** e.g. "Prácticas" / "Internship", "Freelance". */
  employmentType: Localized;
  location: Localized;
  start: DateString;
  /** `null` means "present". */
  end: DateString | null;
  summary: Localized;
  responsibilities: Localized<string[]>;
  /** Learnings and competences demonstrated (website only). */
  learnings: Localized<string[]>;
  /** Show in the CV PDF. */
  inCv: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: Localized;
  location: Localized;
  start: DateString;
  end: DateString | null;
  details: Localized<string[]>;
}

export interface Credential {
  id: string;
  name: Localized;
  issuer: string;
  date: DateString;
  url: string | null;
}

export interface Language {
  name: Localized;
  /** e.g. "Nativo" / "Native", "C1 (Cambridge)". */
  level: Localized;
}

export type SkillCategoryId =
  | "communication"
  | "marketing"
  | "creativity"
  | "project-management"
  | "technology";

export interface SkillCategory {
  id: SkillCategoryId;
  title: Localized;
  description: Localized;
  skills: Localized<string[]>;
  /** Software and tools, written as their product names. */
  tools: string[];
}

/**
 * - professional: real work for an organization or client.
 * - personal: a self-initiated real project.
 * - concept: an exercise, academic work or speculative proposal (never presented as real).
 */
export type ProjectKind = "professional" | "personal" | "concept";

export type ProjectCategoryId =
  | "communication"
  | "marketing"
  | "content"
  | "events"
  | "journalism"
  | "strategy"
  | "technology";

export interface CaseStudy {
  context: Localized;
  objective: Localized;
  challenge: Localized;
  role: Localized;
  process: Localized;
  strategy: Localized;
  execution: Localized;
  tools: string[];
  /** Only real, verifiable results. Leave the placeholder if there are none. */
  results: Localized<string[]>;
  learnings: Localized;
  gallery: ImageAsset[];
}

export interface Project {
  slug: string;
  title: Localized;
  kind: ProjectKind;
  categories: ProjectCategoryId[];
  year: DateString;
  /** Organization or client. Only for real projects; otherwise `null`. */
  organization: string | null;
  role: Localized;
  summary: Localized;
  cover: ImageAsset | null;
  /** Shown in the home "Selected work" section. */
  featured: boolean;
  /** Included in the portfolio PDF. */
  inPortfolio: boolean;
  caseStudy: CaseStudy;
}
