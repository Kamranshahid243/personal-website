import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight, FileDown, Mail } from "lucide-react";

import { AnimatedBackground } from "@/components/common/animated-background";
import { AvailabilityBadge } from "@/components/common/availability-badge";
import { Portrait } from "@/components/common/portrait";
import { GitHubIcon, LinkedInIcon } from "@/components/common/social-icons";
import { TechStack } from "@/components/common/tech-stack";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Display, Heading, Lead, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { homeCopy } from "@/data/home";
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
 * Homepage hero — credibility first.
 *
 * Brand (name) leads, then title, value proposition, introduction, and a clear
 * ask. The portrait is a full-bleed visual plane on large screens. Motion is
 * CSS only so the critical path stays light for Core Web Vitals.
 */
export function HeroSection({ className }: HeroSectionProps) {
  const { hero } = homeCopy;
  const emailHref = `mailto:${siteConfig.email}`;

  return (
    <header
      id="hero"
      aria-labelledby="hero-heading"
      className={cn("relative overflow-hidden border-b border-line", className)}
    >
      <AnimatedBackground variant="glow" />

      <Container width="wide" className="relative">
        <div className="grid items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-0">
          <div className="flex flex-col justify-center py-section-lg lg:pr-16 xl:pr-20">
            <div className="flex max-w-xl flex-col items-start gap-(--spacing-stack-md)">
              <div className="reveal-on-load">
                <AvailabilityBadge />
              </div>

              <div className="grid reveal-on-load gap-2 [animation-delay:60ms]">
                <Display id="hero-heading" size="lg" className="tracking-tight">
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

              <Heading
                as="h2"
                size="lg"
                className="max-w-xl reveal-on-load text-pretty [animation-delay:120ms]"
              >
                {hero.valueProposition}
              </Heading>

              <Lead className="max-w-xl reveal-on-load [animation-delay:180ms]">
                {hero.introduction}
              </Lead>

              <div className="flex w-full reveal-on-load flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap sm:items-center">
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
              </div>

              <ul
                className="flex reveal-on-load flex-wrap items-center gap-2 [animation-delay:300ms]"
                aria-label="Profiles and contact"
              >
                <li>
                  <Button asChild variant="secondary" size="md">
                    <a
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon className="size-(--icon-sm)" />
                      GitHub
                    </a>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="secondary" size="md">
                    <a
                      href={siteConfig.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon className="size-(--icon-sm)" />
                      LinkedIn
                    </a>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="secondary" size="md">
                    <a href={emailHref}>
                      <Mail className="size-(--icon-sm)" />
                      Email
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative -mx-(--spacing-gutter) min-h-[22rem] reveal-on-load border-t border-line [animation-delay:160ms] sm:min-h-[28rem] lg:mx-0 lg:min-h-[min(40rem,70svh)] lg:border-t-0 lg:border-l lg:border-line">
            <Portrait priority className="absolute inset-0" />
          </div>
        </div>

        <div className="flex reveal-on-load flex-col gap-4 border-t border-line py-6 [animation-delay:360ms] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Text
              as="p"
              size="caption"
              tone="subtle"
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
            className="max-w-sm text-pretty sm:text-right"
          >
            {hero.status}
          </Text>
        </div>
      </Container>
    </header>
  );
}
