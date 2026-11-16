# Marcos Renilla — Portfolio ecosystem

Tres entregables conectados que salen de **una única fuente de contenido**:

| Entregable | Dónde | Cómo se genera |
|---|---|---|
| Web portfolio (ES / EN) | `app/`, `components/` | `npm run dev` / `npm run build` |
| CV PDF (ES / EN, ATS) | `public/downloads/marcos-renilla-cv-{es,en}.pdf` | `npm run export:cv` |
| Portfolio PDF (ES / EN) | `public/downloads/marcos-renilla-portfolio-{es,en}.pdf` | `npm run export:portfolio` |

Stack: Next.js 16 (App Router, páginas estáticas) · React 19 · TypeScript · Tailwind CSS 4 · Motion · @react-pdf/renderer · fuentes auto-alojadas (@fontsource).

---

## Puesta en marcha

```bash
npm install
npm run dev          # http://localhost:3000 → redirige a /es
```

Requiere Node 20.9 o superior (recomendado 22, ver `.nvmrc`).

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | **Regenera los 4 PDF** (prebuild) y compila la web |
| `npm run start` | Sirve la build de producción |
| `npm run export:cv` | Genera solo los CV (ES + EN) |
| `npm run export:portfolio` | Genera solo los portfolios PDF (ES + EN) |
| `npm run export:all` | Genera los 4 PDF |
| `npm run content:check` | Valida el contenido: paridad ES/EN, ids, slugs, imágenes; lista los placeholders pendientes |
| `npm run content:check -- --strict` | Igual, pero falla si quedan placeholders (úsalo antes del lanzamiento) |
| `npm run pdf:check` | Comprueba que los PDF existen, son de la versión actual del contenido y su texto es extraíble |
| `npm run verify` | Todo lo anterior + build |
| `npm run typecheck` | Comprobación de tipos |

---

## Dónde se modifica cada dato

**Todo el contenido vive en `/content`.** Los componentes y los PDF nunca contienen datos personales.

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, posicionamiento, ubicación, disponibilidad, fotos personales | `content/person.ts` → `person` |
| Email, teléfono, LinkedIn, otros perfiles | `content/person.ts` → `contact` |
| Introducción, texto de *Sobre mí*, resumen del CV, intereses, forma de trabajar, sectores | `content/profile.ts` |
| Experiencia profesional | `content/experience.ts` |
| Formación, cursos, certificaciones, idiomas | `content/education.ts` |
| Competencias y herramientas | `content/skills.ts` |
| Proyectos y casos de estudio | `content/projects.ts` |
| Textos de interfaz (menú, botones, títulos de sección, encabezados del CV) | `content/ui.ts` |
| Colores | `styles/globals.css` (`@theme`) **y** `lib/brand.ts` (PDF) |
| URL pública / dominio | Variable de entorno `NEXT_PUBLIC_SITE_URL` |

Cada texto visible es `{ es: "…", en: "…" }`. Escribe ambas versiones con naturalidad, no como traducción literal.

### Placeholders

La información pendiente se escribe como `[ADD ALGO]` (por ejemplo `[ADD EXPERIENCE]`). Se muestran en gris acero y subrayado punteado en la web y en los PDF, para que nada pendiente pase desapercibido. `npm run content:check` los cuenta por sección.

**No se inventa nada**: ni métricas, ni clientes, ni resultados, ni testimonios. Si un dato no existe, se queda el placeholder o se elimina el bloque.

---

## Recetas

### Actualizar la experiencia
1. Abre `content/experience.ts`.
2. Sustituye un bloque `placeholderRole("experience-01")` por un objeto completo (copia la forma del helper) o edita sus campos.
3. Fechas en formato `"AAAA-MM"`; `end: null` = "Actualidad / Present". Orden: más reciente primero.
4. `inCv: false` oculta ese puesto en el CV pero lo mantiene en la web.
5. `npm run content:check && npm run export:cv`.

### Añadir un proyecto
1. Crea la carpeta `public/images/projects/<slug>/` con las imágenes (**JPG o PNG**, ≈2000 px de lado largo).
2. En `content/projects.ts`, añade un objeto `Project` al array `projects`:
   - `slug`: minúsculas-con-guiones (será la URL `/es/projects/<slug>`).
   - `kind`: `"professional"` (real), `"personal"` (iniciativa propia real) o `"concept"` (ejercicio / académico / especulativo).
   - `organization`: solo en proyectos reales; si no, `null`.
   - `featured: true` → aparece en *Proyectos seleccionados* de la home.
   - `inPortfolio: true` → entra en el portfolio PDF.
   - `caseStudy.results`: **solo resultados reales y verificables**.
   - `cover` y `caseStudy.gallery`: objetos `{ src, alt: { es, en }, width, height, caption? }`.
3. Elimina los proyectos placeholder (`project-01`…`03`) cuando ya no hagan falta.
4. `npm run content:check && npm run export:portfolio`.

### Cambiar una fotografía
1. Copia el archivo a `public/images/profile/` (retrato) o `public/images/projects/<slug>/`.
2. Referencia la ruta en el contenido, por ejemplo en `content/person.ts`:
   ```ts
   portrait: {
     src: "/images/profile/portrait.jpg",
     alt: { es: "Retrato de Marcos Renilla", en: "Portrait of Marcos Renilla" },
     width: 1600,
     height: 2000,
   },
   ```
3. Usa JPG/PNG: la web los optimiza a AVIF/WebP automáticamente y los PDF solo admiten JPG/PNG.
4. Si `portrait`/`cover` es `null`, se muestra un marco editorial con el texto `[ADD PROFILE PHOTO]` / `[ADD PROJECT IMAGE]`.

### Generar los PDF
```bash
npm run export:all     # o export:cv / export:portfolio
npm run pdf:check      # confirma que corresponden al contenido actual
```
Cada PDF lleva en sus metadatos (`Creator`) una huella del contenido (`content:<hash>`). Si cambias cualquier archivo de `/content` y no regeneras, `pdf:check` (y la CI) fallará indicando que están desactualizados. Además, `npm run build` los regenera siempre antes de compilar, así que **cada despliegue publica PDFs que coinciden con su contenido**. Haz commit de los PDF regenerados para que el repositorio también esté al día.

---

## Publicación (Vercel)

1. Sube el repositorio a GitHub (ya lo está).
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio. Vercel detecta Next.js; no hay que cambiar nada:
   - Build command: `npm run build` (ejecuta `prebuild` → genera los PDF).
   - Node: 22.
3. Variables de entorno (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = `https://tu-dominio.com` (cuando tengas dominio). Sin ella se usa la URL de producción de Vercel.
4. Dominio propio: Project → Settings → Domains → añade el dominio y configura los DNS que indique Vercel. Después actualiza `NEXT_PUBLIC_SITE_URL` y vuelve a desplegar: canonical, sitemap, Open Graph y la URL impresa en los PDF se actualizan solos.

Cada `git push` a la rama de producción redespliega la web y regenera los PDF.

### CI
`.github/workflows/ci.yml` ejecuta en cada push: typecheck → `content:check` → `pdf:check` (PDF del repo al día) → `build`.

---

## Arquitectura

```
app/[locale]/            Rutas (es | en), todas estáticas
  page.tsx               Home
  about/ experience/ projects/ projects/[slug]/ skills/ education/ contact/
  layout.tsx             <html lang>, fuentes, header, footer, cursor, progreso de scroll
  template.tsx           Transición de entrada entre páginas
  opengraph-image.tsx    Imagen OG generada por idioma
app/sitemap.ts, robots.ts, icon.svg
components/
  layout/                Header (oculta al bajar, se adapta a superficies oscuras), menú móvil, footer, cursor, progreso
  motion/                Reveal, SplitReveal (titulares por máscara), Magnetic, MotionProvider (reduced motion)
  home/                  Secciones de la home
  projects/              Tarjeta y galería filtrable
  ui/                    EditorialImage (foto o placeholder, revelado por máscara, parallax), botones, chips, Txt (placeholders)
content/                 ← ÚNICA FUENTE DE VERDAD
lib/                     i18n, rutas, metadatos SEO, fuentes, huella de contenido, tokens de marca
pdf/                     CvDocument, PortfolioDocument, fuentes y componentes PDF
scripts/                 export-pdf, check-content, check-pdfs
public/downloads/        PDF generados
public/images/           Fotografías
```

### Accesibilidad y rendimiento
- `prefers-reduced-motion` respetado (Motion `reducedMotion="user"` + CSS); el cursor personalizado solo existe con puntero fino.
- Enlace "Saltar al contenido", foco visible, `aria-current`, `lang`/`hreflang`, textos alternativos desde el contenido.
- Todas las páginas se prerenderizan en estático; fuentes locales con `next/font`; imágenes con `next/image`.
