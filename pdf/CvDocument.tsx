import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import {
  certifications,
  contact,
  courses,
  education,
  experience,
  languages,
  person,
  profile,
  skillCategories,
} from "@/content";
import type { Locale } from "@/content/types";
import { brand } from "@/lib/brand";
import { formatDate, formatRange, getDictionary } from "@/lib/i18n";
import { isEmptyOrPlaceholder } from "@/lib/placeholder";
import { PText } from "./shared";

/**
 * CV — ATS-first editorial layout.
 * - One column, reading order = visual order, real selectable text.
 * - Standard section headings ("Professional Experience", "Education", "Skills"…).
 * - No icons replacing information, no tables, no text in images, no hyphenation.
 * - Brand touches are limited to typography, a steel accent and hairline rules.
 */

const s = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 40,
    paddingHorizontal: 48,
    fontFamily: "Inter",
    fontSize: 9.2,
    lineHeight: 1.42,
    color: brand.charcoal,
    backgroundColor: brand.white,
  },
  name: { fontFamily: "SpaceGrotesk", fontWeight: 500, fontSize: 27, letterSpacing: -0.4, lineHeight: 1 },
  positioning: { marginTop: 6, fontSize: 10.5, color: brand.steelInk },
  contactLine: { marginTop: 9, fontSize: 8.6, color: brand.ink2, lineHeight: 1.5 },
  link: { color: brand.charcoal, textDecoration: "none" },
  rule: { marginTop: 14, height: 0.75, backgroundColor: brand.charcoal },
  section: { marginTop: 14 },
  heading: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 8.6,
    // No letter-spacing: tracked capitals are extracted as "E D U C A T I O N" by ATS parsers.
    textTransform: "uppercase",
    color: brand.charcoal,
    paddingBottom: 4,
    marginBottom: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: brand.stone,
  },
  entry: { marginBottom: 8 },
  entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitle: { fontWeight: 600, fontSize: 9.8, flexShrink: 1, paddingRight: 12 },
  entryDate: { fontSize: 8.6, color: brand.steelInk, textAlign: "right", flexShrink: 0 },
  entrySub: { fontSize: 8.8, color: brand.ink2, marginTop: 1 },
  bullet: { flexDirection: "row", marginTop: 2.5 },
  bulletMark: { width: 10, color: brand.steel },
  bulletText: { flex: 1 },
  inlineLabel: { fontWeight: 600 },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 48,
    right: 48,
    fontSize: 7,
    color: brand.steel,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.heading}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bullet}>
      <Text style={s.bulletMark}>•</Text>
      <PText style={s.bulletText}>{children}</PText>
    </View>
  );
}

export function CvDocument({ locale, siteUrl, contentHash }: { locale: Locale; siteUrl: string | null; contentHash: string }) {
  const d = getDictionary(locale);
  const roles = experience.filter((e) => e.inCv);
  const credentials = [...courses, ...certifications];
  const allTools = Array.from(new Set(skillCategories.flatMap((c) => c.tools)));
  // Until the site has a public URL (NEXT_PUBLIC_SITE_URL / Vercel), the CV shows a placeholder.
  const portfolioUrl = siteUrl ? `${siteUrl}/${locale}` : undefined;
  const portfolioDisplay = portfolioUrl ? portfolioUrl.replace(/^https?:\/\//, "") : "[ADD WEBSITE URL]";

  // Contact line — plain text separated by " | " so ATS parsers split it cleanly.
  const contactParts: { text: string; href?: string }[] = [
    { text: contact.email, href: isEmptyOrPlaceholder(contact.email) ? undefined : `mailto:${contact.email}` },
    ...(contact.phone ? [{ text: contact.phone }] : []),
    { text: `LinkedIn: ${contact.linkedin.display}`, href: contact.linkedin.url || undefined },
    ...contact.links.map((l) => ({ text: `${l.label}: ${l.display}`, href: l.url })),
    { text: person.location[locale] },
    { text: `${d.cv.links}: ${portfolioDisplay}`, href: portfolioUrl },
  ];

  return (
    <Document
      title={`${person.fullName} — CV`}
      author={person.fullName}
      subject={person.positioning[locale]}
      keywords={`CV, ${person.fullName}, ${person.positioning[locale]}`}
      creator={`marcos-renilla-portfolio content:${contentHash}`}
      producer="react-pdf"
      language={locale === "es" ? "es-ES" : "en"}
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <Text style={s.name}>{person.fullName}</Text>
        <PText style={s.positioning}>{person.positioning[locale]}</PText>
        <Text style={s.contactLine}>
          {contactParts.map((part, i) => (
            <Text key={i}>
              {i > 0 ? "  |  " : ""}
              {part.href ? (
                <Link src={part.href} style={s.link}>
                  {part.text}
                </Link>
              ) : (
                <PText>{part.text}</PText>
              )}
            </Text>
          ))}
        </Text>
        <View style={s.rule} />

        <Section title={d.cv.profile}>
          <PText>{profile.cvSummary[locale]}</PText>
        </Section>

        <Section title={d.cv.experience}>
          {roles.map((role) => (
            <View key={role.id} style={s.entry} wrap={false}>
              <View style={s.entryHead}>
                <PText style={s.entryTitle}>{`${role.role[locale]} — ${role.organization}`}</PText>
                <PText style={s.entryDate}>{formatRange(role.start, role.end, locale)}</PText>
              </View>
              <PText style={s.entrySub}>{`${role.employmentType[locale]} · ${role.location[locale]}`}</PText>
              {role.responsibilities[locale].map((r, i) => (
                <Bullet key={i}>{r}</Bullet>
              ))}
            </View>
          ))}
        </Section>

        <Section title={d.cv.education}>
          {education.map((ed) => (
            <View key={ed.id} style={s.entry} wrap={false}>
              <View style={s.entryHead}>
                <PText style={s.entryTitle}>{`${ed.degree[locale]} — ${ed.institution}`}</PText>
                <PText style={s.entryDate}>{formatRange(ed.start, ed.end, locale)}</PText>
              </View>
              <PText style={s.entrySub}>{ed.location[locale]}</PText>
              {ed.details[locale].map((detail, i) => (
                <Bullet key={i}>{detail}</Bullet>
              ))}
            </View>
          ))}
        </Section>

        {credentials.length > 0 && (
          <Section title={d.cv.courses}>
            {credentials.map((c) => (
              <View key={c.id} style={[s.entryHead, { marginBottom: 2.5 }]}>
                <PText style={{ flexShrink: 1, paddingRight: 12 }}>{`${c.name[locale]} — ${c.issuer}`}</PText>
                <PText style={s.entryDate}>{formatDate(c.date, locale)}</PText>
              </View>
            ))}
          </Section>
        )}

        <Section title={d.cv.skills}>
          {skillCategories.map((cat) => (
            <Text key={cat.id} style={{ marginBottom: 2.5 }}>
              <Text style={s.inlineLabel}>{cat.title[locale]}: </Text>
              <PText>{cat.skills[locale].join(", ")}</PText>
            </Text>
          ))}
          {allTools.length > 0 && (
            <Text style={{ marginTop: 3 }}>
              <Text style={s.inlineLabel}>{d.cv.tools}: </Text>
              <PText>{allTools.join(", ")}</PText>
            </Text>
          )}
        </Section>

        <Section title={d.cv.languages}>
          <PText>{languages.map((l) => `${l.name[locale]} — ${l.level[locale]}`).join("  |  ")}</PText>
        </Section>

        <View style={s.footer} fixed>
          <Text>{person.fullName}</Text>
          <Text render={({ pageNumber, totalPages }) => (totalPages > 1 ? `${pageNumber} / ${totalPages}` : portfolioDisplay)} />
        </View>
      </Page>
    </Document>
  );
}
