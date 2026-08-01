import { AnimatedBackground } from "@/components/common/animated-background";
import { AvailabilityBadge } from "@/components/common/availability-badge";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CtaSection } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Display, Lead, Text } from "@/components/ui/typography";
import { primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import type { Route } from "next";

/**
 * Temporary home page.
 *
 * Exists so the marketing layout (navbar + footer) can be exercised end to
 * end. Replaced when the real home page is designed — sections, proof, offer.
 */
export const metadata = createMetadata({ pathname: "/" });

export default function HomePage() {
  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <AnimatedBackground variant="glow" />
        <Container
          width="content"
          className="relative flex flex-col items-start gap-(--spacing-stack-md)"
        >
          <AvailabilityBadge />
          <Display size="lg">{siteConfig.tagline}</Display>
          <Lead>{siteConfig.description}</Lead>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryCta.href as Route}>{primaryCta.title}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={"/work" as Route}>View work</Link>
            </Button>
          </div>
          <Text size="sm" tone="subtle" className="font-mono">
            Components are ready — see /components for the full set.
          </Text>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
