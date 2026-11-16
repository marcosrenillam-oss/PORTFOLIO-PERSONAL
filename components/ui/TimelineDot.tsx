"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";

export function TimelineDot() {
  return (
    <span aria-hidden className="relative flex h-3 w-3 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full border border-steel"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: ease.expo }}
      />
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-charcoal"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: ease.expo, delay: 0.2 }}
      />
    </span>
  );
}
