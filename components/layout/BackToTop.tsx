"use client";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="label w-fit text-ivory/60 transition-colors hover:text-ivory"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      {label} ↑
    </button>
  );
}
