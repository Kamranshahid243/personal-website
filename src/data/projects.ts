import type { Project, ProjectCategory } from "@/types/content";

/**
 * Case studies, in display order.
 *
 * Three to five entries, strongest first. A long list reads as a job board
 * history; a short curated one reads as taste.
 *
 * Replace sample entries with real engagements before the first deploy.
 */
export const projects: Project[] = [
  {
    slug: "checkout-performance",
    title: "Cut checkout LCP by 62%",
    summary:
      "Rebuilt a multi-step checkout for a DTC brand so the critical path stopped competing with third-party scripts.",
    category: "Performance",
    client: "Northline",
    year: 2025,
    role: "Lead frontend",
    problem:
      "Mobile conversion was falling because checkout took four seconds to become interactive.",
    approach:
      "Split the critical path, deferred non-essential analytics, and streamed above-the-fold content.",
    outcome: "LCP dropped from 4.1s to 1.6s. Checkout completion rose 18%.",
    overview:
      "Northline’s checkout was technically “working” but commercially broken on mobile. This engagement focused on the critical rendering path — not a visual redesign — so shoppers could complete payment before frustration set in.",
    businessProblem:
      "Paid traffic was converting at a lower rate on phones than on desktop. Product analytics pointed at checkout, where LCP hovered around four seconds and third-party tags competed with the payment form for the main thread. Every hundred milliseconds of delay was measurable revenue left on the table.",
    goals: [
      "Bring mobile LCP under two seconds on a mid-tier device.",
      "Raise checkout completion without changing pricing or promos.",
      "Leave a measurement harness the team could keep after handoff.",
    ],
    research:
      "I paired session recordings with WebPageTest and field RUM to separate perception from lab numbers. The main-thread long tasks clustered around tag manager bootstrap and a synchronous address validation call. Stakeholder interviews with marketing confirmed which pixels were contractual versus habitual — that distinction became the negotiation script for deferral.",
    roleSummary:
      "Owned the performance diagnosis, architecture changes, and rollout plan. Partnered with marketing on tag governance and with design on progressive disclosure of secondary fields.",
    solution:
      "Separated the payment shell from enrichment scripts, streamed the first step, and gated analytics behind interaction. Prefetched step-two data after first paint so the journey felt continuous without blocking interactivity.",
    architecture:
      "Next.js App Router with edge-rendered checkout shell, client islands only where forms required state, and a Playwright suite asserting LCP budgets on every PR. Tag manager loads deferred until after `requestIdleCallback`, with a documented allow-list for anything that still needs early execution.",
    challenges: [
      "Marketing depended on pixels that historically loaded in `<head>`.",
      "Legacy address autocomplete assumed a monolithic page lifecycle.",
      "Staging traffic did not match real device + network distributions.",
    ],
    results:
      "LCP fell from 4.1s to 1.6s (−62%). Checkout completion rose 18% on mobile within four weeks. The team kept a Lighthouse CI gate so the win did not regress on the next campaign launch.",
    lessonsLearned: [
      "Conversion work is often performance work wearing a product hat.",
      "Tag governance needs an owner, not a spreadsheet.",
      "Budget tests in CI beat one-off audits after launch.",
    ],
    metrics: [
      { label: "LCP", value: "−62%" },
      { label: "Completion", value: "+18%" },
      { label: "INP", value: "−41%" },
    ],
    stack: ["Next.js", "TypeScript", "Edge", "Playwright"],
    links: {},
    cover: { alt: "Abstract visualization of a fast checkout critical path" },
    screenshots: [
      {
        alt: "Mobile checkout first step after the critical-path rebuild",
        caption: "Step one ships as a streamed shell — payment UI before enrichment.",
      },
      {
        alt: "Performance budget dashboard showing LCP under two seconds",
        caption: "CI budgets made the win durable past the initial launch week.",
      },
    ],
    featured: true,
  },
  {
    slug: "design-system",
    title: "Shipped a design system in six weeks",
    summary:
      "Tokenised a fragmented component library so three product teams could ship UI without reinventing spacing.",
    category: "Design System",
    client: "Cascade",
    year: 2024,
    role: "Staff engineer",
    problem: "Four products, four button styles, and no shared primitives.",
    approach:
      "OKLCH tokens, a typed component layer, and a living reference page every PR had to pass.",
    outcome:
      "New screens dropped from days to hours; visual regressions fell by half.",
    overview:
      "Cascade had grown through acquisition. Each product looked related in pitch decks and unrelated in production. The goal was a shared foundation that designers and engineers could trust without slowing shipping.",
    businessProblem:
      "Product velocity was capped by UI inconsistency: every new surface restarted spacing, type, and control debates. Visual QA caught the same regressions across four codebases, and brand trust eroded as customers moved between products.",
    goals: [
      "One token source for color, type, space, and radius.",
      "A typed React layer covering the top twenty controls.",
      "Adoption by three product teams within a quarter.",
    ],
    research:
      "I audited the four codebases for control inventory and drift, then ran design workshops to map Figma variables to semantic roles rather than raw hex values. Engineer interviews surfaced the real adoption blockers: unclear ownership, fear of visual regressions, and no migration path for “almost shared” components.",
    roleSummary:
      "Led architecture and the first component set, co-designed tokens with design, and set the contribution model so teams could extend without forking.",
    solution:
      "Introduced semantic OKLCH tokens, rebuilt primitives on Radix + Tailwind, and published a living reference with Chromatic snapshots. Migration guides shipped with each primitive so adoption was incremental.",
    architecture:
      "Monorepo package with CSS tokens, CVA variants, and Storybook/Chromatic. Products consume via a versioned package; breaking changes require a migration note and a codemod when feasible.",
    challenges: [
      "Existing “almost shared” components had subtle behavioural differences.",
      "Dark mode had never been specified — only approximated per app.",
      "Designers needed confidence the code matched Figma variables.",
    ],
    results:
      "Time-to-UI for new screens dropped ~70%. Visual regressions caught in CI fell by half. Three teams shipped on the system inside six weeks of the first release.",
    lessonsLearned: [
      "Tokens before components — otherwise you encode drift.",
      "A living reference beats a PDF style guide.",
      "Adoption needs migration paths, not mandates.",
    ],
    metrics: [
      { label: "Time-to-UI", value: "−70%" },
      { label: "Regressions", value: "−50%" },
    ],
    stack: ["React", "Tailwind", "Radix", "Chromatic"],
    links: {},
    cover: { alt: "Abstract composition of design tokens and UI primitives" },
    screenshots: [
      {
        alt: "Design system reference page showing button and input primitives",
        caption: "The living reference became the contract between design and engineering.",
      },
      {
        alt: "Token documentation for color and spacing scales",
        caption: "Semantic OKLCH tokens replaced per-product hex tables.",
      },
    ],
    featured: true,
  },
  {
    slug: "ops-console",
    title: "Unified ops console for support teams",
    summary:
      "Replaced three internal tools with one role-aware console so support could resolve tickets without context-switching.",
    category: "Platform",
    client: "Harbor",
    year: 2025,
    role: "Full-stack lead",
    problem:
      "Agents juggled three dashboards to answer a single customer question.",
    approach:
      "Modeled a single customer graph, then built views by role instead of by microservice.",
    outcome:
      "Median handle time dropped 27%. Training time for new agents fell from two weeks to five days.",
    overview:
      "Harbor’s support org had outgrown a patchwork of admin UIs. Each backend team shipped its own console; agents paid the integration tax on every ticket.",
    businessProblem:
      "Average handle time was rising with catalog complexity. Leadership could not hire fast enough to offset tool friction, and CSAT was sliding on complex orders that required hopping between billing, logistics, and identity systems.",
    goals: [
      "One authenticated console for the top twenty support workflows.",
      "Role-aware views so agents only see what they can act on.",
      "Audit trail for every mutation touching customer data.",
    ],
    research:
      "Shadowed agents for two days and mapped every tab switch on high-severity tickets. The pattern was consistent: identity in tool A, order state in tool B, refund eligibility in tool C. Workshops with support leads ranked the top twenty workflows by volume and pain; that list — not the microservice map — drove the information architecture.",
    roleSummary:
      "Owned product discovery with support leads, API contracts with platform, and the React application. Mentored two engineers through the first production release.",
    solution:
      "Introduced a BFF that aggregates customer, order, and billing reads, with optimistic UI for safe mutations and explicit confirmation for irreversible ones. Keyboard-first patterns matched how agents already worked.",
    architecture:
      "Next.js server components for initial reads, typed routes to the BFF, Redis-backed session cache, and OpenTelemetry traces tied to ticket IDs for support-engineering handoff.",
    challenges: [
      "Source systems disagreed on what “customer” meant.",
      "Write paths had inconsistent idempotency guarantees.",
      "Agents needed the old tools as fallback during rollout.",
    ],
    results:
      "Median handle time −27%. New-hire ramp from two weeks to five days. Ticket reopen rate on billing issues down 14%.",
    lessonsLearned: [
      "Internal tools deserve the same UX budget as customer products.",
      "A BFF is cheaper than teaching every UI about every service.",
      "Ship beside the old tool until trust is earned.",
    ],
    metrics: [
      { label: "Handle time", value: "−27%" },
      { label: "Ramp time", value: "−65%" },
      { label: "Reopens", value: "−14%" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    links: {},
    cover: { alt: "Abstract dashboard layout suggesting an operations console" },
    screenshots: [
      {
        alt: "Unified customer timeline in the operations console",
        caption: "One customer graph replaced three disconnected admin UIs.",
      },
      {
        alt: "Role-aware action panel for refunds and order edits",
        caption: "Permissions shaped the UI — agents only saw actions they could take.",
      },
    ],
    featured: true,
  },
  {
    slug: "release-automation",
    title: "Cut release toil with guarded automation",
    summary:
      "Automated preview environments and progressive delivery so engineers stopped babysitting Friday deploys.",
    category: "Developer Tools",
    client: "Personal project",
    year: 2024,
    role: "Solo engineer",
    problem:
      "Releases depended on a tribal checklist and failed quietly in staging.",
    approach:
      "Codified the checklist as pipelines with preview URLs, canaries, and one-click rollback.",
    outcome:
      "Production deploys became routine. Mean time to recover dropped from hours to minutes.",
    overview:
      "A side project that became a reusable release kit: the same pain I saw on client teams — fragile staging, manual smoke tests, and heroics at deploy time.",
    businessProblem:
      "Shipping velocity stalled not on feature work but on release fear. Staging drifted from production, and rollbacks required the one person who remembered the runbook. Fridays became reserved for deploy babysitting instead of product work.",
    goals: [
      "Ephemeral preview environments per pull request.",
      "Canary deploys with automatic halt on error budget burn.",
      "Documented rollback that any on-call engineer could run.",
    ],
    research:
      "I collected incident notes from the last year of failed deploys and tagged each by root cause: drift, missing smoke coverage, or irreversible migrations. Pairing with on-call engineers clarified the real runbook — the steps people actually took — versus the wiki page nobody trusted.",
    roleSummary:
      "Designed and implemented the full pipeline, from GitHub Actions to observability hooks, and wrote the operator guide.",
    solution:
      "PR previews spun from the same container image as production. Canaries shifted 5% → 25% → 100% traffic with health gates. Rollback is a single workflow dispatch that re-points the live slot.",
    architecture:
      "GitHub Actions + OIDC to cloud, Terraform for preview DNS, OpenTelemetry SLOs as deploy gates, and Slack notifications that link straight to the failing trace.",
    challenges: [
      "Preview cost needed hard TTLs and idle shutdown.",
      "Flaky e2e tests would have blocked every merge.",
      "Secrets per environment had to stay out of logs.",
    ],
    results:
      "MTTR from hours to under ten minutes on the pilot service. Engineers stopped reserving Friday afternoons for deploys.",
    lessonsLearned: [
      "Automate the runbook before you automate the happy path.",
      "Flaky tests are a release-blocker bug, not noise.",
      "Previews only help if they match production topology closely enough.",
    ],
    metrics: [
      { label: "MTTR", value: "−90%" },
      { label: "Deploy fear", value: "Gone" },
    ],
    stack: ["GitHub Actions", "TypeScript", "Terraform", "OpenTelemetry"],
    links: {},
    cover: { alt: "Abstract pipeline graphic suggesting automated releases" },
    screenshots: [
      {
        alt: "Pull request preview environment status checks",
        caption: "Every PR earned a production-like preview with the same image.",
      },
      {
        alt: "Canary rollout graph with automatic halt on SLO burn",
        caption: "Progressive delivery made rollback a workflow, not a hero moment.",
      },
    ],
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

export function getProjectCategories(): ProjectCategory[] {
  return [
    ...new Set(projects.map((project) => project.category)),
  ] as ProjectCategory[];
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
