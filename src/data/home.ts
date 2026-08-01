import type {
  Differentiator,
  HomeCopy,
  ProcessStep,
  Skill,
  TechCategory,
} from "@/types/home";
import { primaryCta } from "@/config/navigation";

/**
 * Homepage copy and supporting lists.
 *
 * Kept out of `siteConfig` so identity (name, email, socials) stays separate
 * from marketing narrative. Replace every string before the first real deploy.
 */
export const homeCopy: HomeCopy = {
  hero: {
    lead: "I help product teams and founders ship fast, accessible web applications — from performance-critical surfaces to design systems that scale.",
    primaryCta: {
      label: primaryCta.title,
      href: primaryCta.href,
    },
    secondaryCta: {
      label: "View projects",
      href: "/projects",
    },
  },
  about: {
    eyebrow: "About",
    heading: "Product-minded engineering with a bias for shipping",
    body: [
      "I’m a software engineer who designs and builds web products end to end. My work sits at the intersection of clear UX, solid architecture, and measurable performance — the kind of shipping that holds up after launch, not just in a demo.",
      "I’ve led frontend platforms, rebuilt revenue-critical flows, and mentored engineers through their first production launches. Open to full-time roles and focused freelance engagements.",
    ],
  },
  services: {
    eyebrow: "Services",
    heading: "Engagements with a clear outcome",
    subheading:
      "Scoped packages for founders and product teams who need senior ownership without a long hiring cycle.",
  },
  skills: {
    eyebrow: "Skills",
    heading: "What I bring to the work",
    subheading:
      "The capabilities behind the case studies — not a laundry list of every tool I’ve touched.",
  },
  experience: {
    eyebrow: "Experience",
    heading: "Roles where the work had to hold up",
    subheading:
      "Highlights over responsibilities. Each line is something a hiring manager can verify.",
  },
  featuredProjects: {
    eyebrow: "Selected work",
    heading: "Outcomes under real constraints",
    subheading:
      "A short list of projects where performance, systems, or delivery actually moved a metric.",
  },
  process: {
    eyebrow: "Process",
    heading: "How engagements run",
    subheading:
      "A predictable rhythm from discovery to handover — so you always know what happens next.",
  },
  techStack: {
    eyebrow: "Stack",
    heading: "Tools I reach for by default",
    subheading:
      "Chosen for speed of delivery, maintainability, and how well they perform in production.",
  },
  why: {
    eyebrow: "Why work with me",
    heading: "What you get beyond the code",
    subheading:
      "Senior ownership, clear communication, and a bias toward outcomes you can measure.",
  },
  blog: {
    eyebrow: "Writing",
    heading: "Notes on building for the web",
    subheading:
      "Practical posts on performance, architecture, and shipping with taste.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Have a role or a project in mind?",
    subheading:
      "Tell me what you’re building and the constraint that matters most. I usually reply within one business day.",
    secondaryLabel: "Browse projects",
    secondaryHref: "/projects",
  },
};

export const skills: Skill[] = [
  { name: "System design", icon: "layers" },
  { name: "Web performance", icon: "gauge" },
  { name: "Design systems", icon: "sparkles" },
  { name: "Product delivery", icon: "rocket" },
  { name: "TypeScript architecture", icon: "code" },
  { name: "Technical leadership", icon: "briefcase" },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "Clarify the outcome, constraints, and what “done” looks like before a line of code is written.",
  },
  {
    title: "Design the approach",
    description:
      "Shape the architecture, UX path, and delivery plan so scope stays honest and risks surface early.",
  },
  {
    title: "Build in the open",
    description:
      "Ship in vertical slices with frequent demos. You see progress weekly — not at the end.",
  },
  {
    title: "Harden and hand over",
    description:
      "Tests, docs, performance budgets, and a clean handover so your team can own it after I leave.",
  },
];

export const differentiators: Differentiator[] = [
  {
    title: "Outcomes over output",
    description:
      "I optimise for business and user results — conversion, latency, adoption — not ticket counts.",
    icon: "gauge",
  },
  {
    title: "Senior ownership",
    description:
      "Comfortable owning a surface end to end: discovery, UI, data, and the operational details after launch.",
    icon: "briefcase",
  },
  {
    title: "Clear communication",
    description:
      "Async-friendly updates, explicit trade-offs, and no jargon walls. You’ll always know where things stand.",
    icon: "sparkles",
  },
];

export const techStack: TechCategory[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & data",
    items: ["Node.js", "PostgreSQL", "GraphQL", "Prisma"],
  },
  {
    title: "Platform",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions"],
  },
];
