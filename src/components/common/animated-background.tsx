import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type AnimatedBackgroundProps = {
  /**
   * - `dots` — faint grid
   * - `glow` — soft teal/warm washes
   * - `mesh` — animated multi-orb mesh (hero / CTA)
   * - `grid` — engineering grid
   */
  variant?: "dots" | "glow" | "mesh" | "grid";
  className?: string;
} & Omit<ComponentProps<"div">, "children">;

/**
 * Decorative atmosphere — CSS only, respects reduced motion via global policy.
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
        <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-50" />
      ) : null}

      {variant === "grid" ? (
        <div
          className="absolute inset-0 mask-fade-out opacity-45"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-line) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      ) : null}

      {variant === "glow" || variant === "mesh" ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  ellipse 85% 65% at 0% 0%,
                  color-mix(in oklch, var(--color-brand-300) 55%, transparent),
                  transparent 55%
                ),
                radial-gradient(
                  ellipse 70% 55% at 100% 100%,
                  color-mix(in oklch, var(--color-sky-400) 35%, transparent),
                  transparent 50%
                ),
                linear-gradient(
                  165deg,
                  var(--color-surface-tint),
                  var(--color-surface) 50%,
                  color-mix(in oklch, var(--color-brand-50) 60%, var(--color-surface))
                )
              `,
            }}
          />
          <div
            className={cn(
              "absolute top-[-20%] left-[-8%] size-[min(62vw,34rem)] rounded-full opacity-50 blur-3xl",
              variant === "mesh" ? "animate-mesh" : "animate-drift",
            )}
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--color-brand-400) 50%, transparent), transparent 70%)",
            }}
          />
          <div
            className={cn(
              "absolute right-[-14%] bottom-[-24%] size-[min(54vw,28rem)] rounded-full opacity-35 blur-3xl [animation-delay:-7s]",
              variant === "mesh" ? "animate-mesh" : "animate-drift",
            )}
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--color-warm-400) 45%, transparent), transparent 72%)",
            }}
          />
          {variant === "mesh" ? (
            <div
              className="absolute top-[28%] left-[42%] size-[min(38vw,18rem)] animate-float rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklch, var(--color-sky-400) 50%, transparent), transparent 70%)",
              }}
            />
          ) : null}
          <div className="absolute inset-0 bg-dot-grid mask-fade-out opacity-20" />
          <div className="absolute inset-0 bg-grain opacity-[0.035] mix-blend-overlay dark:opacity-[0.06]" />
        </>
      ) : null}
    </div>
  );
}

/** Fixed film-grain overlay for the whole marketing shell. */
export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-slot="grain-overlay"
      className={cn(
        "pointer-events-none fixed inset-0 z-(--z-raised) bg-grain opacity-[0.045] mix-blend-overlay dark:opacity-[0.08]",
        className,
      )}
    />
  );
}
