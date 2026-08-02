import type { Project } from "@/types/content";

/**
 * Case studies, in display order.
 *
 * Honest narrative only — no invented conversion rates, revenue, or awards.
 * Strongest / most representative work is featured on the homepage.
 */
export const projects: Project[] = [
  {
    slug: "sah-corporate-website",
    title: "SAH corporate website rebuild",
    summary:
      "Rebuilt a large multilingual corporate website on Next.js with a modern frontend architecture focused on maintainability, SEO, and user experience.",
    category: "Web",
    client: "Teamo",
    year: 2024,
    role: "Software Engineer · Teamo",
    problem:
      "A large corporate site needed a modern rebuild that could support Arabic and English without becoming hard to maintain.",
    approach:
      "Moved the experience onto Next.js and TypeScript with a responsive, performance-conscious frontend and room for headless CMS content ownership.",
    outcome:
      "A scalable bilingual foundation that is easier to extend, clearer for visitors, and better prepared for long-term content workflows.",
    overview:
      "At Teamo, I rebuilt the SAH corporate web presence so it could represent the organisation clearly in both Arabic and English. The rebuild focused on architecture and experience quality — not just a visual refresh — so the site could grow without becoming fragile.",
    businessProblem:
      "Large corporate websites often accumulate outdated patterns, slow pages, and content structures that are difficult to update. For a bilingual audience, that friction compounds: layout, SEO, and editorial workflows all have to work in more than one language.",
    goals: [
      "Deliver a responsive, modern corporate experience in Arabic and English.",
      "Improve performance and SEO foundations for organic discovery.",
      "Leave a maintainable Next.js codebase ready for headless CMS content ownership.",
    ],
    research:
      "I reviewed the existing information architecture and bilingual requirements, then mapped which page types needed shared layouts versus language-specific treatment. Performance and SEO expectations were treated as product requirements from day one, not polish at the end.",
    roleSummary:
      "As a Software Engineer at Teamo, owned the modern frontend rebuild: Next.js architecture, TypeScript UI, responsive layouts, and performance-minded implementation with planning for headless CMS integration.",
    solution:
      "Built the site on Next.js with TypeScript and Tailwind CSS, structured for reusable sections and clear routing. Emphasised responsive design, SEO-friendly markup, and a path toward headless CMS-driven content so marketing teams are not blocked on engineering for every copy change.",
    architecture:
      "Next.js App Router with TypeScript, Tailwind CSS for styling, and a component model organised around reusable corporate page sections. Content strategy planned with headless CMS ownership in mind so editorial updates can scale separately from frontend releases.",
    challenges: [
      "Supporting Arabic and English without doubling every layout into unmaintainable forks.",
      "Balancing corporate information density with a clean, modern reading experience.",
      "Planning CMS boundaries early so the rebuild would not need a second migration later.",
    ],
    results:
      "Delivered a bilingual corporate site on a modern stack with stronger maintainability, clearer UX structure, and a foundation ready for scalable content and performance work.",
    lessonsLearned: [
      "Multilingual sites need shared layout systems early — language should not mean duplicated architecture.",
      "SEO and performance belong in the initial build plan, not a cleanup phase.",
      "Headless CMS planning is easier before launch than after content has already calcified in the frontend.",
    ],
    metrics: [
      { label: "Languages", value: "AR + EN" },
      { label: "Stack", value: "Next.js" },
      { label: "Focus", value: "SEO + UX" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    links: {},
    cover: {
      alt: "Abstract composition suggesting a multilingual corporate website layout",
    },
    screenshots: [
      {
        alt: "Responsive corporate page layout concept for SAH",
        caption: "Shared section patterns keep Arabic and English experiences aligned.",
      },
    ],
    featured: true,
  },
  {
    slug: "ai-trend-intelligence",
    title: "AI trend intelligence engine",
    summary:
      "An automation platform that discovers trending topics from multiple sources and prepares them for AI-powered content generation.",
    category: "Automation",
    client: "Teamo",
    year: 2025,
    role: "Software Engineer · Teamo",
    problem:
      "Content teams were spending too much time hunting for topics instead of producing useful material.",
    approach:
      "Connected Google Trends, Reddit, Hacker News, and news APIs into a scoring pipeline that lands in Google Sheets and feeds AI processing.",
    outcome:
      "A repeatable trend-discovery workflow that turns scattered signals into structured inputs for content generation.",
    overview:
      "Built at Teamo, this system treats trend discovery as infrastructure. Instead of manual browsing across communities and charts, the engine collects signals, scores them, and prepares structured data for downstream AI content work.",
    businessProblem:
      "Finding timely topics is slow when people jump between Trends dashboards, social communities, and news feeds. Without a shared pipeline, opportunities are missed and content calendars stay reactive.",
    goals: [
      "Ingest trends from several public sources into one place.",
      "Score and organise topics so editors can act quickly.",
      "Hand structured outputs to AI processing without manual reformatting.",
    ],
    research:
      "I mapped which sources produced useful signal for the audience, then designed a scoring model that could combine volume and relevance without over-fitting to a single platform. Google Sheets was chosen as a transparent review layer before AI steps run.",
    roleSummary:
      "As a Software Engineer at Teamo, designed and built the multi-source ingestion, scoring, Sheets handoff, and AI-processing preparation flow.",
    solution:
      "Automated collection from Google Trends, Reddit, Hacker News, and news APIs. Topics are scored, written to Google Sheets for review, and prepared for AI processing so generation starts from structured context rather than a blank prompt.",
    architecture:
      "Orchestrated automation workflows (n8n / similar) calling source APIs on a schedule, normalising payloads, applying trend scoring, syncing to Google Sheets, and triggering AI processing steps with clean inputs.",
    challenges: [
      "Normalising different APIs into one comparable topic model.",
      "Keeping scores useful without becoming noisy or over-automated.",
      "Leaving a human review layer so editors stay in control.",
    ],
    results:
      "Built a multi-source trend pipeline that reduces manual research time and gives AI content systems better starting material.",
    lessonsLearned: [
      "Automation works best when humans still review ranked outputs.",
      "Source diversity beats relying on a single trends feed.",
      "Sheets is a practical bridge between ops teams and AI pipelines.",
    ],
    metrics: [
      { label: "Sources", value: "4+" },
      { label: "Output", value: "Sheets + AI" },
      { label: "Type", value: "Automation" },
    ],
    stack: [
      "n8n",
      "Google Trends",
      "Reddit API",
      "Hacker News",
      "News APIs",
      "Google Sheets",
      "AI processing",
    ],
    links: {},
    cover: {
      alt: "Abstract visualization of trend signals flowing into an intelligence engine",
    },
    featured: true,
  },
  {
    slug: "blog-automation-engine",
    title: "Blog automation engine",
    summary:
      "An automated publishing pipeline from trend ingestion through AI article drafts, social posts, newsletter prep, and publish workflow.",
    category: "Automation",
    client: "Teamo",
    year: 2025,
    role: "Software Engineer · Teamo",
    problem:
      "Publishing required too many disconnected manual steps between research, drafting, and distribution.",
    approach:
      "Connected trend intake to AI article generation, social copy, newsletter preparation, and a controlled publishing workflow.",
    outcome:
      "A content pipeline that moves from idea to publish-ready assets with far less repetitive handoff work.",
    overview:
      "Built at Teamo, this engine extends trend intelligence into a full content operations flow. Once a topic is approved, automation helps draft articles, prepare social and newsletter variants, and move assets through a publishing checklist.",
    businessProblem:
      "Content production often stalls between research and distribution. Writers and marketers lose time reformatting the same idea for blog, social, and email channels.",
    goals: [
      "Connect approved trends to AI-assisted article drafts.",
      "Generate supporting social and newsletter assets from the same source.",
      "Keep a clear publishing workflow with human approval points.",
    ],
    research:
      "I broke the publishing process into stages where automation helps most — drafting and channel adaptation — while keeping editorial judgment on topic selection and final publish.",
    roleSummary:
      "As a Software Engineer at Teamo, built the end-to-end automation from trend ingestion through draft generation, social/newsletter prep, and publishing workflow orchestration.",
    solution:
      "Wired trend inputs into AI article generation, then branched outputs into social media drafts and newsletter preparation. A publishing workflow keeps steps ordered and reviewable so automation accelerates work without shipping unchecked content.",
    architecture:
      "Workflow automation chaining trend intake → AI drafting → channel-specific generation → review/publish stages, with shared structured data between steps.",
    challenges: [
      "Keeping AI drafts useful without removing editorial control.",
      "Adapting one article into social and newsletter formats without sounding duplicated.",
      "Designing failure-safe steps when an upstream API or model call fails.",
    ],
    results:
      "Created a publish-ready content pipeline that reduces repetitive production work while preserving human approval before anything goes live.",
    lessonsLearned: [
      "Content automation should accelerate drafts, not skip editorial standards.",
      "One structured source of truth beats rewriting the same idea per channel.",
      "Explicit publish gates build trust in automated pipelines.",
    ],
    metrics: [
      { label: "Stages", value: "Research → Publish" },
      { label: "Channels", value: "Blog + Social + Email" },
      { label: "Type", value: "AI workflow" },
    ],
    stack: [
      "n8n",
      "AI generation",
      "Google Sheets",
      "Social APIs",
      "Newsletter tooling",
    ],
    links: {},
    cover: {
      alt: "Abstract pipeline graphic for automated blog publishing",
    },
    featured: true,
  },
  {
    slug: "slack-pto-automation",
    title: "Slack PTO automation",
    summary:
      "Employee leave management through Slack slash commands, with ClickUp and Jibble integrations and automated notifications.",
    category: "Automation",
    client: "Teamo",
    year: 2024,
    role: "Software Engineer · Teamo",
    problem:
      "Leave requests lived across chat, trackers, and time tools — easy to miss and hard to keep consistent.",
    approach:
      "Moved PTO requests into Slack commands that update ClickUp and Jibble and notify the right people automatically.",
    outcome:
      "A clearer leave workflow with fewer manual updates and better visibility for the team.",
    overview:
      "Built at Teamo, this automation turns Slack into the front door for PTO requests. Employees submit leave where they already work; the system updates trackers and attendance tools and sends notifications so managers are not chasing status in three places.",
    businessProblem:
      "When leave is requested in chat and recorded later by hand, records drift. Time-tracking and task tools disagree, and managers waste time reconciling what was approved.",
    goals: [
      "Let employees request PTO from Slack with a simple command.",
      "Keep ClickUp and Jibble in sync with the same request.",
      "Notify stakeholders automatically when leave is submitted or updated.",
    ],
    research:
      "I mapped the existing leave path — where requests started, which tools needed updates, and which notifications actually mattered — then designed the smallest reliable automation that covered those systems.",
    roleSummary:
      "As a Software Engineer at Teamo, designed and implemented the Slack command flow, ClickUp/Jibble integrations, notification path, and end-to-end PTO workflow.",
    solution:
      "Slack slash commands collect leave details, then automation creates or updates records in ClickUp and Jibble and sends notifications. The workflow keeps status visible without spreadsheet babysitting.",
    architecture:
      "Slack app commands trigger automation workflows that call ClickUp and Jibble APIs, persist request state, and fan out notifications to the right channels or people.",
    challenges: [
      "Keeping multiple systems consistent when one API call fails mid-flow.",
      "Designing a command UX that is fast for employees but complete for ops.",
      "Avoiding notification noise while still keeping managers informed.",
    ],
    results:
      "Delivered a Slack-first PTO workflow that reduces manual reconciliation between chat, ClickUp, and Jibble.",
    lessonsLearned: [
      "Put automation where people already work — for many teams, that is Slack.",
      "Multi-system workflows need clear failure handling, not just happy paths.",
      "Good notifications are specific; more alerts are not better.",
    ],
    metrics: [
      { label: "Entry point", value: "Slack" },
      { label: "Integrations", value: "ClickUp + Jibble" },
      { label: "Type", value: "Ops automation" },
    ],
    stack: ["Slack", "ClickUp", "Jibble", "n8n", "Webhooks"],
    links: {},
    cover: {
      alt: "Abstract graphic suggesting Slack-based leave automation",
    },
    featured: false,
  },
  {
    slug: "attendance-automation",
    title: "Attendance monitoring automation",
    summary:
      "Employee attendance monitoring with time tracking, Google Sheets reporting, and automated notifications.",
    category: "Automation",
    client: "Teamo",
    year: 2024,
    role: "Software Engineer · Teamo",
    problem:
      "Attendance visibility depended on manual checks and delayed reporting.",
    approach:
      "Connected time-tracking data to Google Sheets reporting and automated alerts when attention was needed.",
    outcome:
      "A lighter attendance monitoring loop with clearer reports and fewer manual follow-ups.",
    overview:
      "Built at Teamo, this automation watches attendance signals, updates shared reporting, and notifies the right people when something needs attention — so managers spend less time assembling status by hand.",
    businessProblem:
      "Without timely attendance visibility, teams discover issues late. Manual spreadsheet updates also create inconsistent reporting from week to week.",
    goals: [
      "Centralise attendance data into Google Sheets reporting.",
      "Reduce manual monitoring overhead.",
      "Notify stakeholders when attendance patterns need attention.",
    ],
    research:
      "I identified which attendance fields mattered for weekly reporting and which alerts were actionable versus noise, then automated only those paths.",
    roleSummary:
      "As a Software Engineer at Teamo, built the time-tracking to Sheets reporting flow and notification rules for attendance monitoring.",
    solution:
      "Automation pulls time-tracking data, writes structured reports to Google Sheets, and sends notifications based on defined conditions so teams get signal without constant manual review.",
    architecture:
      "Scheduled workflows sync attendance data into Google Sheets and evaluate notification rules before sending alerts.",
    challenges: [
      "Defining alerts that are useful without becoming noisy.",
      "Keeping Sheets reports readable as data volume grows.",
      "Handling incomplete or delayed time-tracking records gracefully.",
    ],
    results:
      "Shipped an attendance monitoring automation that improves reporting consistency and reduces manual status gathering.",
    lessonsLearned: [
      "Reporting automations succeed when the sheet layout is designed for humans first.",
      "Alert thresholds matter as much as the integration itself.",
      "Scheduled syncs need clear ownership when source data is late.",
    ],
    metrics: [
      { label: "Reporting", value: "Google Sheets" },
      { label: "Signals", value: "Time tracking" },
      { label: "Type", value: "Ops automation" },
    ],
    stack: ["Time tracking", "Google Sheets", "n8n", "Notifications"],
    links: {},
    cover: {
      alt: "Abstract dashboard motif for attendance reporting automation",
    },
    featured: false,
  },
  {
    slug: "weather-alert-automation",
    title: "Weather alert automation",
    summary:
      "Business weather monitoring with Open-Meteo, scheduled checks, rain alerts, and automated notifications.",
    category: "Automation",
    client: "Teamo",
    year: 2024,
    role: "Software Engineer · Teamo",
    problem:
      "Weather-sensitive operations needed timely rain alerts without someone checking forecasts manually.",
    approach:
      "Scheduled Open-Meteo checks that trigger notifications when rain conditions match the business rules.",
    outcome:
      "A simple monitoring loop that delivers rain alerts automatically so teams can respond sooner.",
    overview:
      "Built at Teamo for weather-sensitive operations. This automation watches forecast data on a schedule and notifies the team when rain conditions matter — without relying on someone remembering to check.",
    businessProblem:
      "Manual forecast checks are easy to skip. When weather affects work plans, late awareness creates avoidable disruption.",
    goals: [
      "Monitor weather on a reliable schedule.",
      "Send rain alerts based on clear business rules.",
      "Keep the system simple enough to maintain.",
    ],
    research:
      "I confirmed which locations and thresholds mattered, then chose Open-Meteo for straightforward forecast access that could run on a schedule without unnecessary complexity.",
    roleSummary:
      "As a Software Engineer at Teamo, implemented scheduled Open-Meteo polling, rain-condition evaluation, and automated notification delivery.",
    solution:
      "A scheduled workflow calls Open-Meteo, evaluates rain conditions against agreed rules, and sends notifications when alerts should fire.",
    architecture:
      "Cron-triggered automation → Open-Meteo API → condition evaluation → notification channel.",
    challenges: [
      "Choosing thresholds that match real operational needs.",
      "Avoiding duplicate alerts for the same weather event.",
      "Keeping the workflow resilient when the API is briefly unavailable.",
    ],
    results:
      "Delivered a lightweight weather monitoring automation that sends rain alerts without manual forecast checking.",
    lessonsLearned: [
      "Operational automations should stay small and obvious to maintain.",
      "Deduplicating alerts is essential for trust.",
      "Schedule plus clear rules beats a complex dashboard for many teams.",
    ],
    metrics: [
      { label: "API", value: "Open-Meteo" },
      { label: "Trigger", value: "Scheduled" },
      { label: "Alert", value: "Rain" },
    ],
    stack: ["Open-Meteo", "n8n", "Notifications", "Scheduled jobs"],
    links: {},
    cover: {
      alt: "Abstract weather monitoring graphic with alert indicators",
    },
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/** Same category first, then shared stack overlap. Excludes the current project. */
export function getRelatedProjects(project: Project, limit = 2): Project[] {
  return projects
    .filter((entry) => entry.slug !== project.slug)
    .map((entry) => {
      const stackOverlap = entry.stack.filter((item) =>
        project.stack.includes(item),
      ).length;
      const categoryBonus = entry.category === project.category ? 3 : 0;
      return { entry, score: categoryBonus + stackOverlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}

export function getProjectCategories(): import("@/types/content").ProjectCategory[] {
  return [
    ...new Set(projects.map((project) => project.category)),
  ] as import("@/types/content").ProjectCategory[];
}

/** Unique technologies across the collection, most used first. */
export function getProjectTechnologies(): string[] {
  const counts = new Map<string, number>();

  for (const project of projects) {
    for (const item of project.stack) {
      counts.set(item, (counts.get(item) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name);
}
