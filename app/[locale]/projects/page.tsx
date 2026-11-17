import { notFound } from "next/navigation";
import { projects } from "@/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { Reveal } from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMetadata(locale, "/projects", d.pages.projects.title, d.pages.projects.lead);
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader index="03" label={d.nav.projects} title={d.pages.projects.title} lead={d.pages.projects.lead} />
      <section data-surface="light" className="px-gutter pb-32 md:pb-44">
        {projects.length === 0 ? (
          <Reveal className="border-t border-charcoal/15 pt-12">
            <p className="font-display text-headline leading-[1.1] tracking-[-0.03em]">{d.pages.projects.comingSoon}</p>
            <p className="mt-4 max-w-md font-serif text-xl italic text-ink-2">{d.pages.projects.comingSoonText}</p>
          </Reveal>
        ) : (
        <ProjectsGallery
          projects={projects}
          locale={locale}
          labels={{
            all: d.pages.projects.filterAll,
            filter: d.pages.projects.filterLabel,
            empty: d.pages.projects.empty,
            view: d.actions.viewProject,
          }}
        />
        )}
      </section>
    </>
  );
}
