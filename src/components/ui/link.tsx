import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import type { Route } from "next";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Text link.
 *
 * Handles three things that get forgotten when links are written by hand: an
 * internal href gets client-side navigation, an external one gets
 * `rel="noopener noreferrer"` and a visible out-of-site indicator, and every
 * link gets the same focus ring.
 *
 * The underline is always present in body copy. Colour alone is not an
 * accessible affordance, and "underline on hover" only helps people who
 * already suspected there was a link there.
 */
const linkVariants = cva(
  "rounded-xs decoration-from-font underline-offset-[3px] focus-ring transition-ui",
  {
    variants: {
      variant: {
        /** In-paragraph. Underlined, with the rule fading up on hover. */
        default:
          "text-text underline decoration-line-strong hover:decoration-current",
        /** Navigation and footers, where a page of underlines is noise. */
        subtle: "text-text-muted no-underline hover:text-text",
        /** Standalone calls to action that are not important enough for a button. */
        cta: "group inline-flex items-center gap-1 font-medium text-text no-underline",
        brand:
          "text-brand-600 underline decoration-current/40 hover:decoration-current dark:text-brand-400",
      },
      size: {
        inherit: "",
        sm: "text-body-sm",
        md: "text-body-md",
      },
    },
    defaultVariants: { variant: "default", size: "inherit" },
  },
);

type LinkProps = Omit<ComponentProps<"a">, "href"> &
  VariantProps<typeof linkVariants> & {
    href: string;
    /**
     * Force the external treatment. Inferred from the protocol when omitted,
     * which is right for everything except an internal absolute URL.
     */
    external?: boolean;
    /** Appends an arrow that nudges on hover. Implied by `variant="cta"`. */
    showArrow?: boolean;
  };

export function Link({
  className,
  variant,
  size,
  href,
  external,
  showArrow,
  children,
  ...props
}: LinkProps) {
  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("mailto:"));
  const withArrow = showArrow ?? variant === "cta";

  const content = (
    <>
      {children}
      {withArrow ? (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-ui group-hover:translate-x-px group-hover:-translate-y-px"
        />
      ) : null}
    </>
  );

  const classes = cn(linkVariants({ variant, size }), className);

  if (isExternal) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <NextLink className={classes} href={href as Route} {...props}>
      {content}
    </NextLink>
  );
}

export { linkVariants };
