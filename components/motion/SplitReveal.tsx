"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { isPlaceholder } from "@/lib/placeholder";

interface SplitRevealProps {
  /** One string per visual line. */
  lines: string[];
  className?: string;
  /** Class applied to every line. */
  lineClassName?: string;
  /** Extra class per line index (serialisable, so it works from Server Components). */
  lineClassNames?: string[];
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
  /** Split by "chars" for display names, by "words" for longer headlines. */
  by?: "chars" | "words";
  as?: "h1" | "h2" | "h3" | "p" | "div";
}

/**
 * Headline that rises line by line from behind a mask.
 * Screen readers get the full text once via aria-label; the animated pieces are hidden.
 */
export function SplitReveal({
  lines,
  className,
  lineClassName,
  lineClassNames,
  immediate = false,
  delay = 0,
  stagger = 0.035,
  by = "words",
  as = "h2",
}: SplitRevealProps) {
  const reduce = useReducedMotion();
  const Tag = as;
  const label = lines.join(" ");
  let counter = 0;

  const animateProps = immediate
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, amount: 0.3 } };

  return (
    <Tag className={className} aria-label={label}>
      <motion.span aria-hidden className="block" initial="hidden" {...animateProps}>
        {lines.map((line, lineIndex) => {
          const pieces = by === "chars" ? Array.from(line) : line.split(/(\s+)/);
          const placeholder = isPlaceholder(line);
          return (
            <span
              key={lineIndex}
              className={cn(
                "block overflow-hidden pb-[0.08em] -mb-[0.08em]",
                lineClassName,
                lineClassNames?.[lineIndex],
                placeholder && "text-steel",
              )}
            >
              {pieces.map((piece, i) => {
                if (/^\s+$/.test(piece)) return <span key={i}>{piece}</span>;
                const index = counter++;
                return (
                  <motion.span
                    key={i}
                    className="inline-block will-change-transform"
                    // Same variants on server and client (reduced motion is unknown during SSR);
                    // with reduced motion the change is applied instantly instead.
                    variants={{ hidden: { y: "110%", rotate: 4 }, shown: { y: "0%", rotate: 0 } }}
                    transition={reduce ? { duration: 0 } : { duration: 1.1, ease: ease.expo, delay: delay + index * stagger }}
                  >
                    {piece === " " ? " " : piece}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
