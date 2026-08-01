import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Display, Eyebrow, Text } from "@/components/ui/typography";

/**
 * Root 404.
 *
 * Rendered for any unmatched URL and for every `notFound()` call no nearer
 * boundary handles. A dead end here is a lost lead, so it always offers a way
 * back rather than only stating the error.
 */
export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center">
      <Container
        width="prose"
        className="flex flex-col items-center gap-(--spacing-stack-md) text-center"
      >
        <Eyebrow>404</Eyebrow>
        <Display size="sm">Page not found</Display>
        <Text tone="muted">That page has moved or never existed.</Text>
        <Button asChild size="lg" className="mt-2">
          <Link href="/">Back to home</Link>
        </Button>
      </Container>
    </main>
  );
}
