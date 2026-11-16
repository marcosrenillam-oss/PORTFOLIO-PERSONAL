"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Fluid transition from the ivory surface to charcoal as the section scrolls in.
 * The section itself is marked data-surface="dark" so the header adapts.
 */
export function SurfaceShift({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const backgroundColor = useTransform(scrollYProgress, [0, 1], reduce ? ["#171717", "#171717"] : ["#F3F0E9", "#171717"]);
  const color = useTransform(scrollYProgress, [0, 0.6, 1], reduce ? ["#F3F0E9", "#F3F0E9", "#F3F0E9"] : ["#171717", "#8a8a86", "#F3F0E9"]);
  return (
    <motion.section ref={ref} id={id} data-surface="dark" style={{ backgroundColor, color }} className={className}>
      {children}
    </motion.section>
  );
}
