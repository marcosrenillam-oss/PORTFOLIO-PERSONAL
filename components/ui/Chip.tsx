import { cn } from "@/lib/cn";
import { Txt } from "./Txt";

export function Chip({ children, tone = "light", className }: { children: string; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.8125rem] leading-tight",
        tone === "light" ? "border-charcoal/15 text-charcoal" : "border-ivory/20 text-ivory",
        className,
      )}
    >
      <Txt>{children}</Txt>
    </span>
  );
}
