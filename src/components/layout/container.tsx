import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/* Keys map to the `--container-*` tokens in tokens.css, which Tailwind turns
   into `max-w-*` utilities. */
const widths = {
  prose: "max-w-prose",
  content: "max-w-content",
  wide: "max-w-wide",
  full: "max-w-none",
} as const;

type ContainerProps = ComponentProps<"div"> & {
  width?: keyof typeof widths;
};

/**
 * Horizontal frame for page content.
 *
 * Every section is wrapped in one of these, which is what makes the left edge
 * of text line up perfectly from the header to the footer. Widths are named
 * after intent (`prose` for reading, `content` for standard sections, `wide`
 * for full-bleed grids) rather than pixel values, so the measure can be
 * re-tuned globally from `tokens.css`.
 */
export function Container({
  className,
  width = "content",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("container-page", widths[width], className)}
      {...props}
    />
  );
}
