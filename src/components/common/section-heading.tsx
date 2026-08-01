import type { ComponentProps, ReactNode } from "react";

import {
  Display,
  Eyebrow,
  Heading,
  Subheading,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small uppercase label above the heading. Omit to hide. */
  eyebrow?: ReactNode;
  /** The section title. */
  heading: ReactNode;
  /** Supporting sentence under the heading. */
  subheading?: ReactNode;
  /** Semantic level for the heading element. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  /** Visual size of the heading. */
  size?: "sm" | "md" | "lg" | "display";
  /** Centres the block — used by CTAs and sparse marketing sections. */
  align?: "start" | "center";
  className?: string;
} & Omit<ComponentProps<"div">, "children">;

/**
 * The standard section intro: optional eyebrow, heading, optional subheading.
 *
 * Exists so every section opens the same way — same gap, same measure, same
 * hierarchy — rather than each one reinventing a stack of text classes. Pages
 * pass content; this owns the rhythm.
 */
export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  as = "h2",
  size = "lg",
  align = "start",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-prose flex-col gap-(--spacing-stack-sm)",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {size === "display" ? (
        <Display as={as} size="sm">
          {heading}
        </Display>
      ) : (
        <Heading as={as} size={size}>
          {heading}
        </Heading>
      )}
      {subheading ? <Subheading>{subheading}</Subheading> : null}
    </div>
  );
}
