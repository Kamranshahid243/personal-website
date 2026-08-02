import type { Route } from "next";

import { siteConfig } from "@/config/site";
import { isUsableHref } from "@/lib/links";

export type NavItem = {
  title: string;
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
  { title: "Projects", href: "/projects" satisfies Route },
  { title: "Blog", href: "/blog" satisfies Route },
];

/** Persistent ask — email by default; swap to calendar when a booking link exists. */
export const primaryCta: NavItem = {
  title: "Let’s talk",
  href: siteConfig.links.calendar || `mailto:${siteConfig.email}`,
  external: true,
};

const elsewhere: NavItem[] = [
  { title: "GitHub", href: siteConfig.links.github, external: true },
  { title: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { title: "X", href: siteConfig.links.x, external: true },
].filter((item) => isUsableHref(item.href));

export const footerNav: NavSection[] = [
  {
    title: "Site",
    items: [
      { title: "Home", href: "/" satisfies Route },
      ...mainNav,
      primaryCta,
    ],
  },
  ...(elsewhere.length > 0
    ? [{ title: "Elsewhere", items: elsewhere }]
    : []),
];
