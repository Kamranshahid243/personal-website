import type { Experience } from "@/types/content";

/**
 * Career history, most recent first.
 *
 * Also the source for Person/WorkExperience structured data, so it stays
 * structured rather than living only in prose.
 */
export const experience: Experience[] = [
  {
    company: "Teamo",
    role: "Software Engineer",
    start: "2022-02",
    location: "Pakistan",
    url: "https://teamo.io",
    highlights: [
      "Build modern web applications and internal business platforms used by the team day to day.",
      "Design automation workflows that connect tools, reduce manual work, and keep operations consistent.",
      "Deliver CMS-driven websites, third-party API integrations, and production deployments with a focus on performance and UX.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "n8n",
      "Prismic",
    ],
  },
  {
    company: "Appmakers",
    role: "Full Stack Developer",
    start: "2019-02",
    end: "2022-01",
    location: "Pakistan",
    highlights: [
      "Shipped full stack features across web and mobile-oriented stacks for client and product work.",
      "Worked across Laravel, AngularJS, Vue.js, Ionic, React, and Node.js as project needs required.",
      "Strengthened foundations in API development, responsive UI, and delivering maintainable application code.",
    ],
    stack: ["Laravel", "AngularJS", "Vue.js", "Ionic", "React", "Node.js"],
  },
];
