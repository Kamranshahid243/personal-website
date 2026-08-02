import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Card.
 *
 * Padding is a single `--card-padding` token consumed by every slot, so the
 * header, body and footer share one inset and a card can be made roomier
 * everywhere by changing one value. It is fluid: a card that is comfortable on
 * a phone looks starved at 1440px.
 *
 * The default is a hairline on a raised surface rather than a shadow. Borders
 * are what the reference sites use for resting state; shadow is reserved for
 * things that genuinely float, and for hover.
 *
 * `interactive` makes the whole card a hover target. Pair it with the
 * `link-overlay` utility on the title's link so the entire surface is
 * clickable while the accessibility tree still sees one properly-labelled
 * link — not a card-shaped div with an onClick.
 */
const cardVariants = cva(
  [
    "group/card relative flex flex-col gap-(--card-gap)",
    "rounded-(--card-radius) border border-(--card-border) bg-(--card-bg)",
    "text-text",
  ],
  {
    variants: {
      variant: {
        default: "",
        raised: "border-transparent shadow-raised",
        /** No fill. For grids where the page background should show through. */
        ghost: "border-transparent bg-transparent",
      },
      padding: {
        none: "[--card-padding:0px]",
        default: "",
        lg: "[--card-padding:var(--card-padding-lg)]",
      },
      interactive: {
        true: "hover-lift transition-ui-base focus-within:border-line-strong hover:border-line-strong hover:shadow-raised",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      interactive: false,
    },
  },
);

function Card({
  className,
  variant,
  padding,
  interactive,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant, padding, interactive }),
        // Vertical inset lives on the card; horizontal inset lives on each
        // slot, so a full-bleed image or a divided footer can opt out.
        "py-(--card-padding)",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-(--spacing-stack-xs) px-(--card-padding)",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  as: Comp = "h3",
  ...props
}: React.ComponentProps<"h3"> & { as?: "h2" | "h3" | "p" | "div" }) {
  return (
    <Comp
      data-slot="card-title"
      className={cn("font-heading text-heading-sm text-balance", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-body-sm text-pretty text-text-muted", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-padding)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-auto flex items-center gap-(--spacing-stack-sm) px-(--card-padding) pt-(--card-gap)",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
