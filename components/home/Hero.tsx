"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Locale, Person } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { ease } from "@/lib/motion";
import Image from "next/image";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Txt } from "@/components/ui/Txt";
import { Arrow } from "@/components/ui/Arrow";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
  person: Person;
  cvHref: string;
}

/** Cinematic opening: a large B&W portrait with the name rising letter by letter over it. */
export function Hero({ locale, dict, person, cvHref }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "8%"]);

  const [first, ...rest] = person.brandName.toUpperCase().split(" ");
  const last = rest.join(" ");
  const year = new Date().getFullYear();
  const nameClass = "display-tight text-[clamp(2.6rem,min(17vw,28svh),17rem)] uppercase";
  const nameLines = ["", "pl-[6vw] wide:pl-[12vw]"];
  // Front layer: MARCOS hidden (it stays behind the head), RENILLA solid in front of the body.
  const frontLines = ["text-transparent", "pl-[6vw] wide:pl-[12vw] text-charcoal"];

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: ease.expo, delay },
  });

  return (
    <section
      ref={ref}
      data-surface="light"
      className="px-gutter relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ivory pb-8 pt-24 md:pb-10 md:pt-28 [@media(max-height:500px)]:pb-5 [@media(max-height:500px)]:pt-20"
    >
      {/* Meta row */}
      <motion.div {...appear(0.9)} className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-12">
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

      {/* Baseline: the cut-out is cropped exactly on this hairline, so it stands on the page instead of floating */}
      <div aria-hidden className="px-gutter pointer-events-none absolute inset-x-0 bottom-0 z-[2]">
        <div className="h-px w-full bg-charcoal/25" />
      </div>
      {/* Shared film grain over page and photo */}
      <div aria-hidden className="grain pointer-events-none absolute inset-0 z-[3] opacity-40" />

      {/* Portrait: B&W cut-out (matted edges, toned to the palette) anchored to the hero baseline */}
      {person.portrait && (
        <motion.div
          aria-hidden={false}
          className="pointer-events-none absolute bottom-0 left-1/2 z-[1] h-[56%] -translate-x-1/2 [@media(orientation:portrait)_and_(max-height:700px)]:h-[50%] sm:h-[60%] wide:bottom-0 wide:left-[50vw] wide:h-[calc(100%-10rem)] wide:translate-x-0 [@media(orientation:landscape)_and_(max-height:500px)]:h-[68%] [@media(orientation:landscape)_and_(max-height:500px)]:left-[42vw]"
          style={{ y: portraitY, aspectRatio: `${person.portrait.width} / ${person.portrait.height}` }}
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={reduce ? { duration: 0 } : { duration: 1.6, ease: ease.quart, delay: 0.25 }}
        >
          <Image
            src={person.portrait.src}
            alt={person.portrait.alt[locale]}
            fill
            priority
            sizes="(min-width: 768px) 60vw, 100vw"
            className={person.portrait.cutout ? "object-contain object-bottom" : "object-cover"}
          />
        </motion.div>
      )}

      {/* Name in depth: "MARCOS" behind the head, "RENILLA" in front of the body — magazine-cover layering */}
      <div className="relative mb-auto mt-8 wide:my-0">
        <motion.div style={{ y: nameY, opacity: fade }} className="relative z-0">
          <SplitReveal
            as="h1"
            by="chars"
            immediate
            delay={0.15}
            stagger={0.045}
            lines={[first, last]}
            className={nameClass}
            lineClassNames={nameLines}
          />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ y: nameY, opacity: fade }}
          className="pointer-events-none absolute inset-0 z-[2]"
        >
          <SplitReveal
            as="div"
            by="chars"
            immediate
            delay={0.15}
            stagger={0.045}
            lines={[first, last]}
            className={nameClass}
            lineClassNames={frontLines}
          />
        </motion.div>
      </div>

      {/* Bottom row */}
      <motion.div {...appear(1.1)} className="relative z-10 mt-10 grid grid-cols-12 items-end gap-6 md:mt-12">
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
