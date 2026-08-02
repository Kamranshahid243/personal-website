import type { NextConfig } from "next";

/**
 * Baseline security headers.
 *
 * A Content-Security-Policy is intentionally omitted here: it needs a nonce
 * that only middleware can generate per request, so it is added the moment the
 * first third-party script (analytics, embeds) lands in the project.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Generates `Route` union types so a typo in an <Link href> fails typecheck.
  typedRoutes: true,

  images: {
    formats: ["image/avif", "image/webp"],
    // Tuned for a marketing site: fewer candidates, long CDN cache.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Add remote hosts here rather than disabling optimisation.
    remotePatterns: [],
  },

  experimental: {
    // Barrel-heavy packages: import only the icons/exports actually used.
    optimizePackageImports: ["lucide-react", "radix-ui"],
  },

  async headers() {
    return [{ source: "/:path*", headers: [...securityHeaders] }];
  },
};

export default nextConfig;
