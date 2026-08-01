import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

import { AvailabilityBadge } from "@/components/common/availability-badge";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type CtaSectionProps = {
  id?: string;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  subheading?: ReactNode;
  /** Primary button label. Defaults to the site-wide CTA. */
  primaryLabel?: string;
  primaryHref?: string;
  /** Optional secondary action, e.g. "View work". */
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Show the availability badge above the heading. */
  showAvailability?: boolean;
  className?: string;
};

/**
 * End-of-page call to action.
 *
 * The single most reused section on the site — home, services, case studies
 * and the blog all close with some version of "let's talk". Defaults pull from
 * site config so the ask stays consistent; every prop is overridable for the
 * pages that need a tighter pitch.
 */
export function CtaSection({
  id,
  eyebrow = "Next step",
  heading = "Have a project in mind?",
  subheading = `Tell me what you're building. I usually reply within one business day (${siteConfig.timezone}).`,
  primaryLabel = primaryCta.title,
  primaryHref = primaryCta.href,
  secondaryLabel,
  secondaryHref,
  showAvailability = true,
  className,
}: CtaSectionProps) {
  return (
    <Section
      id={id}
      spacing="lg"
      surface="bordered"
      className={cn("relative", className)}
    >
      <Container
        width="content"
        className="flex flex-col items-center gap-(--spacing-stack-lg) text-center"
      >
        {showAvailability ? <AvailabilityBadge /> : null}

        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          subheading={subheading}
          size="display"
          align="center"
        />

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            {primaryHref.startsWith("http") ||
            primaryHref.startsWith("mailto:") ? (
              <a href={primaryHref}>{primaryLabel}</a>
            ) : (
              <Link href={primaryHref as Route}>{primaryLabel}</Link>
            )}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button asChild size="lg" variant="secondary">
              {secondaryHref.startsWith("http") ||
              secondaryHref.startsWith("mailto:") ? (
                <a href={secondaryHref}>{secondaryLabel}</a>
              ) : (
                <Link href={secondaryHref as Route}>{secondaryLabel}</Link>
              )}
            </Button>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
