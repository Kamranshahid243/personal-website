import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Icon wrapper.
 *
 * Lucide icons default to a 24px box and a stroke width of 2, which is heavy
 * beside Geist at text sizes and inconsistent with itself once icons appear at
 * several scales. This normalises both against the design tokens: sizes are in
 * rem so an icon scales with its neighbouring text, and the stroke is fixed at
 * 1.75 site-wide.
 *
 * Icons inside a `<Button>` do not need this — the button already sizes its own
 * children from `--btn-icon`. Use it for standalone icons in prose, lists and
 * feature grids.
 */
const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-(--icon-xs)",
      sm: "size-(--icon-sm)",
      md: "size-(--icon-md)",
      lg: "size-(--icon-lg)",
      xl: "size-(--icon-xl)",
    },
    tone: {
      default: "text-text",
      muted: "text-text-muted",
      subtle: "text-text-subtle",
      brand: "text-brand-600 dark:text-brand-400",
    },
  },
  defaultVariants: { size: "sm", tone: "default" },
});

type IconProps = Omit<ComponentProps<LucideIcon>, "ref"> &
  VariantProps<typeof iconVariants> & {
    icon: LucideIcon;
    /**
     * Icons are decorative by default and hidden from assistive technology.
     * Pass a label only when the icon is the sole carrier of meaning.
     */
    label?: string;
  };

export function Icon({
  icon: Component,
  size,
  tone,
  label,
  className,
  ...props
}: IconProps) {
  return (
    <Component
      className={cn(iconVariants({ size, tone }), className)}
      strokeWidth="var(--icon-stroke)"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      {...props}
    />
  );
}

export { iconVariants };
