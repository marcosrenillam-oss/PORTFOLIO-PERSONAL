import Link from "next/link";

/** Bilingual 404 (the locale isn't available to not-found components). */
export default function NotFound() {
  return (
    <section data-surface="light" className="px-gutter flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="label text-steel-ink">404</p>
      <h1 className="display-tight mt-6 text-giant">
        Página no encontrada
        <span className="block font-serif text-[0.5em] font-normal italic tracking-[-0.02em] text-steel">Page not found</span>
      </h1>
      <div className="mt-10 flex gap-6">
        <Link href="/es" className="link-underline label">Volver al inicio ↗</Link>
        <Link href="/en" className="link-underline label">Back home ↗</Link>
      </div>
    </section>
  );
}
