import { ImageResponse } from "next/og";
import { z } from "zod";

import { siteConfig } from "@/config/site";

/**
 * On-demand Open Graph images.
 *
 * Rendered at the edge from JSX, which means every page and every article gets
 * a correctly branded share card without anyone opening a design tool. Link
 * previews are the first impression a lead gets in a DM or a Slack channel, so
 * this is conversion surface, not decoration.
 *
 * `?title=` is validated and clamped: the params are attacker-controlled, and
 * an unbounded string would blow out the layout.
 */

export const runtime = "edge";

const paramsSchema = z.object({
  title: z.string().trim().min(1).max(110).catch(siteConfig.tagline),
  eyebrow: z.string().trim().max(40).catch(siteConfig.role),
});

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { title, eyebrow } = paramsSchema.parse({
    title: searchParams.get("title") ?? undefined,
    eyebrow: searchParams.get("eyebrow") ?? undefined,
  });

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 80,
        backgroundColor: "#0d1f1e",
        color: "#f0faf9",
        // Faint teal dot grid, echoing the site's mesh backdrop.
        backgroundImage:
          "radial-gradient(circle at 1px 1px, #14b8a626 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Top accent bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            display: "flex",
            width: 32,
            height: 4,
            borderRadius: 4,
            backgroundColor: "#14b8a6",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#5eead4",
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </div>
      </div>

      {/* Main headline */}
      <div
        style={{
          display: "flex",
          fontSize: title.length > 60 ? 58 : 72,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#f0faf9",
          maxWidth: 900,
        }}
      >
        {title}
      </div>

      {/* Footer row: domain + name */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#99f6e4" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#5eead4",
            fontWeight: 600,
          }}
        >
          {siteConfig.name}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
