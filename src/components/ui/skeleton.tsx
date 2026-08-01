import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Loading placeholder.
 *
 * Shaped like the content it stands in for, so the page does not reflow when
 * the real thing arrives. A skeleton that is the wrong size is worse than no
 * skeleton — it promises a layout and then breaks it.
 *
 * The sweep animation is the shared `skeleton-sweep` utility, so every
 * placeholder on the site shimmers in step. It stops entirely under
 * `prefers-reduced-motion`, leaving a static block that still communicates
 * "content is coming".
 */
const skeletonVariants = cva("skeleton-sweep", {
  variants: {
    shape: {
      block: "rounded-lg",
      text: "h-[1em] rounded-sm",
      circle: "rounded-full",
      pill: "rounded-(--radius-pill)",
    },
  },
  defaultVariants: { shape: "block" },
});

type SkeletonProps = ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>;

function Skeleton({ className, shape, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(skeletonVariants({ shape }), className)}
      {...props}
    />
  );
}

/**
 * A paragraph-shaped run of skeleton lines, with the last one short so it
 * reads as text rather than a stack of bars.
 */
function SkeletonText({
  lines = 3,
  className,
  ...props
}: ComponentProps<"div"> & { lines?: number }) {
  return (
    <div
      data-slot="skeleton-text"
      className={cn("flex flex-col gap-2.5", className)}
      {...props}
    >
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          shape="text"
          className={index === lines - 1 ? "w-3/5" : "w-full"}
        />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonText, skeletonVariants };
