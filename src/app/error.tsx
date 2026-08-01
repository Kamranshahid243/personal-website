"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Display, Text } from "@/components/ui/typography";

/**
 * Route-level error boundary.
 *
 * Catches render and data-fetching errors below the root layout, so the header
 * and footer survive and the visitor keeps their navigation. Must be a client
 * component — React needs the boundary on the client to offer a retry.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with the error reporter (Sentry et al) when one is added.
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
        <Button size="lg" onClick={reset} className="mt-2">
          Try again
        </Button>
      </Container>
    </main>
  );
}
