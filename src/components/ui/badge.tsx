import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Badge — a state, not a label.
 *
 * "Available for work", "Shipped", "Draft". Never interactive, never a link.
 * For taxonomy — a stack chip, a filter, a tag on a post — use `<Tag>`
 * instead; the two look deliberately different so a visitor can tell at a
 * glance whether something is clickable.
 *
 * Each variant pairs a status text colour with its matching surface and
 * border from the colour tokens, so a badge can never end up with a colour
 * combination nobody checked for contrast.
 */
const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center",
    "h-(--badge-h) gap-1.5 px-(--badge-px) text-(length:--badge-text)",
    "rounded-(--badge-radius) border font-medium tracking-wide whitespace-nowrap uppercase",
    "[&>svg]:size-3 [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: "border-line bg-surface-sunken text-text-muted",
        brand: "border-info-line bg-info-surface text-info",
        success: "border-success-line bg-success-surface text-success",
        warning: "border-warning-line bg-warning-surface text-warning",
        danger: "border-danger-line bg-danger-surface text-danger",
        /** Highest contrast. For the one badge that must be noticed. */
        solid: "border-transparent bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

function Badge({
  className,
  variant = "neutral",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
