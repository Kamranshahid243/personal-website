import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Web app manifest.
 *
 * Not about being installable — it is what makes an "Add to home screen"
 * bookmark, and the browser's own UI, show the right name and colours.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.role}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: siteConfig.locale.replace("_", "-"),
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
