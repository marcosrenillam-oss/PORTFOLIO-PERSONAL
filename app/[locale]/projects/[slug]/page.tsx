import Link from "next/link";
import { notFound } from "next/navigation";
import { projectKinds, projects } from "@/content";
import { locales, type Localized } from "@/content/types";
import { formatDate, getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/site";
import { isEmptyOrPlaceholder } from "@/lib/placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Txt } from "@/components/ui/Txt";
import { Chip } from "@/components/ui/Chip";
import { Arrow } from "@/components/ui/Arrow";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isLocale(locale) || !project) return {};
  const title = isEmptyOrPlaceholder(project.title[locale]) ? project.slug : project.title[locale];
  const summary = isEmptyOrPlaceholder(project.summary[locale]) ? undefined : project.summary[locale];
  return pageMetadata(locale, `/projects/${slug}`, title, summary);
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const d = getDictionary(locale);
  const c = d.pages.caseStudy;
  const cs = project.caseStudy;
  const kind = projectKinds[project.kind];

  const narrative: { key: string; label: string; value: Localized }[] = [
    { key: "context", label: c.context, value: cs.context },
    { key: "objective", label: c.objective, value: cs.objective },
    { key: "challenge", label: c.challenge, value: cs.challenge },
    { key: "role", label: c.myRole, value: cs.role },
    { key: "process", label: c.process, value: cs.process },
    { key: "strategy", label: c.strategy, value: cs.strategy },
    { key: "execution", label: c.execution, value: cs.execution },
  ];

  const meta = [
    { label: c.type, value: kind.label[locale], note: kind.description[locale] },
    { label: c.year, value: formatDate(project.year, locale) },
    ...(project.organization ? [{ label: c.organization, value: project.organization }] : []),
    { label: c.myRole, value: project.role[locale] },
  ];

  return (
    <article>
      {/* Header */}
      <header data-surface="light" className="px-gutter pb-14 pt-32 md:pb-20 md:pt-44">
        <Reveal>
          <Link href={routes.projects(locale)} className="label group inline-flex items-center gap-2 text-ink-2 hover:text-charcoal">
            <Arrow direction="left" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {d.actions.backToProjects}
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <SectionLabel index={String(index + 1).padStart(2, "0")}>{d.portfolioPdf.caseStudy}</SectionLabel>
        </Reveal>
        <SplitReveal as="h1" immediate lines={[project.title[locale]]} className="display-tight mt-8 max-w-[16ch] text-giant" />
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-charcoal/15 pt-8 md:grid-cols-4">
          {meta.map((m, i) => (
            <Reveal key={m.label} delay={0.2 + i * 0.05}>
              <dt className="label text-steel-ink">{m.label}</dt>
              <dd className="mt-2 text-lg leading-snug">
                <Txt>{m.value}</Txt>
                {m.note && <span className="mt-1 block text-sm text-ink-2">{m.note}</span>}
              </dd>
            </Reveal>
          ))}
        </dl>
      </header>

      {/* Cover */}
      <div className="px-gutter">
        <EditorialImage image={project.cover} locale={locale} aspect="16 / 9" parallax priority figure="Cover" sizes="100vw" />
      </div>

      {/* Summary */}
      <section data-surface="light" className="px-gutter grid gap-8 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-3">
          <SectionLabel>{c.overview}</SectionLabel>
        </Reveal>
        <Reveal className="md:col-span-8">
          <p className="font-display text-headline leading-[1.1] tracking-[-0.03em]">
            <Txt>{project.summary[locale]}</Txt>
          </p>
        </Reveal>
      </section>

      {/* Narrative */}
      <section data-surface="light" className="px-gutter pb-24 md:pb-36">
        {narrative.map((block, i) => (
          <div key={block.key} className="grid gap-6 border-t border-charcoal/15 py-12 md:grid-cols-12 md:py-16">
            <Reveal className="md:col-span-3">
              <h2 className="label flex items-center gap-3">
                <span className="tabular-nums text-steel-ink">{String(i + 1).padStart(2, "0")}</span>
                {block.label}
              </h2>
            </Reveal>
            <Reveal delay={0.05} className="md:col-span-7 md:col-start-5">
              <p className="whitespace-pre-line text-lg leading-relaxed md:text-xl">
                <Txt>{block.value[locale]}</Txt>
              </p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Tools + results (dark) */}
      <section data-surface="dark" className="px-gutter grid gap-16 bg-charcoal py-24 text-ivory md:grid-cols-12 md:py-36">
        <div className="md:col-span-4">
          <Reveal>
            <h2 className="label text-steel">
              <span className="tabular-nums">08</span> — {c.tools}
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {cs.tools.map((tool, i) => (
              <Chip key={i} tone="dark">
                {tool}
              </Chip>
            ))}
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Reveal>
            <h2 className="label text-steel">
              <span className="tabular-nums">09</span> — {c.results}
            </h2>
            <p className="mt-2 font-serif text-lg italic text-ivory/55">{c.resultsNote}</p>
          </Reveal>
          <ul className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
            {cs.results[locale].map((result, i) => (
              <Reveal as="li" key={i} delay={i * 0.05} className="py-5 font-display text-2xl tracking-[-0.02em] md:text-3xl">
                <Txt>{result}</Txt>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-16">
            <h2 className="label text-steel">
              <span className="tabular-nums">10</span> — {c.learnings}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ivory/80 md:text-xl">
              <Txt>{cs.learnings[locale]}</Txt>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Visual material */}
      <section data-surface="light" className="px-gutter py-24 md:py-36">
        <Reveal>
          <h2 className="label">
            <span className="tabular-nums text-steel-ink">11</span> — {c.visuals}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-12">
          {(cs.gallery.length > 0 ? cs.gallery : [null, null, null]).map((image, i) => (
            <EditorialImage
              key={i}
              image={image}
              locale={locale}
              showCaption
              aspect={i % 3 === 0 ? "16 / 10" : "4 / 5"}
              figure={`Fig. ${String(i + 1).padStart(2, "0")}`}
              className={i % 3 === 0 ? "md:col-span-12" : "md:col-span-6"}
              sizes={i % 3 === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
            />
          ))}
        </div>
      </section>

      {/* Next project */}
      {next.slug !== project.slug && (
        <Link
          href={routes.project(locale, next.slug)}
          data-surface="dark"
          data-cursor={d.actions.nextProject}
          className="px-gutter group block bg-charcoal py-24 text-ivory md:py-36"
        >
          <span className="label text-steel">{d.actions.nextProject}</span>
          <span className="mt-6 flex items-end justify-between gap-8">
            <span className="display-tight text-giant transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4">
              <Txt>{next.title[locale]}</Txt>
            </span>
            <Arrow className="mb-4 h-10 w-10 shrink-0 transition-transform duration-700 group-hover:-rotate-45 md:h-16 md:w-16" />
          </span>
        </Link>
      )}
    </article>
  );
}
