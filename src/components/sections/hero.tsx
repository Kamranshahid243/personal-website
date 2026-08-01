import Link from "next/link";
import type { Route } from "next";

import { AnimatedBackground } from "@/components/common/animated-background";
import { AvailabilityBadge } from "@/components/common/availability-badge";
import { SocialLinks } from "@/components/common/social-links";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Display, Lead, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { homeCopy } from "@/data/home";
import { cn } from "@/lib/utils";

export type HeroSectionProps = {
  className?: string;
};

/**
 * Homepage hero — brand, claim, supporting line, CTA group.
 *
 * CSS entrance only (`reveal-on-load`). No Framer on the critical path.
 */
export function HeroSection({ className }: HeroSectionProps) {
  const { hero } = homeCopy;
  const primaryIsExternal =
    hero.primaryCta.href.startsWith("http") ||
    hero.primaryCta.href.startsWith("mailto:");

  return (
    <header
      id="hero"
      aria-labelledby="hero-heading"
      className={cn("relative overflow-hidden border-b border-line", className)}
    >
      <AnimatedBackground variant="glow" />
      <Container
        width="content"
        className="relative flex min-h-[min(88svh,52rem)] flex-col justify-center py-section-lg"
      >
        <div className="flex max-w-3xl flex-col items-start gap-(--spacing-stack-md)">
          <div className="reveal-on-load">
            <AvailabilityBadge />
          </div>

          <Text
            as="p"
            size="caption"
            tone="subtle"
            className="reveal-on-load font-mono tracking-[0.16em] uppercase [animation-delay:60ms]"
          >
            {siteConfig.name}
            <span aria-hidden className="mx-2 text-text-subtle">
              ·
            </span>
            {siteConfig.role}
          </Text>

          <Display
            id="hero-heading"
            size="lg"
            className="reveal-on-load [animation-delay:120ms]"
          >
            {siteConfig.tagline}
          </Display>

          <Lead className="max-w-2xl reveal-on-load [animation-delay:200ms]">
            {hero.lead}
          </Lead>

          <div className="flex reveal-on-load flex-col gap-3 [animation-delay:280ms] sm:flex-row sm:items-center">
            <Button asChild size="lg">
              {primaryIsExternal ? (
                <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
              ) : (
                <Link href={hero.primaryCta.href as Route}>
                  {hero.primaryCta.label}
                </Link>
              )}
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={hero.secondaryCta.href as Route}>
                {hero.secondaryCta.label}
              </Link>
            </Button>
          </div>

          <div className="reveal-on-load [animation-delay:360ms]">
            <SocialLinks />
          </div>
        </div>
      </Container>
    </header>
  );
}
