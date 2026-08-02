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
 * Homepage hero — one viewport on large screens (under the sticky nav).
 */
export function HeroSection({ className }: HeroSectionProps) {
  const { hero } = homeCopy;
  const showResume = publicAssetExists(siteConfig.links.resume);

  return (
    <header
      id="hero"
      aria-labelledby="hero-heading"
      className={cn(
        "relative overflow-hidden border-b border-line",
        "lg:h-(--viewport-content) lg:max-h-(--viewport-content)",
        className,
      )}
    >
      <AnimatedBackground variant="mesh" />

      <Container
        width="wide"
        className="relative flex h-full min-h-0 flex-col"
      >
        <div className="grid min-h-0 flex-1 items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="order-2 flex min-h-0 flex-col justify-center py-8 sm:py-10 lg:order-1 lg:py-8 lg:pr-12 xl:pr-16">
            <div className="flex max-w-xl flex-col items-start gap-4 sm:gap-(--spacing-stack-md)">
              <div className="reveal-on-load" style={{ animationDelay: "40ms" }}>
                <AvailabilityBadge />
              </div>

              <div
                className="grid gap-2 reveal-on-load"
                style={{ animationDelay: "120ms" }}
              >
                <Display
                  id="hero-heading"
                  size="md"
                  tone="gradient"
                  className="tracking-tight sm:text-display-sm lg:text-display-md"
                >
                  {siteConfig.name}
                </Display>
                <Text
                  as="p"
                  size="lg"
                  weight="medium"
                  className="font-heading tracking-tight text-brand-700 dark:text-brand-300"
                >
                  {siteConfig.role}
                </Text>
              </div>

              <Heading
                as="h2"
                size="lg"
                className="max-w-xl text-pretty reveal-on-load"
                style={{ animationDelay: "200ms" }}
              >
                {hero.valueProposition}
              </Heading>

              <Lead
                className="max-w-xl reveal-on-load"
                style={{ animationDelay: "280ms" }}
              >
                {hero.introduction}
              </Lead>

              <div
                className="flex w-full flex-col gap-3 reveal-on-load sm:flex-row sm:flex-wrap sm:items-center"
                style={{ animationDelay: "360ms" }}
              >
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
                style={{ animationDelay: "440ms" }}
                aria-label="Profiles and contact"
              />
            </div>
          </div>

          <div
            className="relative order-1 flex items-center justify-center reveal-scale-on-load border-b border-line bg-surface-sunken -mx-(--spacing-gutter) px-(--spacing-gutter) py-6 sm:py-8 lg:order-2 lg:mx-0 lg:h-full lg:border-b-0 lg:border-l lg:border-line lg:px-10 lg:py-10"
            style={{ animationDelay: "180ms" }}
          >
            <div className="relative aspect-[3/4] w-full max-w-[22rem] overflow-hidden rounded-(--radius-2xl) border border-line shadow-raised sm:max-w-[24rem] lg:max-h-[min(78svh,40rem)] lg:max-w-[26rem]">
              <Portrait priority className="absolute inset-0 min-h-0" />
            </div>
          </div>
        </div>

        <div
          className="flex shrink-0 reveal-on-load flex-col gap-3 border-t border-line py-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ animationDelay: "520ms" }}
        >
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
