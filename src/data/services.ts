import type { Service } from "@/types/content";

/**
 * Freelance and engagement offers.
 *
 * Framed around business outcomes. Pricing is intentionally omitted —
 * scopes vary too much for honest fixed starting prices without discovery.
 */
export const services: Service[] = [
  {
    slug: "custom-web-development",
    title: "Custom web development",
    description:
      "Purpose-built websites and web apps tailored to how your business actually works — not a generic template with your logo on it.",
    icon: "code",
    deliverables: [
      "Scoped product or marketing site",
      "Responsive, production-ready UI",
      "Clear handover documentation",
    ],
    startingAt: "",
  },
  {
    slug: "full-stack-saas",
    title: "Full stack & SaaS applications",
    description:
      "End-to-end application work — from auth and data models to the screens your users live in — built for growth and long-term ownership.",
    icon: "layers",
    deliverables: [
      "Architecture and feature delivery",
      "API and database implementation",
      "Deployable production baseline",
    ],
    startingAt: "",
  },
  {
    slug: "react-nextjs",
    title: "React & Next.js development",
    description:
      "Modern frontend engineering with React and Next.js — fast pages, clean component structure, and experiences that feel intentional.",
    icon: "rocket",
    deliverables: [
      "App Router / React UI delivery",
      "TypeScript-first codebase",
      "Performance-conscious frontends",
    ],
    startingAt: "",
  },
  {
    slug: "api-integrations",
    title: "API development & integrations",
    description:
      "Reliable APIs and third-party connections so your tools share data cleanly — less copy-paste, fewer broken handoffs between systems.",
    icon: "plug",
    deliverables: [
      "REST API design or implementation",
      "Third-party service integration",
      "Error handling and observability basics",
    ],
    startingAt: "",
  },
  {
    slug: "ai-workflow-automation",
    title: "AI & workflow automation",
    description:
      "Automations that take repetitive work off your team — from content pipelines to internal ops — using tools like n8n, Activepieces, and Make.",
    icon: "sparkles",
    deliverables: [
      "Workflow discovery and mapping",
      "Production automation builds",
      "Notifications and reporting hooks",
    ],
    startingAt: "",
  },
  {
    slug: "cms-performance",
    title: "CMS, modernization & performance",
    description:
      "Headless CMS setups, website modernization, and performance work so content stays editable and the experience stays fast for visitors.",
    icon: "gauge",
    deliverables: [
      "CMS-driven page architecture",
      "Modernization or rebuild plan",
      "Performance and SEO improvements",
    ],
    startingAt: "",
  },
];
