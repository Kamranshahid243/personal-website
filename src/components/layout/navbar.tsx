import Link from "next/link";
import type { Route } from "next";

import { AvailabilityBadge } from "@/components/common/availability-badge";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * Site header.
 *
 * Server component. Interactive islands (nav active state, mobile sheet, theme
 * toggle) mark their own client boundaries.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-(--z-sticky) border-b border-line bg-surface/80 backdrop-blur-xl">
      <Container
        width="wide"
        className="flex h-16 items-center justify-between gap-4"
      >
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="rounded-sm font-heading text-body-md font-semibold tracking-tight focus-ring"
          >
            {siteConfig.name}
            <span className="sr-only"> — home</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <AvailabilityBadge className="mr-1 hidden lg:inline-flex" />
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            {primaryCta.external ? (
              <a href={primaryCta.href}>{primaryCta.title}</a>
            ) : (
              <Link href={primaryCta.href as Route}>{primaryCta.title}</Link>
            )}
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
