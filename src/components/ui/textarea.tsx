import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Multi-line input.
 *
 * Shares every token with `<Input>` except the fixed height — `field-sizing:
 * content` grows the box with the text up to a cap, which removes the scroll-
 * inside-a-tiny-box problem without any JavaScript.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-24 w-full px-(--field-px) py-(--field-py)",
        "rounded-(--field-radius) border border-(--field-border) bg-(--field-bg)",
        "text-(length:--field-text) leading-relaxed text-text",
        "resize-none focus-ring transition-ui",
        "placeholder:text-text-subtle",
        "hover:border-text-subtle/50",
        "focus-visible:border-brand-500",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-danger aria-invalid:hover:border-danger",
        "text-base md:text-(length:--field-text)",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
