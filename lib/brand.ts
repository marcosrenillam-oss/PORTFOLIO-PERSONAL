/**
 * Brand tokens shared by the PDF generators. The website uses the same values
 * in styles/globals.css (@theme). If you change a colour, change it in both places.
 */
export const brand = {
  ivory: "#F3F0E9",
  charcoal: "#171717",
  stone: "#DCD9D2",
  steel: "#8795A3",
  white: "#FFFFFF",
  /** Slightly darker steel for small text on ivory (better contrast). */
  steelInk: "#5E6B78",
  /** Muted charcoal for secondary text. */
  ink2: "#4A4A47",
} as const;
