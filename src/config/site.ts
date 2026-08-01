import { env } from "@/env";

/**
 * The single source of truth for who this site is about.
 *
 * Name, tagline, contact details and social handles are referenced by the
 * header, the footer, page metadata, JSON-LD, the sitemap and the OG image
 * generator. Changing a handle should never mean grepping the codebase.
 *
 * TODO(personalise): replace every placeholder below before the first deploy.
 */
export const siteConfig = {
  name: "Your Name",
  /** Used where the full name is too long, e.g. the header wordmark. */
  shortName: "YN",
  role: "Software Engineer",
  /** One line. This is the first thing a recruiter reads — make it a claim. */
  tagline:
    "I ship web products that convert, stay fast, and hold up after launch.",
  /** 150-160 characters: the length Google renders without truncating. */
  description:
    "Software engineer for product teams and founders. I design and ship production web applications with clear scope, measurable outcomes, and senior ownership end to end.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en_US",
  /** IANA zone, used to render availability and response times honestly. */
  timezone: "UTC",
  email: "hello@example.com",
  /** Falls back to a static file; the /api/og route generates per-page images. */
  ogImage: "/opengraph-image.png",
  /**
   * Headshot for the homepage hero. Leave empty to show the initials
   * placeholder; drop a file at this path when you have a real portrait.
   */
  portrait: "/images/portrait.jpg",
  keywords: [
    "software engineer",
    "freelance developer",
    "web development",
    "Next.js",
    "TypeScript",
    "React",
  ],
  links: {
    github: "https://github.com/username",
    linkedin: "https://www.linkedin.com/in/username",
    x: "https://x.com/username",
    /** Booking link for the contact page's primary CTA. */
    calendar: "",
    /** PDF in `/public`. Replace the file before sharing the résumé link. */
    resume: "/resume.pdf",
  },
  /** Drives the availability badge and the contact page's framing. */
  availability: {
    status: "open" as "open" | "limited" | "closed",
    label: "Available for new work",
  },
} as const;

export type SiteConfig = typeof siteConfig;
