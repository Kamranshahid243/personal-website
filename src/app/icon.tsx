import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Generated favicon — initials on brand so install/share chrome works without
 * a hand-authored asset in `/public`.
 */
export default function Icon() {
  const initials = siteConfig.shortName.slice(0, 2).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#2563eb",
          color: "#ffffff",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        {initials}
      </div>
    ),
    size,
  );
}
