import type { Locale, Project } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { routes } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SurfaceShift } from "./SurfaceShift";

/** Asymmetric editorial layout: positions repeat every three projects. */
const layout = [
  { col: "md:col-span-7", aspect: "4 / 3" },
  { col: "md:col-span-4 md:col-start-9 md:mt-48", aspect: "4 / 5" },
  { col: "md:col-span-8 md:col-start-3", aspect: "16 / 9" },
];

export function SelectedWork({ locale, dict, projects }: { locale: Locale; dict: Dictionary; projects: Project[] }) {
  return (
    <SurfaceShift className="relative mt-24 pb-28 pt-28 md:mt-36 md:pb-40 md:pt-40">
      <div className="px-gutter">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <SectionLabel index="02" className="text-steel">
                {dict.home.selectedWork}
              </SectionLabel>
            </Reveal>
            <SplitReveal
              lines={[dict.home.selectedWork]}
              className="display-tight mt-6 text-display"
            />
          </div>
          <Reveal className="md:col-span-4" delay={0.1}>
            <p className="max-w-xs font-serif text-xl italic leading-snug opacity-70">{dict.home.selectedWorkNote}</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:mt-28 md:grid-cols-12 md:gap-y-32">
          {projects.map((project, i) => {
            const slot = layout[i % layout.length];
            return (
              <Reveal key={project.slug} className={cn(slot.col)} amount={0.1}>
                <ProjectCard
                  project={project}
                  locale={locale}
                  index={i}
                  tone="dark"
                  aspect={slot.aspect}
                  viewLabel={dict.actions.viewProject}
                  sizes="(min-width: 768px) 60vw, 100vw"
                />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-24 flex justify-center md:mt-32">
          <ButtonLink href={routes.projects(locale)} variant="outline" tone="dark">
            {dict.actions.allProjects}
          </ButtonLink>
        </Reveal>
      </div>
    </SurfaceShift>
  );
}
