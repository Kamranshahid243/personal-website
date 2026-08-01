import { siteConfig } from "@/config/site";

export type NavItem = {
  title: string;
  /**
   * Typed as `string` while detail routes are still landing. Narrow to
   * `Route` once `/projects` and `/blog` pages exist and `typedRoutes` can
   * validate every href at compile time.
   */
  href: string;
  external?: boolean;
  description?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

/**
 * Public nav matches the v1 IA: Projects and Blog only.
 * Contact is a CTA (mailto / calendar), not a page.
 */
export const mainNav: NavItem[] = [
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
];

/** Persistent ask — email by default; swap to calendar when a booking link exists. */
export const primaryCta: NavItem = {
  title: "Get in touch",
  href: siteConfig.links.calendar || `mailto:${siteConfig.email}`,
  external: true,
};

export const footerNav: NavSection[] = [
  {
    title: "Site",
    items: [{ title: "Home", href: "/" }, ...mainNav, primaryCta],
  },
  {
    title: "Elsewhere",
    items: [
      { title: "GitHub", href: siteConfig.links.github, external: true },
      { title: "LinkedIn", href: siteConfig.links.linkedin, external: true },
      { title: "X", href: siteConfig.links.x, external: true },
    ],
  },
];
