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
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
        // Faint grid, echoing the site's dot-grid backdrop.
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
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 60 ? 60 : 76,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#a1a1a1" }}>
        {siteConfig.url.replace(/^https?:\/\//, "")}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
