"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import type { Dictionary } from "@/lib/i18n";
import { navItems, routes } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { LanguageSwitch } from "./LanguageSwitch";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
  brandName: string;
  cvHref: string;
}

/**
 * Minimal fixed header.
 * - Hides when scrolling down, returns when scrolling up.
 * - Adapts its colour to the surface underneath (sections marked data-surface="dark").
 * - Full-screen animated menu on mobile.
 */
export function Header({ locale, dict, brandName, cvHref }: HeaderProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 24);
    setHidden(!open && current > 160 && current > previous + 2);
    if (current < previous - 2) setHidden(false);
  });

  // Detect which surface sits under the header.
  useEffect(() => {
    let frame = 0;
    const detect = () => {
      frame = 0;
      const probeY = 36;
      const surfaces = document.querySelectorAll<HTMLElement>("[data-surface]");
      let isDark = false;
      surfaces.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) isDark = el.dataset.surface === "dark";
      });
      setDark(isDark);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(detect);
    };
    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Close the menu on navigation; lock scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onDark = dark || open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          onDark ? "text-ivory" : "text-charcoal",
        )}
        animate={{ y: hidden && !reduce ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: ease.expo }}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 transition-opacity duration-500",
            scrolled && !open ? "opacity-100" : "opacity-0",
            onDark ? "bg-charcoal/80" : "bg-ivory/80",
            "backdrop-blur-md",
          )}
        />
        <div className="px-gutter flex h-16 items-center justify-between gap-6 md:h-20">
          <Link href={routes.home(locale)} className="group relative z-10 flex items-center gap-2" aria-label={brandName}>
            <span className="font-display text-[0.95rem] font-semibold uppercase tracking-[-0.01em]">{brandName}</span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-steel transition-transform duration-500 group-hover:scale-150" />
          </Link>

          <nav aria-label={dict.nav.mainNavigation} className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => {
                const href = routes[item](locale);
                return (
                  <li key={item}>
                    <Link
                      href={href}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={cn(
                        "link-underline pb-0.5 text-[0.8125rem] font-medium",
                        isActive(href) ? "opacity-100" : "opacity-70 hover:opacity-100",
                      )}
                    >
                      {dict.nav[item]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-5">
            <LanguageSwitch locale={locale} label={dict.nav.switchTo} />
            <a
              href={cvHref}
              download
              className="hidden rounded-full border border-current/25 px-4 py-2 text-[0.8125rem] font-medium transition-colors hover:bg-current/10 md:inline-flex"
            >
              {dict.actions.downloadCv}
            </a>
            <button
              type="button"
              className="label flex h-10 items-center gap-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span>{open ? dict.nav.close : dict.nav.menu}</span>
              <span aria-hidden className="relative block h-2.5 w-5">
                <span className={cn("absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-500", open && "-translate-y-[4px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-surface="dark"
            className="fixed inset-0 z-40 flex flex-col bg-charcoal text-ivory lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.6, ease: ease.quart, delay: 0.1 } }}
            transition={{ duration: 0.8, ease: ease.quart }}
          >
            <nav aria-label={dict.nav.mainNavigation} className="px-gutter flex flex-1 flex-col justify-center pt-20">
              <ul className="space-y-1">
                {(["home", ...navItems] as const).map((item, i) => {
                  const href = routes[item](locale);
                  return (
                    <li key={item} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "110%", transition: { duration: 0.35, ease: ease.quart } }}
                        transition={{ duration: 0.8, ease: ease.expo, delay: 0.15 + i * 0.05 }}
                      >
                        <Link
                          href={href}
                          aria-current={pathname === href ? "page" : undefined}
                          className="flex items-baseline gap-4 py-1 font-display text-[clamp(2.4rem,11vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em]"
                        >
                          <span className="label tabular-nums text-steel">{String(i).padStart(2, "0")}</span>
                          {dict.nav[item]}
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <motion.div
              className="px-gutter flex items-center justify-between border-t border-ivory/10 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <a href={cvHref} download className="label">
                {dict.actions.downloadCv} ↓
              </a>
              <LanguageSwitch locale={locale} label={dict.nav.switchTo} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
