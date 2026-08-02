import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default Open Graph image for routes that do not set a custom `image`.
 * Mirrors `/api/og` so share cards stay on-brand without a static PNG in public.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff26 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#a1a1a1",
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a1a1a1" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
