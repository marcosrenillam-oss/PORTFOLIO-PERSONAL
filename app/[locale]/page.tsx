import { experience, person, profile, projects, skillCategories } from "@/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { downloads } from "@/lib/site";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { CtaBand } from "@/components/home/CtaBand";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero locale={locale} dict={dict} person={person} cvHref={downloads.cv(locale)} />
      <Intro locale={locale} dict={dict} profile={profile} person={person} />
      {featured.length > 0 && <SelectedWork locale={locale} dict={dict} projects={featured.slice(0, 6)} />}
      <ExperiencePreview locale={locale} dict={dict} items={experience.slice(0, 4)} />
      <SkillsPreview locale={locale} dict={dict} categories={skillCategories} />
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
