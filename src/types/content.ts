/**
 * Domain types for the hand-curated content in `src/data`.
 *
 * These are the shapes the marketing pages render. Defining them up front is
 * what stops a case study from being "whatever fields I happened to write that
 * day", and it makes moving any collection to a CMS later a matter of
 * satisfying the same interface.
 */

export type Link = {
  label: string;
  href: string;
};

/** Curated taxonomy for the projects index filters. */
export const PROJECT_CATEGORIES = [
  "Performance",
  "Product",
  "Design System",
  "Platform",
  "Developer Tools",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectScreenshot = {
  /** Optional photo under `/public`. Decorative plate renders when absent. */
  src?: string;
  alt: string;
  /** Shown under the figure; defaults to `alt` when omitted. */
  caption?: string;
};

/**
 * A case study. The index card leads with problem and stack; the detail route
 * expands into a fixed engagement narrative so every project reads as a
 * professional write-up rather than a portfolio tile.
 */
export type Project = {
  slug: string;
  title: string;
  /** One sentence, shown on the card and as the meta description fallback. */
  summary: string;
  category: ProjectCategory;
  /** The client, employer, or "Personal project". */
  client: string;
  year: number;
  role: string;
  /** Short problem statement shown on the card. */
  problem: string;
  approach: string;
  outcome: string;
  /** Opening narrative on the case-study page. */
  overview: string;
  businessProblem: string;
  goals: string[];
  /** What was learned before building — users, constraints, diagnostics. */
  research: string;
  roleSummary: string;
  solution: string;
  architecture: string;
  challenges: string[];
  results: string;
  lessonsLearned: string[];
  /** Quantified results, e.g. `{ label: "LCP", value: "-62%" }`. */
  metrics: { label: string; value: string }[];
  stack: string[];
  links: {
    live?: string;
    repository?: string;
  };
  cover: {
    /** Optional photo under `/public`. Decorative cover renders when absent. */
    src?: string;
    alt: string;
  };
  screenshots?: ProjectScreenshot[];
  /** Surfaces on the home page. */
  featured: boolean;
};

/** A packaged freelance offer. Concrete scope beats a vague "I can do X". */
export type Service = {
  slug: string;
  title: string;
  description: string;
  /** Lucide icon name, resolved at render time. */
  icon: string;
  /** What the client actually receives. */
  deliverables: string[];
  /** e.g. "From $X" or "2-week sprint". Empty string hides the line. */
  startingAt: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  /** Links to the original LinkedIn recommendation or email, for credibility. */
  source?: string;
};

export type Experience = {
  company: string;
  role: string;
  /** ISO dates; `end` omitted means "present". */
  start: string;
  end?: string;
  location: string;
  /** Achievements, not responsibilities. Lead with the number. */
  highlights: string[];
  stack: string[];
  url?: string;
};

export type Faq = {
  question: string;
  answer: string;
};
