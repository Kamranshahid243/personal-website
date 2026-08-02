import { env } from "@/env";

/**
 * The single source of truth for who this site is about.
 *
 * Name, tagline, contact details and social handles are referenced by the
 * header, the footer, page metadata, JSON-LD, the sitemap and the OG image
 * generator. Changing a handle should never mean grepping the codebase.
 *
 * TODO(personalise):
 * - Add a calendar booking link if you use one
 * - Add `/public/resume.pdf` if you want the résumé button to appear
 */
export const siteConfig = {
  name: "Kamran Shahid",
  /** Used where the full name is too long, e.g. the header wordmark. */
  shortName: "KS",
  role: "Full Stack Software Engineer",
  /** One line. This is the first thing a recruiter reads — make it a claim. */
  tagline:
    "I build scalable web apps and AI-powered automations that save businesses time.",
  /** 150-160 characters: the length Google renders without truncating. */
  description:
    "Kamran Shahid is a full stack software engineer in Pakistan specializing in React, Next.js, TypeScript, Node.js, and AI workflow automation for modern business applications.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en_US",
  /** IANA zone — Pakistan Standard Time. */
  timezone: "Asia/Karachi",
  location: "Pakistan",
  email: "kamranshahid243@gmail.com",
  /**
   * Default share image. File-based `app/opengraph-image.tsx` and `/api/og`
   * generate branded cards; this path is the static fallback URL for tooling.
   */
  ogImage: "/opengraph-image",
  /**
   * Headshot for the homepage hero. Leave empty for the initials mark; set to
   * a path under `/public` when the file exists (e.g. `/images/portrait.jpg`).
   */
  portrait: "/images/portrait.jpg",
  keywords: [
    "Kamran Shahid",
    "full stack software engineer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "automation engineer",
    "AI automation",
    "Pakistan software engineer",
    "freelance web developer",
    "SaaS development",
    "headless CMS",
  ],
  links: {
    github: "https://github.com/Kamranshahid243",
    linkedin: "https://linkedin.com/in/kamran-shahid-1a7719193",
    x: "https://x.com/Kamran8696",
    /** Leave empty to use mailto for the primary CTA. */
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
