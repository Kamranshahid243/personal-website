import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Button.
 *
 * Sizing is expressed purely as token assignments: a size variant sets
 * `--btn-h`, `--btn-px`, `--btn-gap` and `--btn-text`, and the base class
 * consumes them. Nothing here hard-codes a height, which is why a button and
 * a text input of the same size line up to the pixel — both read
 * `--control-h-md` — and why they cannot drift apart in a later edit.
 *
 * Variants are semantic rather than visual. `primary` means "the one action we
 * want taken on this screen", not "the black one", so there should only ever
 * be one on a page.
 *
 * Derived from the shadcn/ui button: structure and behaviour are upstream, the
 * variant table is ours and is bound to the design tokens.
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "h-(--btn-h) gap-(--btn-gap) px-(--btn-px) text-(length:--btn-text)",
    "rounded-(--btn-radius) border border-transparent",
    "font-medium whitespace-nowrap select-none",
    "focus-ring transition-ui",
    // Presses in by a pixel. Small enough to feel physical, not cartoonish.
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    // Icons inherit the control's icon size rather than setting their own.
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--btn-icon)",
    // While a request is in flight the label stays put and the control dims,
    // so the button never changes width mid-submit.
    "aria-busy:pointer-events-none aria-busy:opacity-(--loading-opacity)",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-subtle hover:bg-primary/85",
        secondary:
          "border-line-strong bg-surface text-text shadow-subtle hover:bg-surface-sunken",
        ghost: "text-text-muted hover:bg-surface-sunken hover:text-text",
        subtle: "bg-surface-sunken text-text hover:bg-line",
        danger: "bg-danger-surface text-danger hover:bg-danger-line",
        /** A button that has to look like a link — form cancels, mostly. */
        link: "h-auto px-0 text-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "[--btn-gap:var(--control-gap-sm)] [--btn-h:var(--control-h-sm)] [--btn-icon:var(--icon-xs)] [--btn-px:var(--control-px-sm)] [--btn-radius:var(--control-radius)] [--btn-text:var(--control-text-sm)]",
        md: "[--btn-gap:var(--control-gap-md)] [--btn-h:var(--control-h-md)] [--btn-icon:var(--icon-sm)] [--btn-px:var(--control-px-md)] [--btn-radius:var(--control-radius)] [--btn-text:var(--control-text-md)]",
        lg: "[--btn-gap:var(--control-gap-lg)] [--btn-h:var(--control-h-lg)] [--btn-icon:var(--icon-sm)] [--btn-px:var(--control-px-lg)] [--btn-radius:var(--control-radius-lg)] [--btn-text:var(--control-text-lg)]",
        xl: "[--btn-gap:var(--control-gap-lg)] [--btn-h:var(--control-h-xl)] [--btn-icon:var(--icon-md)] [--btn-px:var(--control-px-xl)] [--btn-radius:var(--control-radius-lg)] [--btn-text:var(--control-text-xl)]",
        /** Square. Always needs an aria-label. */
        icon: "w-(--btn-h) [--btn-h:var(--control-h-md)] [--btn-icon:var(--icon-sm)] [--btn-px:0] [--btn-radius:var(--control-radius)]",
        "icon-sm":
          "w-(--btn-h) [--btn-h:var(--control-h-sm)] [--btn-icon:var(--icon-xs)] [--btn-px:0] [--btn-radius:var(--control-radius)]",
        "icon-lg":
          "w-(--btn-h) [--btn-h:var(--control-h-lg)] [--btn-icon:var(--icon-md)] [--btn-px:0] [--btn-radius:var(--control-radius-lg)]",
      },
      /** Full width below the `sm` breakpoint; the right default on mobile. */
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "md",
  block,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
