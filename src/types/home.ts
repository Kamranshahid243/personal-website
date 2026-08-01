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

export type HeroCta = {
  label: string;
  href: string;
};

/** Homepage-only copy that is not site-wide identity. */
export type HomeCopy = {
  hero: {
    /** One-line claim under the name — the reason to keep reading. */
    valueProposition: string;
    /** Two sentences max for recruiters and clients. */
    introduction: string;
    /** Booking / hiring window, distinct from the availability badge. */
    status: string;
    /** Quiet stack strip under the hero actions. */
    techHighlights: string[];
    primaryCta: HeroCta;
    secondaryCta: HeroCta;
    resumeCta: HeroCta;
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
