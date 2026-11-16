"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  as?: "div" | "li" | "section" | "p" | "span";
}

/** Fades and lifts content into place the first time it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, amount = 0.2, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={reduce ? { duration: 0.3 } : { duration: 1, ease: ease.expo, delay }}
    >
      {children}
    </Component>
  );
}
