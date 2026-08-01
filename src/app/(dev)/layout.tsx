import type { ReactNode } from "react";

/**
 * `(dev)` route group: internal tooling, not part of the public site.
 *
 * Separated from `(marketing)` because these pages want no header, no footer
 * and no conversion furniture — and because grouping them makes it obvious at
 * a glance which routes are not for visitors.
 */
export default function DevLayout({ children }: { children: ReactNode }) {
  return <main id="main">{children}</main>;
}
