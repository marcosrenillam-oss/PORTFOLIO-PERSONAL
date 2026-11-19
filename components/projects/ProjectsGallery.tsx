"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { projectCategories, projectKinds } from "@/content";
import type { Locale, Project, ProjectCategoryId, ProjectKind } from "@/content/types";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { ProjectCard } from "./ProjectCard";

type Filter = { type: "all" } | { type: "kind"; value: ProjectKind } | { type: "category"; value: ProjectCategoryId };

interface GalleryProps {
  projects: Project[];
  locale: Locale;
  labels: { all: string; filter: string; empty: string; view: string };
}

/** Project grid with kind / category filters (only shown when they actually filter something). */
export function ProjectsGallery({ projects, locale, labels }: GalleryProps) {
  const [filter, setFilter] = useState<Filter>({ type: "all" });

  const kinds = useMemo(() => (Object.keys(projectKinds) as ProjectKind[]).filter((k) => projects.some((p) => p.kind === k)), [projects]);
  const categories = useMemo(
    () => (Object.keys(projectCategories) as ProjectCategoryId[]).filter((c) => projects.some((p) => p.categories.includes(c))),
    [projects],
  );

  const visible = projects.filter((p) =>
    filter.type === "all" ? true : filter.type === "kind" ? p.kind === filter.value : p.categories.includes(filter.value),
  );

  const options: { key: string; label: string; filter: Filter; count: number }[] = [
    { key: "all", label: labels.all, filter: { type: "all" }, count: projects.length },
    ...kinds.map((k) => ({
      key: `kind-${k}`,
      label: projectKinds[k].label[locale],
      filter: { type: "kind", value: k } as Filter,
      count: projects.filter((p) => p.kind === k).length,
    })),
    ...categories.map((c) => ({
      key: `cat-${c}`,
      label: projectCategories[c][locale],
      filter: { type: "category", value: c } as Filter,
      count: projects.filter((p) => p.categories.includes(c)).length,
    })),
  ];
  const isActive = (f: Filter) => JSON.stringify(f) === JSON.stringify(filter);

  return (
    <div>
      {options.length > 2 && (
        <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
          <LayoutGroup id="project-filters">
            {options.map((o) => (
              <button
                key={o.key}
                type="button"
                aria-pressed={isActive(o.filter)}
                onClick={() => setFilter(o.filter)}
                className={cn(
                  "relative isolate rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                  isActive(o.filter) ? "border-charcoal text-ivory" : "border-charcoal/20 text-charcoal hover:border-charcoal/50",
                )}
              >
                {isActive(o.filter) && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-charcoal" transition={{ duration: 0.5, ease: ease.expo }} />
                )}
                <span className="relative">
                  {o.label} <sup className="tabular-nums opacity-60">{o.count}</sup>
                </span>
              </button>
            ))}
          </LayoutGroup>
        </div>
      )}

      <motion.ul layout className="mt-14 grid gap-x-8 gap-y-20 md:mt-20 md:grid-cols-2 md:gap-y-28">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => {
            const index = projects.indexOf(project);
            return (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: ease.expo }}
                className={cn(index % 2 === 1 && "md:mt-40")}
              >
                <ProjectCard project={project} locale={locale} index={index} aspect="16 / 10" viewLabel={labels.view} sizes="(min-width: 768px) 50vw, 100vw" />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      {visible.length === 0 && <p className="mt-16 text-ink-2">{labels.empty}</p>}
    </div>
  );
}
