import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * The one place every app-wide provider is composed.
 *
 * Keeping them here rather than nesting them in `layout.tsx` means the root
 * layout stays a readable document shell, and adding an analytics or query
 * provider later touches exactly one file.
 *
 * Note this component itself is a server component — each provider marks its
 * own client boundary, so `children` passed from a server page are still
 * rendered on the server.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
