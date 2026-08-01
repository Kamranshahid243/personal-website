import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Vertical rhythm primitive.
 *
 * Page sections never set their own top/bottom padding; they use this, which
 * reads the single `--spacing-section` token. Consistent pacing between
 * sections is most of what separates a designed page from a stack of blocks.
 */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-section", className)} {...props} />;
}
