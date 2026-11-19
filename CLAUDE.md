# CLAUDE.md — reglas permanentes del proyecto

Ecosistema profesional de **Marcos Renilla**: web portfolio (ES/EN) + CV PDF (ES/EN, ATS) + portfolio PDF (ES/EN), todo generado desde `/content`. Lee también `README.md` (recetas paso a paso).

## Reglas no negociables

1. **Nunca inventar información.** Ni experiencia, métricas, clientes, premios, resultados, testimonios, formación, idiomas, niveles ni biografía. Si falta un dato: placeholder `[ADD …]` (mayúsculas, formato `/\[ADD [A-Z0-9 &/-]+\]/`).
2. **Única fuente de verdad.** Los datos personales solo viven en `content/*.ts`. Componentes (`components/`, `app/`) y PDF (`pdf/`) leen de `@/content`; nunca escribas datos dentro de ellos. Los textos de interfaz van en `content/ui.ts`.
3. **Bilingüe siempre.** Todo texto visible es `Localized` (`{ es, en }`), con la misma estructura y calidad en ambos idiomas, redactado con naturalidad (no traducción literal). `npm run content:check` falla si los arrays ES/EN no coinciden.
4. **Tipos de proyecto explícitos**: `professional` (real), `personal` (real, iniciativa propia), `concept` (ejercicio/académico, nunca presentado como real). Resultados solo si son verificables.
5. **Textos genéricos, no dirigidos a una empresa concreta** (no nombrar sectores/empresas a los que aplica, ni "busco trabajo").
6. **Habilidades: una sola lista** (`content/skills.ts`), sin categorías (decisión de Marcos), sin barras de porcentaje ni niveles inventados.
6. **PDF siempre sincronizados**: tras cambiar `/content`, ejecutar `npm run export:all` y `npm run pdf:check`, y hacer commit de los PDF de `public/downloads/`. La huella `content:<hash>` en los metadatos detecta PDF obsoletos. `npm run build` los regenera (prebuild).
7. **CV compatible con ATS**: una columna, orden de lectura = orden visual, encabezados estándar, texto seleccionable, sin iconos que sustituyan información, sin tablas, **sin letter-spacing en mayúsculas** (se extrae como "E D U C A T I O N"), sin guionado (desactivado en `pdf/fonts.ts`). Objetivo: 1 página (`pdf:check` avisa si hay más).
8. No afirmar que algo está probado/publicado sin haberlo ejecutado.

## Flujo de trabajo para cambios de contenido
```bash
# editar content/*.ts
npm run content:check
npm run export:all && npm run pdf:check
npm run build            # o: npm run verify (todo)
```

## Arquitectura (resumen)
- Next.js 16 App Router, `app/[locale]/…` con `generateStaticParams` + `dynamicParams = false` → todo estático. `/` redirige a `/es` (`next.config.ts`).
- `params` es una Promise (Next 15+): `const { locale } = await params; if (!isLocale(locale)) notFound();`
- i18n: `lib/i18n.ts` → `getDictionary(locale)` resuelve `content/ui.ts`; `t()`, `formatDate()` ("AAAA-MM"), `formatRange()`, `switchLocalePath()`.
- Rutas y descargas: `lib/site.ts` (`routes`, `downloads`, `siteUrl`, `publicSiteUrl`).
- SEO: `lib/metadata.ts` (`pageMetadata`) con canonical, hreflang y Open Graph; `app/[locale]/opengraph-image.tsx`; `app/sitemap.ts`; `app/robots.ts`.
- PDF: `pdf/CvDocument.tsx`, `pdf/PortfolioDocument.tsx` (A4 apaisado), `pdf/shared.tsx` (`PText` resalta placeholders, `PdfImage` foto o marco placeholder). Script: `scripts/export-pdf.tsx`. Imágenes de PDF: solo JPG/PNG.
- `package.json` es `"type": "module"` (necesario para `@react-pdf` bajo `tsx`).
- Server Components no pueden pasar funciones a Client Components (p. ej. usar `lineClassNames: string[]` en `SplitReveal`, no funciones).

## Sistema de diseño
- Dirección: *Modern editorial dark + light ivory editorial*. Estudio creativo contemporáneo, no plantilla ni CV convertido en web.
- Colores (`styles/globals.css` `@theme` y `lib/brand.ts`, mantener ambos iguales): ivory `#F3F0E9` (fondo principal), charcoal `#171717` (secciones de contraste), stone `#DCD9D2`, steel `#8795A3` (acento discreto; `steel-ink #5E6B78` para texto pequeño), white.
- Tipografía: Space Grotesk (titulares, `font-display`, `display-tight`), Inter (texto, `font-sans`), Instrument Serif itálica (detalles, `font-serif`). Fuentes desde `@fontsource` vía `next/font/local` (`lib/fonts.ts`) y `pdf/fonts.ts`.
- Escala: `text-mega`, `text-giant`, `text-display`, `text-headline`, `text-lede`; utilidades `label`, `px-gutter`, `grain`, `link-underline`, `placeholder-text`.
- Composición: grid de 12 columnas, asimetría, mucho espacio negativo, marcadores de sección `(01) —— Label` (`SectionLabel`).
- Superficies oscuras: marcar con `data-surface="dark"` para que el header cambie de color. `SurfaceShift` hace la transición marfil→carbón con el scroll.
- Fotos personales: blanco y negro con la paleta (duotono carbón → marfil). Retrato del hero = foto real enmarcada (`portrait.jpg`), fondo desenfocado tipo modo retrato y duotono; **nada de recortes/siluetas** (Marcos los rechazó: parecen pegatinas). Sin IA sobre la apariencia de Marcos salvo que él lo pida.
- Variante `wide:` (globals.css): escritorio/tablet horizontal **y móvil en horizontal** usan la composición de escritorio del hero.
- Imágenes: siempre mediante `EditorialImage` (revelado por máscara; el disparador in-view está en el `<figure>` porque IntersectionObserver ignora elementos recortados al 100 %).

## Motion
- Motion (`motion/react`), tokens en `lib/motion.ts` (`ease.expo`, `ease.quart`).
- Cada movimiento con finalidad: titulares por máscara (`SplitReveal`), `Reveal` al entrar en viewport, revelado de fotos, parallax moderado (±5 %), botones con relleno deslizante, `Magnetic` en CTAs, header que se oculta al bajar, barra de progreso, cursor opcional (solo puntero fino y sin reduced motion), transición de página (`template.tsx`), marquee de sectores.
- `MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion` obligatorios. No añadir efectos decorativos sin propósito.

## Estado / fases
- Fase 1 (fundación y diseño) y Fase 2 (documentos) completadas.
- **Fase 3 (contenido) pendiente**: esperar a que Marcos facilite la información real. No rellenar con inventos.
- Fase 4: despliegue en Vercel (ver README) y conectar dominio (`NEXT_PUBLIC_SITE_URL`).

## QA antes de dar algo por terminado
`npm run verify`, y revisar en navegador (escritorio 1440 px y móvil 390 px): rutas `/es`, `/en`, about, experience, projects, projects/[slug], skills, education, contact; sin errores de consola; sin scroll horizontal; PDF abiertos y revisados visualmente (`pdftoppm`).
