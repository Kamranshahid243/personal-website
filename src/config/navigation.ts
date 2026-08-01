import { siteConfig } from "@/config/site";

export type NavItem = {
  title: string;
  /**
   * Typed as `string` while the route tree is still being built. Once the
   * pages exist, narrow this to next's `Route` type and `typedRoutes` (already
   * enabled in next.config.ts) turns every broken link into a compile error.
   */
  href: string;
  /** Renders as a new-tab link with the appropriate rel attributes. */
  external?: boolean;
  description?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

/**
 * Navigation lives in config, not inside the header component, so the desktop
 * nav, the mobile sheet, the footer and the sitemap all render from one list
 * and can never drift apart.
 *
 * The ordering is a conversion decision rather than an alphabetical one: proof
 * of work first, then the offer, then credibility, then the ask.
 */
export const mainNav: NavItem[] = [
  { title: "Work", href: "/work" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Writing", href: "/blog" },
];

/** The single persistent call to action, rendered beside the nav. */
export const primaryCta: NavItem = {
  title: "Get in touch",
  href: "/contact",
};

export const footerNav: NavSection[] = [
  {
    title: "Site",
    items: [...mainNav, primaryCta],
  },
  {
    title: "Elsewhere",
    items: [
      { title: "GitHub", href: siteConfig.links.github, external: true },
      { title: "LinkedIn", href: siteConfig.links.linkedin, external: true },
      { title: "X", href: siteConfig.links.x, external: true },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
];
