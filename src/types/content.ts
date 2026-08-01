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

/**
 * A case study. Deliberately outcome-shaped rather than screenshot-shaped:
 * `problem` / `approach` / `outcome` is the structure that persuades a founder,
 * and `metrics` is what a recruiter skims for.
 */
export type Project = {
  slug: string;
  title: string;
  /** One sentence, shown on the card. */
  summary: string;
  /** The client, employer, or "Personal project". */
  client: string;
  year: number;
  role: string;
  problem: string;
  approach: string;
  outcome: string;
  /** Quantified results, e.g. `{ label: "LCP", value: "-62%" }`. */
  metrics: { label: string; value: string }[];
  stack: string[];
  links: {
    live?: string;
    repository?: string;
    caseStudy?: string;
  };
  cover?: {
    src: string;
    alt: string;
  };
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
