import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#eef7f6",
          color: "#142422",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 0% 0%, #7ec8c488, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, #f0b27a55, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#0f6e72",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 4,
              background: "#0f6e72",
            }}
          />
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
        <div style={{ display: "flex", fontSize: 26, color: "#4a6664" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
