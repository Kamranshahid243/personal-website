"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Display, Text } from "@/components/ui/typography";
import { primaryCta } from "@/config/navigation";

/**
 * Route-level error boundary.
 *
 * Catches render and data-fetching errors below the root layout, so the header
 * and footer survive and the visitor keeps their navigation.
 */
export default function Error({
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
    <main id="main" className="grid min-h-[60vh] place-items-center">
      <Container
        width="prose"
        className="flex flex-col items-center gap-(--spacing-stack-md) text-center"
      >
        <Display size="sm">Something went wrong</Display>
        <Text tone="muted">
          An unexpected error occurred. Trying again usually fixes it.
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
    </main>
  );
}
