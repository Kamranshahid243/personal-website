import type { ReactNode } from "react";

/**
 * `(dev)` route group: internal tooling, not part of the public site.
 *
 * A passthrough on purpose — `/design` and `/components` own their own shells
 * (one is a bare reference page, the other mounts the real navbar and footer
 * so those components can be reviewed in context).
 */
export default function DevLayout({ children }: { children: ReactNode }) {
  return children;
}
