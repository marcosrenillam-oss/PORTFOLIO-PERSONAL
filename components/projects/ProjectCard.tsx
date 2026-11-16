import Link from "next/link";
import { projectKinds } from "@/content";
import type { Locale, Project } from "@/content/types";
import { routes } from "@/lib/site";
import { formatDate } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Txt } from "@/components/ui/Txt";
import { Arrow } from "@/components/ui/Arrow";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  index: number;
  tone?: "light" | "dark";
  aspect?: string;
  viewLabel: string;
  sizes?: string;
  className?: string;
}

export function ProjectCard({ project, locale, index, tone = "light", aspect = "4 / 3", viewLabel, sizes, className }: ProjectCardProps) {
  const kind = projectKinds[project.kind];
  const number = String(index + 1).padStart(2, "0");
  return (
    <article className={cn("group relative", className)}>
      <Link href={routes.project(locale, project.slug)} className="block" data-cursor={viewLabel}>
        <EditorialImage
          image={project.cover}
          locale={locale}
          aspect={aspect}
          tone={tone === "dark" ? "dark" : "light"}
          figure={`N° ${number}`}
          hoverZoom
          sizes={sizes}
        />
        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className={cn("label flex flex-wrap items-center gap-x-3 gap-y-1", tone === "dark" ? "text-ivory/60" : "text-ink-2")}>
              <span className="tabular-nums">{number}</span>
              <span aria-hidden className="h-px w-5 bg-current opacity-40" />
              <span>{kind.label[locale]}</span>
              <span aria-hidden>·</span>
              <span>
                <Txt>{formatDate(project.year, locale)}</Txt>
              </span>
            </p>
            <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.02] tracking-[-0.035em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
              <Txt>{project.title[locale]}</Txt>
            </h3>
            <p className={cn("mt-3 max-w-md text-[0.9375rem] leading-relaxed", tone === "dark" ? "text-ivory/65" : "text-ink-2")}>
              <Txt>{project.summary[locale]}</Txt>
            </p>
          </div>
          <span
            className={cn(
              "mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-expo)] group-hover:-rotate-45",
              tone === "dark"
                ? "border-ivory/25 group-hover:bg-ivory group-hover:text-charcoal"
                : "border-charcoal/20 group-hover:bg-charcoal group-hover:text-ivory",
            )}
          >
            <Arrow className="h-4 w-4" />
            <span className="sr-only">{viewLabel}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
