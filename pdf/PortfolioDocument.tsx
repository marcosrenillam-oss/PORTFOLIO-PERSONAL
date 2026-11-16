import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { contact, person, profile, projectKinds, projects } from "@/content";
import type { Locale, Localized, Project } from "@/content/types";
import { brand } from "@/lib/brand";
import { formatDate, getDictionary } from "@/lib/i18n";
import { isEmptyOrPlaceholder } from "@/lib/placeholder";
import { PdfImage, PText } from "./shared";

/**
 * Portfolio PDF — a small editorial publication (A4 landscape), not a print of the website.
 * Structure: cover → introduction → contents (3+ projects) → per project: opener + case study
 * (+ visuals page when the project has a gallery) → contact.
 */

const W = 842;
const M = 44; // outer margin

const s = StyleSheet.create({
  page: { fontFamily: "Inter", fontSize: 9, lineHeight: 1.45, color: brand.charcoal, backgroundColor: brand.ivory, padding: M, paddingBottom: 56 },
  dark: { backgroundColor: brand.charcoal, color: brand.ivory },
  label: { fontFamily: "Inter", fontWeight: 500, fontSize: 6.8, letterSpacing: 1.3, textTransform: "uppercase" },
  display: { fontFamily: "SpaceGrotesk", fontWeight: 500, letterSpacing: -2, lineHeight: 0.92 },
  serif: { fontFamily: "InstrumentSerif", fontStyle: "italic" },
  footer: {
    position: "absolute",
    left: M,
    right: M,
    bottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 6.8,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  rule: { height: 0.5, backgroundColor: brand.charcoal, opacity: 0.18 },
});

function Footer({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const d = getDictionary(locale);
  return (
    <View style={[s.footer, { color: dark ? "rgba(243,240,233,0.5)" : brand.steelInk }]} fixed>
      <Text>{`${person.brandName} — ${d.portfolioPdf.title}`}</Text>
      <Text render={({ pageNumber }) => String(pageNumber).padStart(2, "0")} />
    </View>
  );
}

function Label({ index, children, color }: { index?: string; children: string; color?: string }) {
  return (
    <Text style={[s.label, { color: color ?? brand.steelInk }]}>
      {index ? `(${index})  —  ` : ""}
      {children}
    </Text>
  );
}

/* ───────────── Pages ───────────── */

function Cover({ locale, year }: { locale: Locale; year: number }) {
  const d = getDictionary(locale);
  const [first, ...rest] = person.brandName.toUpperCase().split(" ");
  return (
    <Page size="A4" orientation="landscape" style={[s.page, s.dark, { justifyContent: "space-between", paddingBottom: M }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[s.label, { color: brand.ivory }]}>{`${d.portfolioPdf.title} — ${d.portfolioPdf.edition} ${year}`}</Text>
        <Text style={[s.label, { color: brand.steel }]}>{locale.toUpperCase()}</Text>
      </View>
      <View>
        <Text style={[s.display, { fontSize: 128, letterSpacing: -6, color: brand.ivory }]}>{first}</Text>
        <Text style={[s.display, { fontSize: 128, letterSpacing: -6, color: brand.ivory, paddingLeft: 96 }]}>{rest.join(" ")}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <PText style={[s.serif, { fontSize: 22, color: brand.ivory, maxWidth: 420 }]}>{person.positioning[locale]}</PText>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: brand.steel }} />
      </View>
    </Page>
  );
}

function Introduction({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const colW = (W - M * 2 - 32) / 2;
  return (
    <Page size="A4" orientation="landscape" style={s.page}>
      <View style={{ flexDirection: "row", gap: 32, flexGrow: 1 }}>
        <View style={{ width: colW * 1.15, justifyContent: "space-between" }}>
          <View>
            <Label index="01">{d.portfolioPdf.introduction}</Label>
            <PText style={[s.display, { fontSize: 30, letterSpacing: -1, lineHeight: 1.08, marginTop: 26 }]}>
              {profile.intro[locale]}
            </PText>
          </View>
          <View>
            <Label>{d.home.openToLabel}</Label>
            <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
              {profile.openTo[locale].map((field, i) => (
                <Text key={field} style={{ width: "50%", fontSize: 8.6, paddingVertical: 3.2, borderTopWidth: 0.5, borderTopColor: brand.stone }}>
                  <Text style={{ color: brand.steelInk }}>{String(i + 1).padStart(2, "0")}   </Text>
                  {field}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={{ width: colW * 0.85 }}>
          <PdfImage image={person.portrait} label="[ADD PROFILE PHOTO]" style={{ width: "100%", height: 400 }} />
          <PText style={[s.serif, { fontSize: 11, marginTop: 8, color: brand.ink2 }]}>{person.location[locale]}</PText>
        </View>
      </View>
      <Footer locale={locale} />
    </Page>
  );
}

function Contents({ locale, list }: { locale: Locale; list: Project[] }) {
  const d = getDictionary(locale);
  return (
    <Page size="A4" orientation="landscape" style={s.page}>
      <View style={{ flexDirection: "row", gap: 32 }}>
        <View style={{ width: 280 }}>
          <Label index="02">{d.portfolioPdf.contents}</Label>
          <Text style={[s.display, { fontSize: 40, letterSpacing: -1.4, lineHeight: 0.98, marginTop: 24 }]}>{d.portfolioPdf.selectedProjects}</Text>
        </View>
        <View style={{ flex: 1, marginTop: 4 }}>
          {list.map((p, i) => (
            <View key={p.slug} style={{ flexDirection: "row", alignItems: "baseline", paddingVertical: 12, borderTopWidth: 0.5, borderTopColor: brand.stone }}>
              <Text style={[s.label, { width: 40, color: brand.steelInk }]}>{String(i + 1).padStart(2, "0")}</Text>
              <PText style={[s.display, { flex: 1, fontSize: 22, letterSpacing: -0.8, lineHeight: 1.05 }]}>{p.title[locale]}</PText>
              <Text style={[s.label, { width: 130, textAlign: "right", color: brand.ink2 }]}>{projectKinds[p.kind].label[locale]}</Text>
            </View>
          ))}
        </View>
      </View>
      <Footer locale={locale} />
    </Page>
  );
}

function ProjectOpener({ locale, project, index }: { locale: Locale; project: Project; index: number }) {
  const d = getDictionary(locale);
  const c = d.pages.caseStudy;
  const kind = projectKinds[project.kind];
  const meta: [string, string][] = [
    [c.type, kind.label[locale]],
    [c.year, formatDate(project.year, locale)],
    ...(project.organization ? ([[c.organization, project.organization]] as [string, string][]) : []),
    [c.myRole, project.role[locale]],
  ];
  return (
    <Page size="A4" orientation="landscape" style={[s.page, { padding: 0, paddingBottom: 0, flexDirection: "row" }]}>
      <PdfImage image={project.cover} label={d.portfolioPdf.imagePlaceholder} style={{ width: W * 0.56, height: "100%" }} />
      <View style={{ flex: 1, padding: M, paddingBottom: 56, justifyContent: "space-between" }}>
        <View>
          <Label index={String(index + 1).padStart(2, "0")}>{d.portfolioPdf.caseStudy}</Label>
          <PText style={[s.display, { fontSize: 40, letterSpacing: -1.6, marginTop: 22 }]}>{project.title[locale]}</PText>
          <PText style={{ marginTop: 18, fontSize: 10.5, lineHeight: 1.5, color: brand.ink2 }}>{project.summary[locale]}</PText>
        </View>
        <View>
          {meta.map(([label, value]) => (
            <View key={label} style={{ flexDirection: "row", paddingVertical: 6, borderTopWidth: 0.5, borderTopColor: brand.stone }}>
              <Text style={[s.label, { width: 92, color: brand.steelInk, paddingTop: 1.5 }]}>{label}</Text>
              <PText style={{ flex: 1, fontSize: 9 }}>{value}</PText>
            </View>
          ))}
          <Text style={[s.serif, { fontSize: 10, marginTop: 8, color: brand.steelInk }]}>{kind.description[locale]}</Text>
        </View>
      </View>
      <Footer locale={locale} />
    </Page>
  );
}

function CaseStudyPage({ locale, project }: { locale: Locale; project: Project }) {
  const d = getDictionary(locale);
  const c = d.pages.caseStudy;
  const cs = project.caseStudy;
  const blocks: [string, Localized][] = [
    [c.context, cs.context],
    [c.objective, cs.objective],
    [c.challenge, cs.challenge],
    [c.myRole, cs.role],
    [c.process, cs.process],
    [c.strategy, cs.strategy],
    [c.execution, cs.execution],
  ];
  const Block = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
    <View style={{ marginBottom: 14 }} wrap={false}>
      <Text style={[s.label, { color: brand.steelInk, marginBottom: 5 }]}>{`${String(n).padStart(2, "0")}  ${title}`}</Text>
      {children}
    </View>
  );
  return (
    <Page size="A4" orientation="landscape" style={s.page} wrap>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <PText style={[s.display, { fontSize: 18, letterSpacing: -0.6 }]}>{project.title[locale]}</PText>
        <Text style={[s.label, { color: brand.steelInk }]}>{projectKinds[project.kind].label[locale]}</Text>
      </View>
      <View style={[s.rule, { marginBottom: 20 }]} />
      <View style={{ flexDirection: "row", gap: 32 }}>
        <View style={{ flex: 1 }}>
          {blocks.slice(0, 4).map(([title, value], i) => (
            <Block key={title} n={i + 1} title={title}>
              <PText style={{ fontSize: 9.4 }}>{value[locale]}</PText>
            </Block>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {blocks.slice(4).map(([title, value], i) => (
            <Block key={title} n={i + 5} title={title}>
              <PText style={{ fontSize: 9.4 }}>{value[locale]}</PText>
            </Block>
          ))}
          <Block n={8} title={c.tools}>
            <PText style={{ fontSize: 9.4 }}>{cs.tools.join(" · ")}</PText>
          </Block>
        </View>
        <View style={{ flex: 1, backgroundColor: brand.charcoal, color: brand.ivory, padding: 18 }}>
          <Text style={[s.label, { color: brand.steel }]}>{`09  ${c.results}`}</Text>
          <Text style={[s.serif, { fontSize: 10, color: "rgba(243,240,233,0.6)", marginTop: 3 }]}>{c.resultsNote}</Text>
          {cs.results[locale].map((r, i) => (
            <PText key={i} style={[s.display, { fontSize: 15, letterSpacing: -0.4, lineHeight: 1.15, marginTop: 12 }]}>
              {r}
            </PText>
          ))}
          <Text style={[s.label, { color: brand.steel, marginTop: 24 }]}>{`10  ${c.learnings}`}</Text>
          <PText style={{ fontSize: 9.4, marginTop: 6, color: "rgba(243,240,233,0.85)" }}>{cs.learnings[locale]}</PText>
        </View>
      </View>
      <Footer locale={locale} />
    </Page>
  );
}

function VisualsPage({ locale, project }: { locale: Locale; project: Project }) {
  const d = getDictionary(locale);
  const images = project.caseStudy.gallery;
  const [hero, ...rest] = images;
  return (
    <Page size="A4" orientation="landscape" style={s.page}>
      <Label>{`11  ${d.pages.caseStudy.visuals}`}</Label>
      <View style={{ flexDirection: "row", gap: 14, marginTop: 14, flexGrow: 1 }}>
        <View style={{ flex: 1.4 }}>
          <PdfImage image={hero} label={d.portfolioPdf.imagePlaceholder} style={{ width: "100%", height: 380 }} />
          {hero?.caption && <Text style={[s.serif, { fontSize: 9.5, marginTop: 6, color: brand.ink2 }]}>{hero.caption[locale]}</Text>}
        </View>
        {rest.length > 0 && (
          <View style={{ flex: 1, gap: 14 }}>
            {rest.slice(0, 2).map((img, i) => (
              <View key={i}>
                <PdfImage image={img} label={d.portfolioPdf.imagePlaceholder} style={{ width: "100%", height: 183 }} />
              </View>
            ))}
          </View>
        )}
      </View>
      <Footer locale={locale} />
    </Page>
  );
}

function ContactPage({ locale, siteUrl }: { locale: Locale; siteUrl: string | null }) {
  const d = getDictionary(locale);
  const hasEmail = !isEmptyOrPlaceholder(contact.email);
  const rows: { label: string; value: string; href?: string }[] = [
    { label: d.pages.contact.email, value: contact.email, href: hasEmail ? `mailto:${contact.email}` : undefined },
    ...(contact.phone ? [{ label: d.pages.contact.phone, value: contact.phone }] : []),
    { label: "LinkedIn", value: contact.linkedin.display, href: contact.linkedin.url || undefined },
    ...contact.links.map((l) => ({ label: l.label, value: l.display, href: l.url })),
    siteUrl
      ? { label: d.portfolioPdf.onlineVersion, value: `${siteUrl}/${locale}`.replace(/^https?:\/\//, ""), href: `${siteUrl}/${locale}` }
      : { label: d.portfolioPdf.onlineVersion, value: "[ADD WEBSITE URL]" },
  ];
  return (
    <Page size="A4" orientation="landscape" style={[s.page, s.dark, { justifyContent: "space-between" }]}>
      <Label color={brand.steel}>{d.portfolioPdf.contact}</Label>
      <View>
        <Text style={[s.display, { fontSize: 110, letterSpacing: -5, color: brand.ivory }]}>{d.portfolioPdf.thanks}</Text>
        <Text style={[s.serif, { fontSize: 20, marginTop: 14, color: brand.steel }]}>{d.home.ctaText}</Text>
      </View>
      <View>
        {rows.map((r) => (
          <View key={r.label} style={{ flexDirection: "row", paddingVertical: 7, borderTopWidth: 0.5, borderTopColor: "rgba(243,240,233,0.15)" }}>
            <Text style={[s.label, { width: 130, color: "rgba(243,240,233,0.5)", paddingTop: 2 }]}>{r.label}</Text>
            {r.href ? (
              <Link src={r.href} style={{ fontSize: 11, color: brand.ivory, textDecoration: "none" }}>
                {r.value}
              </Link>
            ) : (
              <PText style={{ fontSize: 11 }}>{r.value}</PText>
            )}
          </View>
        ))}
      </View>
      <Footer locale={locale} dark />
    </Page>
  );
}

export function PortfolioDocument({ locale, siteUrl, contentHash }: { locale: Locale; siteUrl: string | null; contentHash: string }) {
  const d = getDictionary(locale);
  const list = projects.filter((p) => p.inPortfolio);
  const year = new Date().getFullYear();
  return (
    <Document
      title={`${person.brandName} — ${d.portfolioPdf.title}`}
      author={person.fullName}
      subject={person.positioning[locale]}
      keywords={`Portfolio, ${person.brandName}, ${person.positioning[locale]}`}
      creator={`marcos-renilla-portfolio content:${contentHash}`}
      producer="react-pdf"
      language={locale === "es" ? "es-ES" : "en"}
      pageMode="useNone"
    >
      <Cover locale={locale} year={year} />
      <Introduction locale={locale} />
      {list.length >= 3 && <Contents locale={locale} list={list} />}
      {list.flatMap((project, i) => [
        <ProjectOpener key={`${project.slug}-open`} locale={locale} project={project} index={i} />,
        <CaseStudyPage key={`${project.slug}-case`} locale={locale} project={project} />,
        ...(project.caseStudy.gallery.length > 0 ? [<VisualsPage key={`${project.slug}-visuals`} locale={locale} project={project} />] : []),
      ])}
      <ContactPage locale={locale} siteUrl={siteUrl} />
    </Document>
  );
}
