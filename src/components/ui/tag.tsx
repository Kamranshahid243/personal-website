import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Tag — taxonomy.
 *
 * Stack chips on a case study, topics on an article, filters on the writing
 * index. Often interactive, which is the whole reason it is a separate
 * component from `<Badge>`: a visitor should be able to tell what is clickable
 * without hovering it.
 *
 * `interactive` adds the hover, focus and press affordances. Render it with
 * `asChild` around a `<Link>` so the element is a real anchor.
 */
const tagVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center",
    "h-(--tag-h) gap-1.5 px-(--tag-px) text-(length:--tag-text)",
    "rounded-(--tag-radius) border font-medium whitespace-nowrap",
    "[&>svg]:size-3.5 [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "border-transparent bg-surface-sunken text-text-muted",
        outline: "border-line-strong bg-transparent text-text-muted",
        brand: "border-transparent bg-info-surface text-info",
      },
      interactive: {
        true: "cursor-pointer focus-ring transition-ui hover:text-text active:translate-y-px",
        false: "",
      },
      /** The active state of a filter chip. */
      selected: {
        true: "border-transparent bg-primary text-primary-foreground",
        false: "",
      },
    },
    compoundVariants: [
      {
        interactive: true,
        variant: "default",
        class: "hover:bg-line",
      },
      {
        interactive: true,
        variant: "outline",
        class: "hover:border-text-subtle hover:bg-surface-sunken",
      },
      // Selected tags keep their fill on hover; only the shade shifts.
      {
        interactive: true,
        selected: true,
        class: "hover:bg-primary/85 hover:text-primary-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      interactive: false,
      selected: false,
    },
  },
);

function Tag({
  className,
  variant,
  interactive,
  selected,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="tag"
      data-selected={selected || undefined}
      className={cn(tagVariants({ variant, interactive, selected }), className)}
      {...props}
    />
  );
}

export { Tag, tagVariants };
