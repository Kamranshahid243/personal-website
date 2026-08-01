"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

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
      <Container width="prose" className="space-y-6 text-center">
        <h1 className="text-display-sm font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">
          An unexpected error occurred. Trying again usually fixes it.
        </p>
        <Button onClick={reset}>Try again</Button>
      </Container>
    </main>
  );
}
