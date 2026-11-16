import Link from "next/link";
import { cn } from "@/lib/cn";
import { Arrow } from "./Arrow";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  tone?: "light" | "dark";
  icon?: "right" | "up-right" | "down";
  download?: boolean;
  external?: boolean;
  className?: string;
}

/**
 * Pill button with a sliding fill on hover. `tone` = the surface it sits on.
 */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  tone = "light",
  icon = "right",
  download,
  external,
  className,
}: ButtonLinkProps) {
  const onLight = tone === "light";
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 ease-[var(--ease-expo)]";
  const styles = {
    solid: onLight ? "bg-charcoal text-ivory hover:text-charcoal" : "bg-ivory text-charcoal hover:text-ivory",
    outline: onLight
      ? "border border-charcoal/25 text-charcoal hover:text-ivory"
      : "border border-ivory/25 text-ivory hover:text-charcoal",
    ghost: onLight ? "text-charcoal" : "text-ivory",
  }[variant];
  const fill = {
    solid: onLight ? "bg-steel" : "bg-steel",
    outline: onLight ? "bg-charcoal" : "bg-ivory",
    ghost: "bg-transparent",
  }[variant];

  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0",
          fill,
        )}
      />
      <span className="relative">{children}</span>
      <span className="relative inline-flex h-4 w-4 overflow-hidden">
        <Arrow
          direction={icon}
          className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-full"
        />
        <Arrow
          direction={icon}
          className="absolute inset-0 h-4 w-4 -translate-x-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0"
        />
      </span>
    </>
  );

  if (download || external || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        className={cn(base, styles, className)}
        {...(download ? { download: "" } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, styles, className)}>
      {content}
    </Link>
  );
}
