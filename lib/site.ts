import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL when the custom domain is connected
 * (e.g. https://marcosrenilla.com). On Vercel the production URL is used automatically.
 */
const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");

/** Public URL of the deployed site, or null when it isn't known yet (local work without NEXT_PUBLIC_SITE_URL). */
export const publicSiteUrl: string | null = configuredUrl ? configuredUrl.replace(/\/$/, "") : null;

/** URL used for metadata / sitemap. Falls back to localhost during local development. */
export const siteUrl = publicSiteUrl ?? "http://localhost:3000";

export const routes = {
  home: (l: Locale) => `/${l}`,
  about: (l: Locale) => `/${l}/about`,
  experience: (l: Locale) => `/${l}/experience`,
  projects: (l: Locale) => `/${l}/projects`,
  project: (l: Locale, slug: string) => `/${l}/projects/${slug}`,
  skills: (l: Locale) => `/${l}/skills`,
  education: (l: Locale) => `/${l}/education`,
  contact: (l: Locale) => `/${l}/contact`,
};

const allNavItems = ["about", "experience", "projects", "skills", "education", "contact"] as const;
export type NavItem = (typeof allNavItems)[number];

/** True once at least one project exists in content/projects.ts. */
export const hasProjects = projects.length > 0;
/** True when the portfolio PDF has projects worth downloading. */
export const hasPortfolio = projects.some((p) => p.inPortfolio);

/** Menu items. "Work" stays hidden until there is at least one project. */
export const navItems: NavItem[] = allNavItems.filter((item) => item !== "projects" || hasProjects);

/** Public paths of the generated PDFs (written by `npm run export:all`). */
export const downloads = {
  cv: (l: Locale) => `/downloads/marcos-renilla-cv-${l}.pdf`,
  portfolio: (l: Locale) => `/downloads/marcos-renilla-portfolio-${l}.pdf`,
};
