import { Fragment } from "react";
import { isPlaceholder } from "@/lib/placeholder";

const SPLIT = /(\[ADD [A-Z0-9 &/-]+\])/g;

/**
 * Renders content text. Placeholders ("[ADD …]") are highlighted so pending
 * information is obvious while the layout still looks finished.
 */
export function Txt({ children }: { children: string }) {
  if (!isPlaceholder(children)) return <>{children}</>;
  return (
    <>
      {children.split(SPLIT).map((part, i) =>
        isPlaceholder(part) ? (
          <span key={i} className="placeholder-text" data-placeholder="">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
