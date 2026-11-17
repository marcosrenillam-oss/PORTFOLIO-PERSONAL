import fs from "node:fs";
import path from "node:path";
import { Text, View, Image } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import type { ImageAsset } from "@/content/types";
import { brand } from "@/lib/brand";
import { isPlaceholder } from "@/lib/placeholder";

const SPLIT = /(\[ADD [A-Z0-9 &/-]+\])/g;

/** Text that renders "[ADD …]" placeholders in steel so pending content is obvious in the PDF too. */
export function PText({ children, style }: { children: string; style?: Style | Style[] }) {
  if (!isPlaceholder(children)) return <Text style={style}>{children}</Text>;
  return (
    <Text style={style}>
      {children.split(SPLIT).map((part, i) =>
        isPlaceholder(part) ? (
          <Text key={i} style={{ color: brand.steel }}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
}

/** Absolute path of an image inside /public, or null if it doesn't exist / isn't PDF-compatible. */
export function resolveImage(image: ImageAsset | null): string | null {
  if (!image) return null;
  const file = path.join(process.cwd(), "public", image.src.replace(/^\//, ""));
  if (!fs.existsSync(file)) {
    console.warn(`  ⚠ image not found for PDF: ${image.src}`);
    return null;
  }
  if (!/\.(jpe?g|png)$/i.test(file)) {
    console.warn(`  ⚠ PDFs only embed JPG/PNG, skipping: ${image.src}`);
    return null;
  }
  return file;
}

/** Editorial image box: the photo, or a placeholder frame with crop marks and a label. */
export function PdfImage({
  image,
  label,
  style,
  tone = "light",
}: {
  image: ImageAsset | null;
  label: string;
  style?: Style;
  tone?: "light" | "dark";
}) {
  const file = resolveImage(image);
  if (file && image?.cutout) {
    return (
      <View style={[{ overflow: "hidden", justifyContent: "flex-end", alignItems: "center" }, style ?? {}]}>
        <Image src={file} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "50% 100%" }} />
      </View>
    );
  }
  if (file) {
    return (
      <View style={[{ overflow: "hidden" }, style ?? {}]}>
        <Image src={file} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </View>
    );
  }
  const dark = tone === "dark";
  const mark = dark ? "rgba(243,240,233,0.35)" : "rgba(23,23,23,0.3)";
  const corner = (pos: Style): Style => ({ position: "absolute", width: 9, height: 9, borderColor: mark, ...pos });
  return (
    <View
      style={[
        { backgroundColor: dark ? "#232323" : brand.stone, justifyContent: "center", alignItems: "center", position: "relative" },
        style ?? {},
      ]}
    >
      <View style={{ position: "absolute", left: 0, right: 0, top: "62%", height: 0.5, backgroundColor: mark }} />
      <View style={corner({ left: 10, top: 10, borderLeftWidth: 0.75, borderTopWidth: 0.75 })} />
      <View style={corner({ right: 10, top: 10, borderRightWidth: 0.75, borderTopWidth: 0.75 })} />
      <View style={corner({ left: 10, bottom: 10, borderLeftWidth: 0.75, borderBottomWidth: 0.75 })} />
      <View style={corner({ right: 10, bottom: 10, borderRightWidth: 0.75, borderBottomWidth: 0.75 })} />
      <Text style={{ fontFamily: "Inter", fontSize: 7, fontWeight: 500, letterSpacing: 1.2, color: brand.steel }}>{label}</Text>
    </View>
  );
}
