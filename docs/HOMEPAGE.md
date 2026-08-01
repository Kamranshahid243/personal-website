# Homepage UX design

Conversion-first design for `/`. No code — this is the brief the page will be
built from.

The homepage has one job: within about **30 seconds**, make a recruiter, founder
or business owner believe you are an experienced software engineer worth
contacting. Everything else (SEO, aesthetics, blog traffic) is secondary to
that.

Related docs: [`SITE-ARCHITECTURE.md`](./SITE-ARCHITECTURE.md),
[`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).

---

## Who lands here (and what they need)

Three audiences share one page. They skim differently; the section order has to
satisfy the impatient one first.

| Visitor | Arrives asking | Will leave if… | Needs to see early |
| --- | --- | --- | --- |
| **Recruiter / hiring manager** | “Can this person do the job we are filling?” | Role is vague, or the work looks junior / generic | Clear role, seniority signal, real outcomes, stack |
| **Founder / product lead** | “Can they own a painful problem and ship?” | Only tools listed, no business results | Outcomes, scope of ownership, availability |
| **Business owner / freelance buyer** | “Is this a safe hire for my budget and timeline?” | No sense of engagement shape or response time | Who you help, how working together works, a clear ask |

Design for the **15-second skeptic**. Anyone willing to read for two minutes
will get more proof further down; the skeptic never will if the top fails.

---

## The five questions — and where they get answered

| Question | Primary answer lives in | Reinforced in |
| --- | --- | --- |
| **Who am I?** | 1 · Hero (name, role, one-line claim) | 5 · About |
| **What do I build?** | 1 · Hero (claim) + 3 · Selected work | 4 · How I work |
| **Who do I help?** | 2 · Positioning | 4 · How I work |
| **Why trust me?** | 3 · Selected work (outcomes) | 5 · About, 6 · Writing |
| **Why contact me?** | 1 · Hero CTA + availability | 4 · engagement shape, 7 · Final CTA |

If a section does not move at least one of these answers forward, it does not
belong on the homepage.

---

## First 30 seconds (the critical path)

Think in attention beats, not in “above the fold” as a single screenshot. On a
laptop the first viewport is roughly the hero; on a phone the same story is
taller. The **order of information** matters more than what fits on one screen.

| Time | Visitor does | Page must have already answered |
| --- | --- | --- |
| **0–5s** | Reads name, role, headline; notices availability and primary button | Who you are; what you do at the level of a claim; that you are reachable |
| **5–15s** | Decides “is this for people like me?”; starts scanning proof | Who you help; what kind of work (from section intros / first project titles) |
| **15–30s** | Skims 1–2 project outcomes for credibility | Concrete results (metrics + problem context), not a tool list |

If at 30 seconds they only know your stack, the page has failed. Stacks are
commodities; **outcomes under constraints** are not.

---

## Section order (conversion sequence)

Seven sections. No more on v1. Each has a single job.

```
1. Hero                 Orient + claim + ask
2. Positioning          Who I help + what problems
3. Selected work        Proof (trust)
4. How I work           Why contact / engagement shape
5. About                Depth of “who” + seniority
6. Writing              Taste + long-term trust (optional weight)
7. Final CTA            Close
```

### Why this order (and not others)

**Claim before credentials.** Leading with a long bio or a logo wall asks for
trust before giving a reason to care. Hero states the claim; work proves it;
about deepens it.

**Proof before process.** “How I work” means nothing until they believe you
have shipped something real. Selected work comes first.

**Audience before case studies.** A one-line “who I help” between hero and work
lets the right visitors lean in and the wrong ones self-select out — which
improves conversion quality, not just click rate.

**Ask early and late.** The primary CTA appears in the hero (for people already
convinced from a referral) and again at the end (for people who needed the
full scroll). One ask in the middle is optional; three identical banners is
noise.

**Writing is last among content blocks.** Posts build inbound and signal taste;
they rarely close a hire in the first visit. They must not push proof below
the fold on a large screen.

**What we are not putting on the homepage**

| Tempting block | Why it is out |
| --- | --- |
| Animated skill clouds / icon rows of 12 frameworks | Looks like every template; proves nothing |
| Stat strip in the hero (“50+ projects”, “10 years”) | Easy to fake; burns the hero budget; put one real metric inside a case study instead |
| Client logo wall without outcomes | Logos without context are borrowed status; outcomes with named contexts beat them |
| Full résumé timeline | Belongs on About depth or `/projects` narrative; a short highlight in §5 is enough |
| Contact form embedded mid-page | v1 CTA is mailto/calendar — lower friction, no form abandonment on first visit |
| Testimonials before any work shown | Quotes without proof read as invented; if testimonials exist later, place them after selected work |

---

## Section-by-section brief

### 1 · Hero

**Job:** Orient in one glance. Make the right person think “this might be who I
need” and give them something to do.

**Answers:** Who am I? What do I build? (at claim level) · starts “Why contact?”

**Contains (and nothing else in the first viewport)**

- Availability signal (open / limited) — reduces uncertainty about timing
- **Name as a brand-level signal** (not only in the nav)
- Role line (e.g. Software Engineer) subordinate to the claim, not competing
  with it
- **One headline** — a specific claim about the value you create, not a job
  title restated. Prefer outcomes and verbs over adjectives (“I build…” /
  “I help… ship…”), not “Passionate full-stack developer”
- **One supporting sentence** — who you do it for + in what context (bridges
  into §2)
- **CTA group**
  - Primary: Get in touch (mailto or calendar)
  - Secondary: View projects → `/projects`
- Optional: one quiet trust cue (e.g. “Previously at …” single line, or a
  single metric pulled from your strongest project) — **not** a row of stats

**Does not contain:** project grids, blog links, stack icons, long bio,
testimonials, multiple headlines.

**Why it exists:** Referrals and cold traffic both land cold. Without a clear
claim and an ask, the rest of the page has no frame. The secondary CTA catches
people who want proof before conversation — the correct behaviour, not a
failed conversion.

**Success check:** Cover the nav with your hand. The viewport still says who
this is and what they do. If it could be anyone’s site, the hero is too weak.

---

### 2 · Positioning (“Who I help”)

**Job:** Let visitors self-qualify in one short block.

**Answers:** Who do I help? · sharpens What do I build?

**Contains**

- Short section heading (e.g. “Who I work with”)
- 2–3 audience lines or cards max — each pairing a **person** with a
  **problem type**
  - Example shape: “Seed–Series B product teams who need a product-minded
    engineer to own a surface end to end”
  - Example shape: “Hiring managers filling a senior/staff web role where
    shipping quality and mentorship both matter”
- Explicit non-goals are useful if you get the wrong leads (“I don’t take
  WordPress brochure sites”) — one line, not a rant

**Why it exists:** Proof without relevance still bounces. A founder building a
native iOS app should realise quickly you are (or are not) the web product
person. Positioning also feeds the hero’s supporting sentence so the page does
not repeat itself — §1 is the claim; §2 is the audience.

**Keep it short.** If this section needs scrolling on mobile, it is too long.
Three tight lines beat six polite ones.

---

### 3 · Selected work

**Job:** Create trust through evidence. This is the conversion engine of the
page.

**Answers:** Why should someone trust me? · proves What do I build?

**Contains**

- Section heading + one line on selection criteria (“Selected projects —
  outcome-led, not a complete history”)
- **2–3 featured projects** (not five). Strongest first.
  Each card already carries: title (outcome-oriented), summary, primary
  metric, stack, link to `/projects/[slug]`
- Link to full index: “See all projects” → `/projects`

**Why it exists:** Claims are cheap; constrained results are not. Recruiters
look for seniority and taste; founders look for ownership and business
impact. A metric next to a real problem (“checkout LCP −62%”) does both jobs
faster than a paragraph of responsibilities.

**Why only 2–3:** A long grid signals “I need to show everything.” A short,
ranked list signals taste. Detail pages exist for depth; the homepage only
has to win the click or the email.

**Ordering rule:** Best outcome first — not most recent, not most famous
employer. The first card is doing disproportionate work in the 15–30s window.

---

### 4 · How I work

**Job:** Reduce risk for the people about to reach out. Turn interest into a
concrete next step.

**Answers:** Why should they contact me? · supports Who do I help?

**Contains**

- Heading (e.g. “Working together” / “How engagement works”)
- 3 items max, each one sentence — pick the frame that matches how you
  actually sell:
  - **For freelance-leaning:** what you take on (audit / build / embed),
    typical timeline, what they get at the end
  - **For full-time-leaning:** the environments where you create the most
    leverage, the level you operate at, what “good” looks like after 90 days
  - **Hybrid (recommended for this site):** one block that covers both —
    “Open to full-time roles and focused freelance engagements” plus what
    good looks like in each
- Practical friction-removers: response time, timezone, async-friendly,
  “what to include in the first email”
- Soft CTA repeating the primary ask (text link or button — same destination
  as the hero)

**Why it exists:** Many visitors believe you are competent after §3 but still
hesitate: *Will this be a nightmare to start? Do they even take freelance? Are
they going to ghost my email?* This section answers process anxiety. It is not
a services catalogue (no pricing table required on the homepage); it is a
clarity block.

**Why after work, not before:** Process claims without proof feel like
marketing. After two case study cards, the same words read as operational
detail.

---

### 5 · About

**Job:** Make “who” three-dimensional once they already care.

**Answers:** Who am I? · deepens Why trust me?

**Contains**

- Short heading (your name or “About”)
- **One short paragraph** (≈60–90 words): trajectory, what you optimise for,
  what you care about in craft — human, specific, no clichés
- Compact credibility row — choose one pattern, not all:
  - 2–3 experience highlights (role · company · one outcome each), or
  - “Previously” line with companies/products, or
  - Focus areas as skill badges (few, honest — not 20 chips)
- Links: LinkedIn / GitHub (via existing social links), optional résumé PDF

**Why it exists:** Work shows what you shipped; about shows judgment and
seniority. Recruiters especially look for narrative coherence (“staff-level
scope”, “led design system across three teams”). Founders look for taste and
communication. Neither wants your full CV on the homepage — `/projects` and
LinkedIn absorb depth.

**Why so late:** About-before-proof is the default portfolio mistake. By §5
the visitor has context; the same bio now confirms rather than introduces.

---

### 6 · Writing

**Job:** Signal how you think; feed SEO and return visits. Not the closer.

**Answers:** Soft trust (taste, clarity, depth)

**Contains**

- Heading + one line (“Notes on building for the web” — not “My blog”)
- **2–3 recent posts** via `BlogCard`
- Link to `/blog`

**Why it exists:** Strong writing separates engineers who can communicate from
those who only ticket-swipe. For some founders it is decisive; for most
recruiters it is a bonus. It also gives the homepage a living surface so the
page does not feel frozen after projects are published.

**Why optional in weight:** If you have fewer than two solid posts, **omit the
section entirely** until you do. An empty or padded blog row damages trust.
Never place writing above selected work.

---

### 7 · Final CTA

**Job:** Close the scroll with a single, calm ask.

**Answers:** Why contact me? (decisive)

**Contains**

- Availability badge again (state may be the deciding factor)
- One headline — direct, not clever (“Have a role or project in mind?”)
- One supporting line — response expectation + what happens next
  (“I usually reply within one business day. Include timeline and context if
  you have them.”)
- Primary CTA (same destination as hero)
- Optional secondary: View projects

**Why it exists:** People who scrolled this far are warm. Make the next action
obvious without introducing new information. No new social proof here — if
they do not trust you yet, another paragraph will not fix it.

**Why it is separate from the hero CTA:** Different emotional moment. Hero =
“I’m interested.” Footer CTA = “I’ve seen enough.” Same URL; different copy is
fine.

---

## Conversion mechanics (across the page)

### Primary CTA

One destination everywhere: `mailto:` with a suggested subject, **or** a
calendar link if you truly want booked calls. Do not split the page between
“email me” and “book me” unless one is clearly primary.

Suggested mailto body prompt (shown near CTAs in §4 or §7, not as a form):

> Role or project · timeline · what success looks like

### Secondary CTA

Always “View projects” (or a specific featured project). Never a second
contact method competing for the same intent.

### Sticky nav

The marketing layout already keeps Get in touch available while scrolling.
Homepage sections should not fight it with floating action buttons.

### Scroll depth targets (design intent)

| Depth | Should have achieved |
| --- | --- |
| Hero | Identity + claim + path to act or to proof |
| Through §3 | Belief that you ship real outcomes |
| Through §5 | Belief that you are the right *seniority / fit* |
| §7 | Action taken or intentionally deferred |

---

## Content checklist (fill before build)

Write these in a doc or in `siteConfig` / data — not in JSX first.

| # | Content | Owner field (approx.) |
| --- | --- | --- |
| 1 | Headline claim (specific, outcome-leaning) | `siteConfig.tagline` (revise until sharp) |
| 2 | Hero supporting sentence (audience + context) | new home copy constant |
| 3 | 2–3 “who I help” lines | home copy |
| 4 | 2–3 featured projects with real metrics | `src/data/projects.ts` (`featured: true`) |
| 5 | How-I-work bullets + response time | home copy + `siteConfig.timezone` |
| 6 | About paragraph + 2–3 highlights | home copy + `experience` slice |
| 7 | Final CTA headline + supporting line | home copy / `CtaSection` props |
| 8 | Working mailto or calendar URL | `siteConfig.email` / `links.calendar` |

**Do not build the homepage until 1, 3, 4, and 8 are real.** A polished layout
with placeholder outcomes trains visitors to distrust the finished site.

---

## Visual & interaction constraints (homepage-specific)

Aligned with the design system; called out here so implementation does not
reintroduce template patterns.

- **One composition in the hero** — not a dashboard. No cards in the hero.
- **No stat strip, logo cloud, or pill clusters in §1.**
- **Selected work** may use cards — they are the interaction surface for
  opening a case study.
- **Motion:** subtle entrance on sections is enough; do not animate the hero
  claim letter-by-letter. Availability pulse is already enough signal.
- **Atmosphere:** `AnimatedBackground` only if it stays behind type and does
  not compete with the claim.
- **Mobile:** Hero CTA stacks full-width; project cards become a single
  column; positioning lines stack, not a 3-column feature grid that shrinks
  to unreadability.

---

## Mapping to components (for when you implement)

| Section | Likely building blocks |
| --- | --- |
| Hero | `Section`, `Container`, `AvailabilityBadge`, `Display`, `Lead`, `Button`, optional `AnimatedBackground` |
| Positioning | `SectionHeading` + simple list or three text blocks (avoid icon-feature grids) |
| Selected work | `SectionHeading`, `ProjectCard` × 2–3, `Link` to `/projects` |
| How I work | `SectionHeading` + short list; optional secondary `Button` |
| About | `SectionHeading`, short `Text`, optional `ExperienceCard` × 2 or `SkillBadge`s, `SocialLinks` |
| Writing | `SectionHeading`, `BlogCard` × 2–3, `Link` to `/blog` |
| Final CTA | Existing `CtaSection` |

No new route. No contact page. Home absorbs about + offer framing as designed
in the site architecture.

---

## What “done” looks like (UX acceptance)

A stranger who fits your ICP can, without clicking anything else:

1. Say your name and what you do in one sentence.
2. Say whether you are for them (audience fit).
3. Cite one concrete outcome they saw.
4. Know how to reach you and what happens after they do.

If any of those four fail in a hallway test, fix copy or section order before
adding more sections.

---

## Implementation order (when you say go)

1. Lock copy for hero claim, positioning lines, and CTA (content checklist).
2. Ensure 2–3 featured projects have honest metrics.
3. Build sections top-down in this document’s order.
4. Hallway-test the 30-second pass before polishing animation or writing.
