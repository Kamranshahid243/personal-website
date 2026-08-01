import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Text input.
 *
 * Height comes from `--control-h-md`, the same token the button uses, so an
 * input and the button beside it are the same height by construction.
 *
 * Invalid state is driven by `aria-invalid` rather than a prop: the attribute
 * is what a screen reader announces, so binding the styling to it makes the
 * visual and non-visual states impossible to desynchronise.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-(--control-h-md) w-full min-w-0 px-(--field-px) py-(--field-py)",
        "rounded-(--field-radius) border border-(--field-border) bg-(--field-bg)",
        "text-(length:--field-text) text-text",
        "focus-ring transition-ui",
        "placeholder:text-text-subtle",
        "hover:border-text-subtle/50",
        "focus-visible:border-brand-500",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-danger aria-invalid:hover:border-danger",
        // A 16px font is what stops iOS Safari zooming on focus; the design
        // size is restored once there is a pointer and a wider viewport.
        "text-base md:text-(length:--field-text)",
        "file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
