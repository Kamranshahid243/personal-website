import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

/**
 * Typography primitives.
 *
 * The single largest source of duplicated styling in any site is text: the
 * same `text-4xl font-semibold tracking-tight` drifting into a dozen files,
 * each version slightly different. These components exist so a page states
 * *what* a piece of text is, never how it looks.
 *
 * Semantic level and visual size are separate props throughout. Heading order
 * is an accessibility requirement — a screen reader user navigates by it — and
 * it must never be bent to make something look right. `<Heading as="h2"
 * size="sm">` keeps the document outline correct while letting the design do
 * what it wants.
 */

/* -------------------------------------------------------------------------- */

const displayVariants = cva("font-heading text-balance", {
  variants: {
    size: {
      xl: "text-display-xl",
      lg: "text-display-lg",
      md: "text-display-md",
      sm: "text-display-sm",
    },
    tone: {
      default: "text-text",
      muted: "text-text-muted",
      gradient: "text-gradient",
    },
  },
  defaultVariants: { size: "lg", tone: "default" },
});

type DisplayProps = ComponentProps<"h1"> &
  VariantProps<typeof displayVariants> & {
    as?: ElementType;
  };

/**
 * Page-level headlines: the hero, and the opening line of a major section.
 * Rare by design — more than one or two per page and none of them lead.
 */
export function Display({
  className,
  size,
  tone,
  as: Component = "h1",
  ...props
}: DisplayProps) {
  return (
    <Component
      className={cn(displayVariants({ size, tone }), className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */

const headingVariants = cva("font-heading text-balance", {
  variants: {
    size: {
      lg: "text-heading-lg",
      md: "text-heading-md",
      sm: "text-heading-sm",
    },
    tone: {
      default: "text-text",
      muted: "text-text-muted",
    },
  },
  defaultVariants: { size: "md", tone: "default" },
});

type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    /** Set the semantic level independently of the visual size. */
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

/** Subsection headings and card titles. */
export function Heading({
  className,
  size,
  tone,
  as: Component = "h2",
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ size, tone }), className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */

const textVariants = cva("", {
  variants: {
    size: {
      lg: "text-body-lg",
      md: "text-body-md",
      sm: "text-body-sm",
      caption: "text-caption",
    },
    tone: {
      default: "text-text",
      muted: "text-text-muted",
      subtle: "text-text-subtle",
      brand: "text-brand-600 dark:text-brand-400",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    /** Caps the line length at the readable measure. */
    measure: {
      true: "max-w-prose",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
    weight: "normal",
    measure: false,
  },
});

type TextProps = ComponentProps<"p"> &
  VariantProps<typeof textVariants> & {
    as?: ElementType;
  };

/** Body copy. The default for any run of prose outside an MDX article. */
export function Text({
  className,
  size,
  tone,
  weight,
  measure,
  as: Component = "p",
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ size, tone, weight, measure }), className)}
      {...props}
    />
  );
}

/**
 * The standfirst under a headline. Larger and lighter than body copy, and
 * measure-capped by default — this paragraph is the one a visitor actually
 * reads before deciding whether to keep going.
 */
export function Lead({ className, ...props }: ComponentProps<"p">) {
  return (
    <Text
      size="lg"
      tone="muted"
      measure
      className={cn("text-pretty", className)}
      {...props}
    />
  );
}

/**
 * Subheading under a section heading.
 *
 * Alias of `<Lead>` with a clearer name for page composition. Prefer this in
 * section intros; prefer `<Lead>` under a page-level `<Display>`.
 */
export function Subheading({ className, ...props }: ComponentProps<"p">) {
  return <Lead className={className} {...props} />;
}

/* -------------------------------------------------------------------------- */

/**
 * The small uppercase label above a section heading.
 *
 * Rendered as a `<p>` rather than a heading: it is a visual lead-in, and
 * putting it in the document outline would fragment the heading structure.
 */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-eyebrow text-text-muted uppercase",
        className,
      )}
      {...props}
    />
  );
}
