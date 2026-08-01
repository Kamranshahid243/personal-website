import {
  ArrowRight,
  Check,
  Code,
  Mail,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Tag } from "@/components/ui/tag";
import { Textarea } from "@/components/ui/textarea";
import {
  Display,
  Eyebrow,
  Heading,
  Lead,
  Text,
} from "@/components/ui/typography";
import { createMetadata } from "@/lib/seo/metadata";

/**
 * Design system reference.
 *
 * Every token and primitive rendered on one page, in both themes. This is a
 * working tool, not a marketing page: it is how a change to a token is
 * reviewed before it reaches a real page, and how a regression in a primitive
 * gets spotted in seconds rather than in production.
 *
 * `noIndex` and excluded from the sitemap — useful internally, invisible to
 * search engines.
 */
export const metadata = createMetadata({
  title: "Design system",
  pathname: "/design",
  noIndex: true,
});

/* -------------------------------------------------------------------------- */
/* Page-local layout helpers. Not exported: they exist only to keep this file
   readable, and none of them belong in the design system itself.              */
/* -------------------------------------------------------------------------- */

function Spec({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Section
      spacing="sm"
      surface="bordered"
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <Container width="wide" className="grid gap-(--spacing-stack-lg)">
        <div className="grid gap-(--spacing-stack-xs)">
          <Heading size="lg">{title}</Heading>
          <Text tone="muted" measure>
            {description}
          </Text>
        </div>
        {children}
      </Container>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-(--spacing-stack-sm) md:grid-cols-[10rem_1fr] md:items-baseline md:gap-6">
      <code className="font-mono text-caption text-text-subtle">{label}</code>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function Swatch({ className, name }: { className: string; name: string }) {
  return (
    <div className="grid gap-1.5">
      <div
        className={`h-14 w-full rounded-lg border border-line ${className}`}
      />
      <code className="font-mono text-caption text-text-subtle">{name}</code>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const brandScale = [
  "bg-brand-50",
  "bg-brand-100",
  "bg-brand-200",
  "bg-brand-300",
  "bg-brand-400",
  "bg-brand-500",
  "bg-brand-600",
  "bg-brand-700",
  "bg-brand-800",
  "bg-brand-900",
  "bg-brand-950",
];

const radii = [
  "rounded-xs",
  "rounded-sm",
  "rounded-md",
  "rounded-lg",
  "rounded-xl",
  "rounded-2xl",
  "rounded-3xl",
  "rounded-4xl",
];

const breakpoints = [
  ["xs", "30rem", "480px", "Large phones"],
  ["sm", "40rem", "640px", "Small tablets"],
  ["md", "48rem", "768px", "Tablets"],
  ["lg", "64rem", "1024px", "Laptops"],
  ["xl", "80rem", "1280px", "Desktops"],
  ["2xl", "96rem", "1536px", "Large displays"],
];

export default function DesignSystemPage() {
  return (
    <main id="main">
      <header className="sticky top-0 z-(--z-sticky) border-b border-line bg-surface/80 backdrop-blur">
        <Container
          width="wide"
          className="flex h-16 items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Text weight="medium">Design system</Text>
            <Badge variant="brand">Internal</Badge>
          </div>
          <ThemeToggle />
        </Container>
      </header>

      <Section spacing="lg">
        <Container width="wide" className="grid gap-(--spacing-stack-md)">
          <Eyebrow>Foundations</Eyebrow>
          <Display size="md">Tokens and primitives</Display>
          <Lead>
            Every value the site is allowed to use, and every component built
            from them. If something is not on this page, it does not exist yet —
            and a page should never invent it inline.
          </Lead>
        </Container>
      </Section>

      {/* --- Colour ------------------------------------------------------- */}
      <Spec
        title="Colour"
        description="A near-monochrome system with one brand hue. Components address semantic roles, never palette values, which is why the whole page re-themes from a single class on <html>."
      >
        <div className="grid gap-(--spacing-stack-lg)">
          <div className="grid gap-(--spacing-stack-sm)">
            <Text size="sm" weight="medium">
              Brand palette
            </Text>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-11">
              {brandScale.map((name) => (
                <Swatch
                  key={name}
                  className={name}
                  name={name.replace("bg-brand-", "")}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-(--spacing-stack-sm)">
            <Text size="sm" weight="medium">
              Surfaces
            </Text>
            <Text size="sm" tone="subtle">
              In the light theme, raised and overlay match the base surface by
              design — they are separated by border and shadow, not fill.
            </Text>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Swatch className="bg-surface" name="surface" />
              <Swatch className="bg-surface-sunken" name="surface-sunken" />
              <Swatch className="bg-surface-raised" name="surface-raised" />
              <Swatch className="bg-surface-overlay" name="surface-overlay" />
            </div>
          </div>

          <div className="grid gap-(--spacing-stack-sm)">
            <Text size="sm" weight="medium">
              Text
            </Text>
            <div className="flex flex-wrap gap-6">
              <Text tone="default">text — primary</Text>
              <Text tone="muted">text-muted — secondary</Text>
              <Text tone="subtle">text-subtle — tertiary</Text>
            </div>
          </div>

          <div className="grid gap-(--spacing-stack-sm)">
            <Text size="sm" weight="medium">
              Status
            </Text>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Swatch
                className="border-success-line! bg-success-surface"
                name="success"
              />
              <Swatch
                className="border-warning-line! bg-warning-surface"
                name="warning"
              />
              <Swatch
                className="border-danger-line! bg-danger-surface"
                name="danger"
              />
              <Swatch
                className="border-info-line! bg-info-surface"
                name="info"
              />
            </div>
          </div>
        </div>
      </Spec>

      {/* --- Typography --------------------------------------------------- */}
      <Spec
        title="Typography"
        description="A semantic scale. Every step carries its own line height, tracking and weight, because optical tracking is size-dependent — that is what makes headlines look typeset rather than merely large."
      >
        <div className="grid gap-(--spacing-stack-lg)">
          <Row label="display-xl">
            <span className="text-display-xl">Ship faster</span>
          </Row>
          <Row label="display-lg">
            <span className="text-display-lg">Ship faster</span>
          </Row>
          <Row label="display-md">
            <span className="text-display-md">Ship faster</span>
          </Row>
          <Row label="display-sm">
            <span className="text-display-sm">Ship faster</span>
          </Row>
          <Row label="heading-lg">
            <span className="text-heading-lg">Section heading</span>
          </Row>
          <Row label="heading-md">
            <span className="text-heading-md">Section heading</span>
          </Row>
          <Row label="heading-sm">
            <span className="text-heading-sm">Card title</span>
          </Row>
          <Row label="body-lg">
            <span className="text-body-lg">
              The standfirst under a headline.
            </span>
          </Row>
          <Row label="body-md">
            <span className="text-body-md">Default body copy.</span>
          </Row>
          <Row label="body-sm">
            <span className="text-body-sm">Secondary body copy.</span>
          </Row>
          <Row label="caption">
            <span className="text-caption">Captions and helper text.</span>
          </Row>
          <Row label="eyebrow">
            <Eyebrow>Section label</Eyebrow>
          </Row>
          <Row label="font-mono">
            <span className="font-mono text-body-sm">
              const shipped = true;
            </span>
          </Row>
        </div>
      </Spec>

      {/* --- Space -------------------------------------------------------- */}
      <Spec
        title="Space"
        description="Four levels, largest to smallest: section, block, stack, gutter. Section and gutter are fluid so the page breathes more on a large display; stack values are fixed so the relation between a heading and its paragraph never changes."
      >
        <div className="grid gap-(--spacing-stack-md)">
          {[
            ["section-lg", "h-section-lg"],
            ["section", "h-section"],
            ["section-sm", "h-section-sm"],
            ["block", "h-block"],
            ["stack-lg", "h-stack-lg"],
            ["stack-md", "h-stack-md"],
            ["stack-sm", "h-stack-sm"],
            ["stack-xs", "h-stack-xs"],
            ["gutter", "h-gutter"],
          ].map(([name, height]) => (
            <div key={name} className="grid gap-1.5">
              <code className="font-mono text-caption text-text-subtle">
                {name}
              </code>
              <div className={`w-full rounded-sm bg-brand-500/20 ${height}`} />
            </div>
          ))}
        </div>
      </Spec>

      {/* --- Radius and elevation ----------------------------------------- */}
      <Spec
        title="Radius"
        description="Every corner derives from one --radius value, in multiplicative steps so a large surface and a small control stay in proportion. Nested elements take the next step down."
      >
        <div className="flex flex-wrap gap-4">
          {radii.map((radius) => (
            <div key={radius} className="grid gap-1.5">
              <div
                className={`size-16 border border-line-strong bg-surface-sunken ${radius}`}
              />
              <code className="font-mono text-caption text-text-subtle">
                {radius.replace("rounded-", "")}
              </code>
            </div>
          ))}
          <div className="grid gap-1.5">
            <div className="h-16 w-24 rounded-(--radius-pill) border border-line bg-surface-sunken" />
            <code className="font-mono text-caption text-text-subtle">
              pill
            </code>
          </div>
        </div>
      </Spec>

      <Spec
        title="Elevation"
        description="Four steps, each a tight contact shadow plus a wide diffuse one. In the dark theme, depth is carried by the surface getting lighter rather than by shadow — a black shadow on a near-black page is invisible."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["subtle", "shadow-subtle"],
            ["raised", "shadow-raised"],
            ["overlay", "shadow-overlay"],
            ["floating", "shadow-floating"],
          ].map(([name, shadow]) => (
            <div key={name} className="grid gap-2">
              <div
                className={`h-24 rounded-2xl border border-line bg-surface-raised ${shadow}`}
              />
              <code className="font-mono text-caption text-text-subtle">
                {name}
              </code>
            </div>
          ))}
        </div>
      </Spec>

      {/* --- Buttons ------------------------------------------------------ */}
      <Spec
        title="Buttons"
        description="Variants are semantic, not visual: primary means the one action wanted on this screen, so there should only ever be one. Sizes are token assignments, which is why a button and an input of the same size align to the pixel."
      >
        <div className="grid gap-(--spacing-stack-lg)">
          <Row label="variant">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link</Button>
          </Row>
          <Row label="size">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
          </Row>
          <Row label="with icon">
            <Button>
              Start a project <ArrowRight />
            </Button>
            <Button variant="secondary">
              <Code /> View source
            </Button>
            <Button size="icon" variant="ghost" aria-label="Send">
              <Send />
            </Button>
          </Row>
          <Row label="state">
            <Button disabled>Disabled</Button>
            <Button aria-busy>
              <Spinner /> Sending
            </Button>
          </Row>
        </div>
      </Spec>

      {/* --- Links -------------------------------------------------------- */}
      <Spec
        title="Links"
        description="Underlined by default in body copy — colour alone is not an accessible affordance. External links get rel=noopener and an out-of-site indicator automatically."
      >
        <div className="grid gap-(--spacing-stack-md)">
          <Row label="default">
            <Text>
              Read the <Link href="/blog">latest writing</Link> or browse the{" "}
              <Link href="https://github.com">source on GitHub</Link>.
            </Text>
          </Row>
          <Row label="subtle">
            <Link href="/about" variant="subtle">
              About
            </Link>
            <Link href="/work" variant="subtle">
              Work
            </Link>
          </Row>
          <Row label="cta">
            <Link href="/contact" variant="cta">
              Start a project
            </Link>
          </Row>
          <Row label="brand">
            <Link href="/services" variant="brand">
              See what I offer
            </Link>
          </Row>
        </div>
      </Spec>

      {/* --- Tags and badges ---------------------------------------------- */}
      <Spec
        title="Tags and badges"
        description="A badge is a state and is never interactive. A tag is taxonomy and often is. They look deliberately different so a visitor can tell what is clickable without hovering it."
      >
        <div className="grid gap-(--spacing-stack-lg)">
          <Row label="badge">
            <Badge variant="neutral">Draft</Badge>
            <Badge variant="brand">New</Badge>
            <Badge variant="success">
              <Check /> Available
            </Badge>
            <Badge variant="warning">Limited</Badge>
            <Badge variant="danger">Closed</Badge>
            <Badge variant="solid">Featured</Badge>
          </Row>
          <Row label="tag">
            <Tag>TypeScript</Tag>
            <Tag>Next.js</Tag>
            <Tag variant="outline">PostgreSQL</Tag>
            <Tag variant="brand">Performance</Tag>
          </Row>
          <Row label="tag · filter">
            <Tag interactive selected>
              All
            </Tag>
            <Tag interactive>Engineering</Tag>
            <Tag interactive variant="outline">
              Design
            </Tag>
          </Row>
        </div>
      </Spec>

      {/* --- Cards -------------------------------------------------------- */}
      <Spec
        title="Cards"
        description="One --card-padding token feeds every slot, and it is fluid — a card comfortable on a phone looks starved at 1440px. The resting state is a hairline, not a shadow; shadow is reserved for hover and for things that genuinely float."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>
                Hairline border on a raised surface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm" tone="muted">
                The workhorse. Used for case studies, article previews and
                service listings.
              </Text>
            </CardContent>
          </Card>

          <Card variant="raised">
            <CardHeader>
              <CardTitle>Raised</CardTitle>
              <CardDescription>Shadow instead of a border.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm" tone="muted">
                For a card that needs to sit above a busy or tinted section
                background.
              </Text>
            </CardContent>
          </Card>

          <Card interactive>
            <CardHeader>
              <CardTitle>Interactive</CardTitle>
              <CardDescription>Lifts and gains a shadow.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm" tone="muted">
                Hover it. Pair with the link-overlay utility so the whole
                surface is clickable.
              </Text>
            </CardContent>
            <CardFooter>
              <Link href="/work" variant="cta">
                View case study
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Spec>

      {/* --- Forms -------------------------------------------------------- */}
      <Spec
        title="Forms"
        description="Field generates the ids and FieldControl injects them, so label association, aria-describedby and aria-invalid are handled rather than remembered. Input heights come from the same token as buttons."
      >
        <div className="max-w-narrow">
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldControl>
                <Input placeholder="Ada Lovelace" />
              </FieldControl>
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldControl>
                <Input type="email" placeholder="ada@example.com" />
              </FieldControl>
              <FieldDescription>This is where the reply goes.</FieldDescription>
            </Field>

            <Field invalid>
              <FieldLabel>Budget</FieldLabel>
              <FieldControl>
                <Input defaultValue="ten pounds" />
              </FieldControl>
              <FieldError>Please choose one of the listed ranges.</FieldError>
            </Field>

            <Field>
              <FieldLabel>Project</FieldLabel>
              <FieldControl>
                <Textarea placeholder="What are you building, and what is in the way?" />
              </FieldControl>
              <FieldDescription>
                The more specific, the more useful the reply.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Disabled</FieldLabel>
              <FieldControl>
                <Input disabled defaultValue="Not editable" />
              </FieldControl>
            </Field>

            <Button size="lg" block>
              <Mail /> Send enquiry
            </Button>
          </FieldGroup>
        </div>
      </Spec>

      {/* --- Icons -------------------------------------------------------- */}
      <Spec
        title="Icons"
        description="Lucide, normalised to the token sizes and a 1.75 stroke. Sized in rem so an icon scales with the text beside it, and hidden from assistive technology unless it is the only carrier of meaning."
      >
        <div className="grid gap-(--spacing-stack-lg)">
          <Row label="size">
            <Icon icon={Sparkles} size="xs" />
            <Icon icon={Sparkles} size="sm" />
            <Icon icon={Sparkles} size="md" />
            <Icon icon={Sparkles} size="lg" />
            <Icon icon={Sparkles} size="xl" />
          </Row>
          <Row label="tone">
            <Icon icon={Zap} size="lg" tone="default" />
            <Icon icon={Zap} size="lg" tone="muted" />
            <Icon icon={Zap} size="lg" tone="subtle" />
            <Icon icon={Zap} size="lg" tone="brand" />
          </Row>
        </div>
      </Spec>

      {/* --- Loading ------------------------------------------------------ */}
      <Spec
        title="Loading"
        description="A spinner is for an action the visitor initiated; a skeleton is for content that has not arrived. Skeletons are shaped like the real thing so nothing reflows when it lands."
      >
        <div className="grid gap-(--spacing-stack-lg)">
          <Row label="spinner">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </Row>
          <Row label="skeleton">
            <Skeleton className="h-10 w-32" />
            <Skeleton shape="circle" className="size-10" />
            <Skeleton shape="pill" className="h-7 w-20" />
          </Row>
          <div className="grid gap-(--spacing-stack-sm) md:grid-cols-[10rem_1fr] md:gap-6">
            <code className="font-mono text-caption text-text-subtle">
              skeleton · card
            </code>
            <Card className="max-w-sm">
              <CardHeader>
                <Skeleton shape="text" className="w-2/5" />
              </CardHeader>
              <CardContent>
                <SkeletonText lines={3} />
              </CardContent>
            </Card>
          </div>
        </div>
      </Spec>

      {/* --- Motion ------------------------------------------------------- */}
      <Spec
        title="Motion"
        description="Short, decelerating, never bouncy — motion should confirm an action, not perform one. Everything here stops under prefers-reduced-motion."
      >
        <div className="grid gap-(--spacing-stack-lg)">
          <Row label="transition-ui">
            <div className="grid h-20 w-32 place-items-center rounded-xl bg-surface-sunken transition-ui hover:bg-brand-500">
              <Text size="sm">Hover</Text>
            </div>
          </Row>
          <Row label="hover-lift">
            <div className="grid h-20 w-32 hover-lift place-items-center surface transition-ui-base hover:shadow-raised">
              <Text size="sm">Hover</Text>
            </div>
          </Row>
          <Row label="animate-shimmer">
            <div className="h-20 w-32 skeleton-sweep rounded-xl" />
          </Row>
          <Row label="animate-pulse-subtle">
            <div className="h-20 w-32 animate-pulse-subtle rounded-xl bg-brand-500/30" />
          </Row>
        </div>
      </Spec>

      {/* --- Breakpoints -------------------------------------------------- */}
      <Spec
        title="Breakpoints"
        description="In rem, so layout responds to the reader's font size rather than ignoring it. Mobile-first: an unprefixed class is the small-screen case."
      >
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left">
            <thead className="bg-surface-sunken">
              <tr>
                {["Token", "Value", "At 16px", "Typical device"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-caption font-medium text-text-muted"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {breakpoints.map(([token, value, px, device]) => (
                <tr key={token} className="border-t border-line">
                  <td className="px-4 py-3 font-mono text-body-sm">{token}</td>
                  <td className="px-4 py-3 font-mono text-body-sm text-text-muted">
                    {value}
                  </td>
                  <td className="px-4 py-3 font-mono text-body-sm text-text-muted">
                    {px}
                  </td>
                  <td className="px-4 py-3 text-body-sm text-text-muted">
                    {device}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Spec>

      <Section spacing="sm" surface="bordered">
        <Container width="wide">
          <Text size="sm" tone="subtle">
            Tokens live in <code className="font-mono">src/styles/tokens</code>.
            Primitives live in{" "}
            <code className="font-mono">src/components/ui</code>. See{" "}
            <Link href="https://github.com" variant="subtle">
              docs/DESIGN-SYSTEM.md
            </Link>
            .
          </Text>
        </Container>
      </Section>
    </main>
  );
}
