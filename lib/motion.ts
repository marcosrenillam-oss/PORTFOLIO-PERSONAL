/** Shared motion tokens — keep movement consistent across the site. */
export const ease = {
  expo: [0.16, 1, 0.3, 1] as const,
  quart: [0.76, 0, 0.24, 1] as const,
  out: [0.33, 1, 0.68, 1] as const,
};

export const duration = {
  fast: 0.35,
  base: 0.8,
  slow: 1.2,
};
