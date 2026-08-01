import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type AnimatedBackgroundProps = {
  /**
   * Visual treatment.
   * - `dots` — faint grid, the default for heroes
   * - `glow` — soft brand wash behind content
   * - `grid` — larger engineering-style grid
   */
  variant?: "dots" | "glow" | "grid";
  className?: string;
} & Omit<ComponentProps<"div">, "children">;

/**
 * Decorative atmosphere behind a section.
 *
 * CSS only. The slow drift on `glow` is a single transform animation that
 * stops under prefers-reduced-motion (handled globally in base.css). No
 * canvas, no WebGL, no mouse-tracking — those cost more than they return on a
 * marketing site, and they fight the "fast" requirement.
 *
 * Positioned absolute and pointer-events-none so it never intercepts clicks
 * or affect layout. The parent must be `relative` (or another positioning
 * context) and typically `overflow-hidden`.
 */
export function AnimatedBackground({
  variant = "dots",
  className,
  ...props
}: AnimatedBackgroundProps) {
  return (
    <div
      aria-hidden
      data-slot="animated-background"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
      {...props}
    >
      {variant === "dots" ? (
        <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-60" />
      ) : null}

      {variant === "grid" ? (
        <div
          className="absolute inset-0 mask-fade-out opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-line) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      ) : null}

      {variant === "glow" ? (
        <>
          <div
            className="absolute top-[-20%] left-1/2 size-[min(80vw,40rem)] -translate-x-1/2 animate-pulse-subtle rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--color-brand-400) 35%, transparent), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-40" />
        </>
      ) : null}
    </div>
  );
}
