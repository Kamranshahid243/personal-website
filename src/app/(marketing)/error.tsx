"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Display, Text } from "@/components/ui/typography";
import { primaryCta } from "@/config/navigation";

/**
 * Marketing-level error boundary.
 *
 * Catches render and data-fetching errors inside the marketing layout so the
 * Navbar and Footer survive — visitors keep their navigation and the site still
 * converts even when a single page fails.
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section
      spacing="lg"
      className="grid min-h-[60svh] place-items-center"
      aria-labelledby="error-heading"
    >
      <Container
        width="prose"
        className="flex flex-col items-center gap-(--spacing-stack-md) text-center"
      >
        <Display id="error-heading" size="sm">
          Something went wrong
        </Display>
        <Text tone="muted" className="max-w-sm text-pretty">
          An unexpected error occurred. Trying again usually fixes it — if it
          persists, reach out directly.
        </Text>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/projects">View projects</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href={primaryCta.href}>{primaryCta.title}</a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
