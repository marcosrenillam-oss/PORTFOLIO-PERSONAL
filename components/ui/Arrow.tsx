import { cn } from "@/lib/cn";

export function Arrow({ className, direction = "right" }: { className?: string; direction?: "right" | "up-right" | "down" | "left" | "up" }) {
  const rotation = { right: 0, "up-right": -45, down: 90, left: 180, up: -90 }[direction];
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-[1em] w-[1em] shrink-0", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M4 12h15m0 0-6.5-6.5M19 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
