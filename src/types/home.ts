/** A capability shown in the Skills section. */
export type Skill = {
  name: string;
  /** Lucide icon name resolved via `getIcon()`. */
  icon: string;
};

/** One step in the development process. */
export type ProcessStep = {
  title: string;
  description: string;
};

/** A reason card in “Why work with me”. */
export type Differentiator = {
  title: string;
  description: string;
  icon: string;
};

/** A labelled group of technologies. */
export type TechCategory = {
  title: string;
  items: string[];
};

/** Shared eyebrow + heading + optional subheading for a homepage section. */
export type SectionCopy = {
  eyebrow: string;
  heading: string;
  subheading?: string;
};

/** Homepage-only copy that is not site-wide identity. */
export type HomeCopy = {
  hero: {
    /** Supporting line under the site tagline. */
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  about: SectionCopy & {
    body: string[];
  };
  services: SectionCopy;
  skills: SectionCopy;
  experience: SectionCopy;
  featuredProjects: SectionCopy;
  process: SectionCopy;
  techStack: SectionCopy;
  why: SectionCopy;
  blog: SectionCopy;
  contact: SectionCopy & {
    primaryLabel?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};
