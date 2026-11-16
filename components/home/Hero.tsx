"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Locale, Person } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { ease } from "@/lib/motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Txt } from "@/components/ui/Txt";
import { Arrow } from "@/components/ui/Arrow";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
  person: Person;
  cvHref: string;
}

/** Cinematic opening: the name in very large type, rising letter by letter, with an editorial portrait frame. */
export function Hero({ locale, dict, person, cvHref }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  const [first, ...rest] = person.brandName.toUpperCase().split(" ");
  const last = rest.join(" ");
  const year = new Date().getFullYear();

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: ease.expo, delay },
  });

  return (
    <section
      ref={ref}
      data-surface="light"
      className="px-gutter relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-24 md:pb-10 md:pt-28"
    >
      {/* Meta row */}
      <motion.div {...appear(0.9)} className="grid grid-cols-2 gap-6 md:grid-cols-12">
        <p className="label md:col-span-3">
          {dict.home.heroEyebrow} <span className="opacity-50">© {year}</span>
        </p>
        <p className="label hidden opacity-70 md:col-span-3 md:block">
          <Txt>{person.location[locale]}</Txt>
        </p>
        <p className="col-span-1 text-right font-serif text-lg italic leading-snug md:col-span-4 md:col-start-9 md:text-left md:text-xl">
          <Txt>{person.positioning[locale]}</Txt>
        </p>
      </motion.div>

      {/* Name + portrait */}
      <motion.div style={{ y: nameY, opacity: fade }} className="relative mt-10 md:mt-0">
        <SplitReveal
          as="h1"
          by="chars"
          immediate
          delay={0.15}
          stagger={0.045}
          lines={[first, last]}
          className="display-tight relative z-10 text-[clamp(3.9rem,15.6vw,15.5rem)] uppercase"
          lineClassNames={["", "pl-[9vw] md:pl-[10vw]"]}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative ml-auto mt-8 w-[58%] sm:w-[42%] md:absolute md:bottom-[0.4em] md:right-0 md:mt-0 md:w-[min(21vw,330px)]"
        >
          <EditorialImage
            image={person.portrait}
            locale={locale}
            aspect="4 / 5"
            placeholder="[ADD PROFILE PHOTO]"
            figure="Fig. 00"
            priority
            sizes="(min-width: 768px) 24vw, 60vw"
          />
        </motion.div>
      </motion.div>

      {/* Bottom row */}
      <motion.div {...appear(1.1)} className="mt-10 grid grid-cols-12 items-end gap-6 md:mt-12">
        <p className="col-span-12 max-w-md text-base leading-relaxed text-ink-2 md:col-span-5 md:text-[1.0625rem]">
          <Txt>{person.availability[locale]}</Txt>
        </p>
        <a
          href="#intro"
          className="label col-span-6 flex items-center gap-3 md:col-span-3 md:col-start-7"
          aria-label={dict.actions.scroll}
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-charcoal/20">
            <motion.span
              animate={reduce ? undefined : { y: ["-120%", "0%", "120%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
            >
              <Arrow direction="down" className="h-3.5 w-3.5" />
            </motion.span>
          </span>
          {dict.actions.scroll}
        </a>
        <a href={cvHref} download className="label link-underline col-span-6 justify-self-end md:col-span-3 md:col-start-10">
          {dict.actions.downloadCv} ↓
        </a>
      </motion.div>
    </section>
  );
}
