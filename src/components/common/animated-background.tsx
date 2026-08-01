import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type AnimatedBackgroundProps = {
  /**
   * Visual treatment.
   * - `dots` — faint grid, the default for heroes
   * - `glow` — soft brand wash behind content (premium SaaS atmosphere)
   * - `grid` — larger engineering-style grid
   */
  variant?: "dots" | "glow" | "grid";
  className?: string;
} & Omit<ComponentProps<"div">, "children">;

/**
 * Decorative atmosphere behind a section.
 *
 * CSS only. The slow drift on `glow` is a transform animation that stops under
 * prefers-reduced-motion (handled globally in base.css). No canvas, no WebGL,
 * no mouse-tracking — those cost more than they return on a marketing site.
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
            className="absolute top-[-25%] left-[-10%] size-[min(70vw,36rem)] animate-drift rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--color-brand-400) 40%, transparent), transparent 70%)",
            }}
          />
          <div
            className="absolute right-[-15%] bottom-[-30%] size-[min(65vw,32rem)] animate-drift rounded-full opacity-35 blur-3xl [animation-delay:-8s]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--color-brand-600) 32%, transparent), transparent 72%)",
            }}
          />
          <div
            className="absolute top-[35%] left-[40%] size-[min(40vw,18rem)] animate-pulse-subtle rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--color-brand-300) 30%, transparent), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-35" />
        </>
      ) : null}
    </div>
  );
}
