import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt.
 *
 * Public marketing surfaces are crawlable. Internal design tooling and the
 * API surface are blocked; they are also `noIndex` at the page level.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/design", "/components"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
