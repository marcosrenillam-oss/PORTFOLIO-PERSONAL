import { cn } from "@/lib/cn";

/** "(02) — Selected work" editorial section marker. */
export function SectionLabel({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("label flex items-center gap-3", className)}>
      {index && <span className="tabular-nums opacity-60">({index})</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
