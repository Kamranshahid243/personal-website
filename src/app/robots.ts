import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt.
 *
 * Everything is crawlable except the API surface, which has nothing indexable
 * on it. The sitemap reference is what gets new articles discovered quickly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
