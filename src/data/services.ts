import type { Service } from "@/types/content";

/**
 * Freelance offers.
 *
 * Named, scoped packages ("Performance audit", "MVP build") convert far better
 * than an open-ended "hire me": they let a business owner recognise their own
 * problem and estimate cost before they ever write an email.
 */
export const services: Service[] = [
  {
    slug: "performance-audit",
    title: "Performance audit",
    description:
      "A two-week deep dive into Core Web Vitals, with a prioritised fix list your team can ship from.",
    icon: "gauge",
    deliverables: [
      "Lab and field measurement",
      "Prioritised remediation plan",
      "Before/after benchmarks",
    ],
    startingAt: "From $3k",
  },
  {
    slug: "mvp-build",
    title: "MVP build",
    description:
      "A production-ready web product in six to ten weeks — auth, billing, and the first paying workflow.",
    icon: "rocket",
    deliverables: [
      "Scoped discovery workshop",
      "Designed and built end-to-end",
      "Handover docs and Loom walkthroughs",
    ],
    startingAt: "From $18k",
  },
  {
    slug: "design-systems",
    title: "Design systems",
    description:
      "A tokenised component layer your team will actually use, with a living reference and contribution guide.",
    icon: "layers",
    deliverables: [
      "Token architecture",
      "Core primitives and patterns",
      "Docs site and adoption plan",
    ],
    startingAt: "From $12k",
  },
];
