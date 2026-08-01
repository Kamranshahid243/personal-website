import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("shrink-0 animate-spin-slow", {
  variants: {
    size: {
      xs: "size-(--icon-xs)",
      sm: "size-(--icon-sm)",
      md: "size-(--icon-md)",
      lg: "size-(--icon-lg)",
    },
  },
  defaultVariants: { size: "sm" },
});

type SpinnerProps = ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants> & {
    /** Announced to assistive technology. Set to `null` inside a labelled region. */
    label?: string | null;
  };

/**
 * Indeterminate progress.
 *
 * For actions the visitor initiated and is waiting on — a form submitting, a
 * filter applying. For content that has not arrived yet, a `<Skeleton>` is
 * better: it communicates the shape of what is coming rather than just that
 * something is happening.
 *
 * The spin is a fixed 1.2s rather than Tailwind's default 1s: slightly slower
 * reads as calm instead of frantic, and it is the same curve everywhere.
 */
export function Spinner({
  className,
  size,
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <>
      <Loader2
        data-slot="spinner"
        className={cn(spinnerVariants({ size }), className)}
        strokeWidth="var(--icon-stroke)"
        aria-hidden
        {...props}
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </>
  );
}

export { spinnerVariants };
