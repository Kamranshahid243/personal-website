import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight, FileDown } from "lucide-react";

import { AnimatedBackground } from "@/components/common/animated-background";
import { AvailabilityBadge } from "@/components/common/availability-badge";
import { Portrait } from "@/components/common/portrait";
import { SocialLinks } from "@/components/common/social-links";
import { TechStack } from "@/components/common/tech-stack";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Display, Heading, Lead, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { homeCopy } from "@/data/home";
import { publicAssetExists } from "@/lib/public-asset";
import { cn } from "@/lib/utils";

export type HeroSectionProps = {
  className?: string;
};

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.endsWith(".pdf")
  );
}

/**
 * Homepage hero — one clear ask.
 *
 * Brand leads, then the claim and a single primary CTA. Secondary work link
 * and optional résumé stay subordinate. Socials use the shared component so
 * placeholder profiles never render.
 */
export function HeroSection({ className }: HeroSectionProps) {
  const { hero } = homeCopy;
  const showResume = publicAssetExists(siteConfig.links.resume);

  return (
    <header
      id="hero"
      aria-labelledby="hero-heading"
      className={cn("relative overflow-hidden border-b border-line", className)}
    >
      <AnimatedBackground variant="glow" />

      <Container width="wide" className="relative">
        <div className="grid items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="order-2 flex flex-col justify-center py-10 sm:py-14 lg:order-1 lg:py-section-lg lg:pr-16 xl:pr-20">
            <div className="flex max-w-xl flex-col items-start gap-(--spacing-stack-md)">
              <AvailabilityBadge />

              <div className="grid gap-2">
                <Display id="hero-heading" size="xl" className="tracking-tight">
                  {siteConfig.name}
                </Display>
                <Text
                  as="p"
                  size="lg"
                  tone="muted"
                  weight="medium"
                  className="font-heading tracking-tight"
                >
                  {siteConfig.role}
                </Text>
              </div>

              <Heading as="h2" size="lg" className="max-w-xl text-pretty">
                {hero.valueProposition}
              </Heading>

              <Lead className="max-w-xl">{hero.introduction}</Lead>

              <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button asChild size="lg">
                  {isExternalHref(hero.primaryCta.href) ? (
                    <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
                  ) : (
                    <Link href={hero.primaryCta.href as Route}>
                      {hero.primaryCta.label}
                    </Link>
                  )}
                </Button>

                <Button asChild size="lg" variant="secondary">
                  {isExternalHref(hero.secondaryCta.href) ? (
                    <a href={hero.secondaryCta.href}>
                      {hero.secondaryCta.label}
                      <ArrowUpRight />
                    </a>
                  ) : (
                    <Link href={hero.secondaryCta.href as Route}>
                      {hero.secondaryCta.label}
                      <ArrowUpRight />
                    </Link>
                  )}
                </Button>

                {showResume ? (
                  <Button asChild size="lg" variant="ghost">
                    <a
                      href={hero.resumeCta.href}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileDown />
                      {hero.resumeCta.label}
                    </a>
                  </Button>
                ) : null}
              </div>

              <SocialLinks
                className="reveal-on-load"
                aria-label="Profiles and contact"
              />
            </div>
          </div>

          <div className="relative order-1 -mx-(--spacing-gutter) min-h-[16rem] reveal-on-load border-b border-line sm:min-h-[22rem] lg:order-2 lg:mx-0 lg:min-h-[min(34rem,62svh)] lg:border-b-0 lg:border-l lg:border-line">
            <Portrait priority className="absolute inset-0" />
          </div>
        </div>

        <div className="flex reveal-on-load flex-col gap-4 border-t border-line py-5 [animation-delay:80ms] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Text
              as="p"
              size="caption"
              tone="muted"
              weight="medium"
              className="shrink-0 font-mono tracking-[0.14em] uppercase"
            >
              Core stack
            </Text>
            <TechStack items={hero.techHighlights} />
          </div>
          <Text
            as="p"
            size="sm"
            tone="muted"
            className="max-w-md text-pretty sm:text-right"
          >
            <span className="font-medium text-text">Status · </span>
            {hero.status}
          </Text>
        </div>
      </Container>
    </header>
  );
}
