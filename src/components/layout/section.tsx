import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Vertical rhythm primitive.
 *
 * Page sections never set their own top and bottom padding; they use this,
 * which reads the `--spacing-section*` tokens. Consistent pacing between
 * sections is most of what separates a designed page from a stack of blocks,
 * and it is the first thing to drift when every section picks its own `py-`.
 *
 * The scale is fluid, so a page breathes more on a large display rather than
 * leaving one tall column of white down the middle.
 */
const sectionVariants = cva("", {
  variants: {
    spacing: {
      /** Adjacent related sections that should read as one group. */
      sm: "py-section-sm",
      default: "py-section",
      /** The hero, and anything that needs room to land. */
      lg: "py-section-lg",
      none: "",
    },
    surface: {
      none: "",
      sunken: "bg-surface-sunken",
      /** Hairline above, for a visual break without a colour change. */
      bordered: "border-t border-line",
    },
  },
  defaultVariants: { spacing: "default", surface: "none" },
});

type SectionProps = ComponentProps<"section"> &
  VariantProps<typeof sectionVariants>;

export function Section({
  className,
  spacing,
  surface,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ spacing, surface }), className)}
      {...props}
    />
  );
}

export { sectionVariants };
