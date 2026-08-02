import { env } from "@/env";

/**
 * The single source of truth for who this site is about.
 *
 * Name, tagline, contact details and social handles are referenced by the
 * header, the footer, page metadata, JSON-LD, the sitemap and the OG image
 * generator. Changing a handle should never mean grepping the codebase.
 *
 * TODO(personalise): replace every placeholder below before the first deploy.
 * Leave social URLs empty until they are real — empty values are hidden.
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
  /**
   * Default share image. File-based `app/opengraph-image.tsx` and `/api/og`
   * generate branded cards; this path is the static fallback URL for tooling.
   */
  ogImage: "/opengraph-image",
  /**
   * Headshot for the homepage hero. Leave empty for the initials mark; set to
   * a path under `/public` when the file exists (e.g. `/images/portrait.jpg`).
   */
  portrait: "",
  keywords: [
    "software engineer",
    "freelance developer",
    "web development",
    "Next.js",
    "TypeScript",
    "React",
  ],
  links: {
    /** Empty until personalised — fake `/username` URLs are never rendered. */
    github: "",
    linkedin: "",
    x: "",
    /** Booking link for the primary CTA. Falls back to mailto when empty. */
    calendar: "",
    /** Path under `/public`. The résumé button only renders when the file exists. */
    resume: "/resume.pdf",
  },
  /** Drives the availability badge and the contact page's framing. */
  availability: {
    status: "open" as "open" | "limited" | "closed",
    label: "Open to opportunities",
  },
} as const;

export type SiteConfig = typeof siteConfig;
