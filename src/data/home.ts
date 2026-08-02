import type {
  Differentiator,
  HomeCopy,
  ProcessStep,
  Skill,
  TechCategory,
} from "@/types/home";
import { primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * Homepage copy and supporting lists.
 *
 * Kept out of `siteConfig` so identity (name, email, socials) stays separate
 * from marketing narrative.
 */
export const homeCopy: HomeCopy = {
  hero: {
    valueProposition:
      "Full stack engineer building web products and automations that help businesses move faster.",
    introduction:
      "I specialize in React, Next.js, TypeScript, and Node.js — and I also design AI-powered workflows that remove repetitive work. Based in Pakistan, open to full-time roles and select freelance projects.",
    status: "Open to full-time roles and select freelance engagements",
    techHighlights: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "n8n",
    ],
    primaryCta: {
      label: primaryCta.title,
      href: primaryCta.href,
    },
    secondaryCta: {
      label: "View selected work",
      href: "/projects",
    },
    resumeCta: {
      label: "Download résumé",
      href: siteConfig.links.resume,
    },
  },
  about: {
    eyebrow: "About",
    heading: "Software that solves real business problems",
    body: [
      "I’m a full stack software engineer with 6+ years of experience building scalable web applications. I enjoy taking a messy business process and turning it into software that is clear, maintainable, and useful day to day.",
      "My core stack is React, Next.js, TypeScript, and Node.js. I also build AI-powered automation systems that connect tools, reduce manual work, and help teams save time. I care about performance, clean architecture, and experiences people actually want to use.",
    ],
  },
  services: {
    eyebrow: "Services",
    heading: "How I can help your product or business",
    subheading:
      "Scoped engagements for teams that need modern web apps, reliable APIs, or automation that removes busywork.",
  },
  skills: {
    eyebrow: "Skills",
    heading: "What I bring to the work",
    subheading:
      "Practical capabilities shaped by shipping production software — not a checklist of every tool I’ve tried.",
  },
  experience: {
    eyebrow: "Experience",
    heading: "Where I’ve been shipping",
    subheading:
      "Roles focused on modern web platforms, internal tools, and automation that supports real teams.",
  },
  featuredProjects: {
    eyebrow: "Selected work",
    heading: "Projects that show how I think and build",
    subheading:
      "Corporate web rebuilds, AI content systems, and business workflow automation — chosen for clarity over volume.",
  },
  process: {
    eyebrow: "Process",
    heading: "How engagements usually run",
    subheading:
      "Clear scope, visible progress, and a handover your team can own.",
  },
  techStack: {
    eyebrow: "Stack",
    heading: "Tools I use to ship reliable software",
    subheading:
      "Chosen for delivery speed, maintainability, and how well they hold up in production.",
  },
  why: {
    eyebrow: "Why work with me",
    heading: "What you can expect when we work together",
    subheading:
      "Clear communication, business-first decisions, and software built to last beyond the first release.",
  },
  blog: {
    eyebrow: "Writing",
    heading: "Notes on building for the web",
    subheading:
      "Practical thoughts on React, Next.js, automation, and shipping with care.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let’s build your next product",
    subheading:
      "Have a role, product idea, or automation challenge? Tell me what you’re working on — I usually reply within one business day.",
    secondaryLabel: "Browse projects",
    secondaryHref: "/projects",
  },
};

/** Supported homepage numbers — no invented client or revenue metrics. */
export const aboutStats = [
  { value: "6+", label: "Years experience" },
  { value: "20+", label: "Technologies" },
  { value: "6+", label: "Major projects" },
  { value: "100%", label: "Responsive builds" },
] as const;

export const skills: Skill[] = [
  { name: "Full stack development", icon: "layers" },
  { name: "React & Next.js", icon: "code" },
  { name: "API design & integrations", icon: "plug" },
  { name: "AI & workflow automation", icon: "sparkles" },
  { name: "CMS & content systems", icon: "pencil" },
  { name: "Performance & UX", icon: "gauge" },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Understand the problem",
    description:
      "Clarify the business goal, constraints, and what “done” looks like before writing code.",
  },
  {
    title: "Design the approach",
    description:
      "Shape architecture, UX flow, and delivery plan so scope stays honest and risks surface early.",
  },
  {
    title: "Build in visible slices",
    description:
      "Ship working increments with regular demos — so you see progress, not a surprise at the end.",
  },
  {
    title: "Harden and hand over",
    description:
      "Polish performance, document decisions, and leave something your team can maintain confidently.",
  },
];

export const differentiators: Differentiator[] = [
  {
    title: "Business-first thinking",
    description:
      "I start with the outcome you need — saved time, clearer workflows, a better product — then choose the simplest technical path to get there.",
    icon: "briefcase",
  },
  {
    title: "Clean, maintainable code",
    description:
      "Reusable architecture and clear boundaries matter as much as shipping fast. I build software teams can extend without fear.",
    icon: "code",
  },
  {
    title: "Reliable communication",
    description:
      "You’ll know what’s in progress, what’s blocked, and why a trade-off was made — without jargon walls or silent weeks.",
    icon: "sparkles",
  },
  {
    title: "Performance and detail",
    description:
      "Responsive experiences, thoughtful UX, and production deployments are part of the job — not afterthoughts.",
    icon: "gauge",
  },
];

export const techStack: TechCategory[] = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Laravel", "PHP"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "Supabase"],
  },
  {
    title: "Automation",
    items: ["n8n", "Activepieces", "Make.com"],
  },
  {
    title: "CMS & Auth",
    items: ["Prismic", "Supabase Auth", "Clerk", "OAuth"],
  },
  {
    title: "Cloud & Tools",
    items: ["Vercel", "Hostinger", "Git", "GitHub", "Postman", "Cursor AI"],
  },
];
