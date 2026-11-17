"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ImageAsset, Locale } from "@/content/types";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

interface EditorialImageProps {
  image: ImageAsset | null;
  locale: Locale;
  /** CSS aspect-ratio, e.g. "4 / 5". */
  aspect?: string;
  /** Text shown inside the placeholder frame when there is no image. */
  placeholder?: string;
  /** Small figure label in the placeholder, e.g. "Fig. 01". */
  figure?: string;
  tone?: "light" | "dark";
  /** Reveal with a mask the first time it enters the viewport. */
  reveal?: boolean;
  /** Very subtle vertical parallax on the inner image. */
  parallax?: boolean;
  /** Zoom slightly on hover of the nearest `.group`. */
  hoverZoom?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  showCaption?: boolean;
}

/**
 * Every photograph on the site goes through this component.
 * When no image exists yet it renders a cinematic placeholder frame instead of a stock photo.
 */
export function EditorialImage({
  image,
  locale,
  aspect = "4 / 5",
  placeholder = "[ADD PROJECT IMAGE]",
  figure,
  tone = "light",
  reveal = true,
  parallax = false,
  hoverZoom = false,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  showCaption = false,
}: EditorialImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const useParallax = parallax && !reduce;

  const inner = image ? (
    image.cutout ? (
      <div className="absolute inset-0 overflow-hidden bg-stone">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(90% 70% at 50% 35%, #f6f4ef 0%, #e4e1da 55%, #d4d0c7 100%)" }}
        />
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain object-bottom pt-[6%]"
        />
      </div>
    ) : (
    <Image
      src={image.src}
      alt={image.alt[locale]}
      fill
      sizes={sizes}
      priority={priority}
      className={cn(
        image.cutout ? "object-contain object-bottom" : "object-cover",
        hoverZoom && "transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.04]",
      )}
    />
    )
  ) : (
    <PlaceholderArt tone={tone} label={placeholder} figure={figure} hoverZoom={hoverZoom} />
  );

  // Variants must be identical on server and client; reduced motion only zeroes the durations.
  const animated = reveal;

  // The in-view trigger sits on the <figure>: an element clipped to nothing is never
  // reported as visible by IntersectionObserver, so the mask itself can't be the trigger.
  return (
    <motion.figure
      className={cn("relative", className)}
      initial={animated ? "hidden" : false}
      whileInView={animated ? "shown" : undefined}
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: aspect }}
        variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, shown: { clipPath: "inset(0% 0% 0% 0%)" } }}
        transition={reduce ? { duration: 0 } : { duration: 1.4, ease: ease.quart }}
      >
        <motion.div
          className={cn("absolute inset-x-0", parallax ? "-top-[6%] h-[112%]" : "inset-y-0")}
          style={useParallax ? { y } : undefined}
          variants={{ hidden: { scale: 1.18 }, shown: { scale: 1 } }}
          transition={reduce ? { duration: 0 } : { duration: 1.8, ease: ease.expo }}
        >
          {inner}
        </motion.div>
      </motion.div>
      {showCaption && image?.caption && (
        <figcaption className="mt-3 font-serif text-[0.95rem] italic opacity-70">{image.caption[locale]}</figcaption>
      )}
    </motion.figure>
  );
}

function PlaceholderArt({
  tone,
  label,
  figure,
  hoverZoom,
}: {
  tone: "light" | "dark";
  label: string;
  figure?: string;
  hoverZoom: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "grain absolute inset-0 overflow-hidden",
        dark ? "bg-graphite text-ivory/70" : "bg-stone text-charcoal/60",
      )}
    >
      {/* Soft cinematic light */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          hoverZoom && "transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.06]",
        )}
        style={{
          background: dark
            ? "radial-gradient(120% 80% at 75% 20%, #3a3d42 0%, #232323 45%, #171717 100%)"
            : "radial-gradient(120% 90% at 70% 15%, #fbfaf7 0%, #e6e3dc 40%, #cfcbc2 100%)",
        }}
      />
      {/* Horizon line, like an empty set */}
      <div aria-hidden className={cn("absolute inset-x-0 top-[62%] h-px", dark ? "bg-ivory/10" : "bg-charcoal/10")} />
      {/* Corner crop marks */}
      {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "left-4 bottom-4 border-l border-b", "right-4 bottom-4 border-r border-b"].map(
        (pos) => (
          <span key={pos} aria-hidden className={cn("absolute h-3 w-3", pos, dark ? "border-ivory/40" : "border-charcoal/35")} />
        ),
      )}
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <span className="label text-steel">{label}</span>
      </div>
      {figure && <span className="label absolute bottom-6 left-6 opacity-60">{figure}</span>}
    </div>
  );
}
