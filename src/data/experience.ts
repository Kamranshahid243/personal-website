import type { Experience } from "@/types/content";

/**
 * Career history, most recent first.
 *
 * Also the source for the Person/WorkExperience structured data and for a
 * generated résumé, so it stays structured rather than living in prose.
 */
export const experience: Experience[] = [
  {
    company: "Cascade",
    role: "Staff Software Engineer",
    start: "2023-04",
    location: "Remote · Europe",
    highlights: [
      "Led the design system that three product teams now ship from.",
      "Cut median LCP across the marketing surface by 48%.",
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "AWS"],
    url: "https://example.com",
  },
  {
    company: "Northline",
    role: "Senior Frontend Engineer",
    start: "2020-09",
    end: "2023-03",
    location: "London",
    highlights: [
      "Owned the checkout rebuild that lifted mobile completion 18%.",
      "Mentored four engineers through their first production launches.",
    ],
    stack: ["React", "Node.js", "GraphQL"],
  },
];
