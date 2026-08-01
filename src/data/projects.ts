import type { Project } from "@/types/content";

/**
 * Case studies, in display order.
 *
 * Three to five entries, strongest first. A long list reads as a job board
 * history; a short curated one reads as taste.
 *
 * The sample entry below exists so cards can be reviewed. Replace it before
 * the first deploy.
 */
export const projects: Project[] = [
  {
    slug: "checkout-performance",
    title: "Cut checkout LCP by 62%",
    summary:
      "Rebuilt a multi-step checkout for a DTC brand so the critical path stopped competing with third-party scripts.",
    client: "Northline",
    year: 2025,
    role: "Lead frontend",
    problem:
      "Mobile conversion was falling because the checkout took four seconds to become interactive.",
    approach:
      "Split the critical path, deferred non-essential analytics, and streamed above-the-fold content.",
    outcome: "LCP dropped from 4.1s to 1.6s. Checkout completion rose 18%.",
    metrics: [
      { label: "LCP", value: "−62%" },
      { label: "Completion", value: "+18%" },
    ],
    stack: ["Next.js", "TypeScript", "Edge", "Playwright"],
    links: { caseStudy: "/work/checkout-performance" },
    featured: true,
  },
  {
    slug: "design-system",
    title: "Shipped a design system in six weeks",
    summary:
      "Tokenised a fragmented component library so three product teams could ship UI without reinventing spacing.",
    client: "Cascade",
    year: 2024,
    role: "Staff engineer",
    problem: "Four products, four button styles, and no shared primitives.",
    approach:
      "OKLCH tokens, a typed component layer, and a living reference page every PR had to pass.",
    outcome:
      "New screens dropped from days to hours; visual regressions fell by half.",
    metrics: [{ label: "Time-to-UI", value: "−70%" }],
    stack: ["React", "Tailwind", "Radix", "Chromatic"],
    links: {},
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
