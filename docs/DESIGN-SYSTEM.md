# Design system

Every value the site is allowed to use, and every component built from them.

The live reference is at [`/design`](http://localhost:3000/design) — run
`pnpm dev` and open it. That page renders every token and primitive in both
themes and is the fastest way to review a change before it reaches a real page.

---

## Principles

**Premium comes from restraint.** A near-monochrome palette with one accent
hue, four font weights, four elevation steps. Every constraint here is
deliberate: a system with fewer choices is one where the wrong choice is harder
to make, and a bright multi-colour palette is far easier to make look cheap
than a disciplined grey one.

**Spacious is a rhythm, not a size.** Spaciousness never comes from making one
thing bigger. It comes from a consistent, generous scale applied at every level
of the hierarchy — section, block, stack — so the eye can find the structure
without reading anything.

**Consistency should be structural, not remembered.** A button and a text input
are the same height because they read the same `--control-h-md` token, not
because someone wrote `h-10` twice. Anything held together by discipline alone
eventually drifts; anything held together by a shared token cannot.

**Nothing is styled twice.** If a value appears in two components it is a
token. If a behaviour appears in two components it is a utility. Concretely:
every focus ring on the site is the `focus-ring` utility, so the focus
treatment can be changed globally in four lines.

**Accessible by default, not by review.** Focus rings, reduced-motion
handling and ARIA wiring are built into the primitives, so doing the right
thing takes no extra effort and forgetting is hard.

---

## The three tiers

Code may only reach for the highest tier that can express what it needs.

| Tier          | Example             | Defined in             | Used by       |
| ------------- | ------------------- | ---------------------- | ------------- |
| 1 · Palette   | `--color-brand-500` | `tokens/color.css`     | Tier 2 only   |
| 2 · Semantic  | `--color-surface`   | `tokens/*.css`         | Components    |
| 3 · Component | `--btn-h`           | `tokens/component.css` | One component |

The middle tier is what makes theming work. `bg-surface-raised` keeps meaning
the right thing in both themes, while `bg-neutral-50` would need a `dark:`
override every single time it is written. **Almost every `dark:` class in a
codebase is a missing semantic token.**

A page should never use tier 1 or tier 3. If a page needs a value that tier 2
does not have, that is a signal the system is missing a token — add it here
rather than working around it inline.

---

## Where things live

```
src/styles/
├── globals.css            Entry point. Also holds the shadcn-owned colour block.
├── tokens/
│   ├── color.css          Palette, semantic roles, light and dark themes
│   ├── typography.css     Families, weights, tracking, leading, the type scale
│   ├── spacing.css        Spacing scale, containers, breakpoints, z-index
│   ├── radius.css         One base radius and its derived steps
│   ├── elevation.css      Theme-aware shadows
│   ├── motion.css         Durations, easings, keyframes
│   └── component.css      Control, field, card, tag, icon, focus tokens
├── base.css               Element defaults
├── utilities.css          Shared @utility definitions
└── prose.css              Long-form MDX article styles
```

Tokens declared inside `@theme` become Tailwind utilities automatically:
`--text-display-lg` is usable as `text-display-lg`, `--shadow-raised` as
`shadow-raised`, `--spacing-section` as `py-section`.

Tier 3 tokens are plain `:root` custom properties instead, because they are
consumed by one component through `h-(--btn-h)` and have no business being a
global utility.

---

## Colour

A near-monochrome system. `brand` is the only hue, and it carries every call to
action.

| Role                                                             | Meaning                                  |
| ---------------------------------------------------------------- | ---------------------------------------- |
| `surface`, `surface-sunken`, `surface-raised`, `surface-overlay` | Backgrounds, back to front               |
| `text`, `text-muted`, `text-subtle`, `text-inverse`              | Descending emphasis                      |
| `line`, `line-strong`                                            | Hairlines; `strong` for interactive      |
| `brand-50` … `brand-950`                                         | The accent ramp                          |
| `success`, `warning`, `danger`, `info`                           | Status, each with `-surface` and `-line` |

Everything is OKLCH, so lightness steps are perceptually even and the dark
theme is a genuine inversion rather than a muddy approximation.

Two things worth knowing about the themes:

- **Light** raised surfaces stay white and are separated by border and shadow,
  not by fill. Tinting cards grey is the fastest way to make a bright layout
  look muddy.
- **Dark** is not an inversion. The page sits at ~0.145L rather than black,
  because pure black crushes shadows and makes text vibrate. Surfaces get
  _lighter_ with elevation, since in the dark it is light, not shadow, that
  reads as depth. Status hues also drop chroma and gain lightness — a saturated
  mid-tone that reads as confident on white looks radioactive on near-black.

---

## Typography

A semantic scale sits alongside Tailwind's numeric one:

| Step                              | Use                                 |
| --------------------------------- | ----------------------------------- |
| `display-xl` … `display-sm`       | Hero and major section headlines    |
| `heading-lg` … `heading-sm`       | Subsections and card titles         |
| `body-lg` / `body-md` / `body-sm` | Standfirst, default copy, secondary |
| `caption`                         | Helper text, metadata               |
| `eyebrow`                         | Uppercase label above a heading     |

Each step carries its own line height, letter spacing and weight. That matters
more than it sounds: optical tracking is size-dependent, and `text-display-xl`
shipping its own -0.038em is why headlines look typeset rather than merely
large. Display sizes are fluid `clamp()`, so they scale continuously with no
breakpoint jumps; body sizes are fixed, because reading size should not depend
on window width.

**Use the components, not the classes.** `<Display>`, `<Heading>`, `<Text>`,
`<Lead>` and `<Eyebrow>` in `components/ui/typography.tsx` are what pages
should reach for. Semantic level and visual size are separate props throughout:

```tsx
<Heading as="h2" size="sm">
  Still an h2 in the outline
</Heading>
```

Heading order is an accessibility requirement — a screen reader user navigates
by it — and must never be bent to make something look right.

---

## Space

Four levels, largest to smallest. A component should only ever use the one that
matches its scope.

| Token                   | Scope                                           |
| ----------------------- | ----------------------------------------------- |
| `section`               | Between major page sections (also `-sm`, `-lg`) |
| `block`                 | Between blocks inside a section                 |
| `stack-xs` … `stack-lg` | Between elements inside a block                 |
| `gutter`                | Horizontal page margin                          |

Section and gutter are fluid, so the page breathes more on a large display
instead of leaving one tall column of white. Stack values are fixed, because
the relationship between a heading and its paragraph should not change with
window width.

Sections never set their own padding — they use `<Section spacing="lg">`.
Containers never set their own width — they use `<Container width="prose">`.

---

## Motion

Short, decelerating, never bouncy. Motion should confirm an action, not perform
one.

| Token     | Value | Use                       |
| --------- | ----- | ------------------------- |
| `instant` | 100ms | Colour-only state changes |
| `fast`    | 150ms | Hover, focus, press       |
| `base`    | 250ms | Small layout changes      |
| `slow`    | 400ms | Entrances                 |
| `slower`  | 700ms | Scroll reveals            |

Use the `transition-ui`, `transition-ui-base` and `transition-ui-slow`
utilities rather than writing transitions by hand. They apply a fixed property
list — never `transition-all`, which makes the browser watch every property and
animates layout by accident.

Framer Motion values in `src/lib/motion.ts` mirror these exactly, so a
JS-driven entrance and a CSS hover on the same element agree.

`prefers-reduced-motion` is handled in two places: globally in `base.css`,
which collapses all durations, and inside the `Reveal` and `Stagger` wrappers,
which skip the transform entirely. Degrading to a faster animation is not the
same thing as respecting the preference.

---

## Interaction states

Consistency of state is what makes an interface feel built rather than
assembled.

**Hover** — surfaces shift by `--hover-tint`; cards lift by `--hover-lift` via
the `hover-lift` utility. One value each, so every lift matches.

**Focus** — one ring for the whole site, from the `focus-ring` utility.
`:focus-visible`, so it appears for keyboard users without punishing mouse
users. `base.css` also applies a global fallback, so no interactive element can
ship without a visible focus indicator.

**Active** — a 1px downward translate. Enough to feel physical, not cartoonish.

**Disabled** — 50% opacity, pointer events off, `not-allowed` cursor.

**Loading** — `aria-busy` on the control drives both the dimming and the screen
reader announcement, so the visual and non-visual states cannot desynchronise.
A `<Spinner>` is for an action the visitor initiated; a `<Skeleton>` is for
content that has not arrived yet.

---

## Components

All in `src/components/ui`. Variants are semantic rather than visual — a
`primary` button means "the one action we want taken on this screen", so there
should only ever be one on a page.

| Component             | Notes                                                              |
| --------------------- | ------------------------------------------------------------------ |
| `Button`              | 6 variants × 7 sizes, all as token assignments                     |
| `Link`                | Handles internal vs external, `rel`, and the out-of-site indicator |
| `Card`                | One fluid `--card-padding` feeds every slot                        |
| `Badge`               | State. Never interactive                                           |
| `Tag`                 | Taxonomy. Often interactive — deliberately looks different         |
| `Field` et al.        | Generates ids and ARIA wiring so accessible fields are the default |
| `Input`, `Textarea`   | Heights from the shared control tokens                             |
| `Icon`                | Normalises Lucide to token sizes and a 1.75 stroke                 |
| `Spinner`, `Skeleton` | Loading states                                                     |
| `Typography`          | `Display`, `Heading`, `Text`, `Lead`, `Eyebrow`                    |

### On the shadcn/ui primitives

Files in `components/ui` start life as shadcn output. Their **structure and
behaviour stay upstream** — the Radix wiring, the `data-slot` attributes, the
`asChild` support — so an accessibility fix can be pulled in by re-running the
CLI and reading the diff.

Their **variant tables are ours**, and are bound to the design tokens. The
shadcn Nova preset is tuned for dashboard density (a 32px default button); this
site needs 40px. That retune belongs in the variant table, not in a `className`
on every call site.

Practical consequence: `pnpm ui:add <name> --overwrite` will discard local
styling for that component. Re-apply the tokens afterwards, or add new
components without `--overwrite`.

---

## Adding to the system

1. **Check it does not already exist.** Open `/design`. Most "new" needs are an
   existing token under a different name.
2. **Add the token first**, in the right `tokens/` file, with a comment
   explaining the decision rather than restating the value.
3. **Then use it** in a component. If a value ends up in two components, it was
   a token; if a behaviour does, it was a utility.
4. **Never style in a page.** Pages compose components. A raw `text-2xl` or
   `p-7` in a page is the system failing, and the fix is a token, not an
   exception.
5. **Add it to `/design`**, so the next person can find it.
