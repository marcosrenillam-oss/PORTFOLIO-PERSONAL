import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // The site is fully bilingual under /es and /en. Spanish is the default locale.
    return [{ source: "/", destination: "/es", permanent: false }];
  },
};

export default nextConfig;
