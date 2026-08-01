import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * Root 404.
 *
 * Rendered for any unmatched URL and for every `notFound()` call that no
 * nearer boundary handles. A dead end here is a lost lead, so it always offers
 * a way back rather than just stating the error.
 */
export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center">
      <Container width="prose" className="space-y-6 text-center">
        <p className="font-mono text-eyebrow text-muted-foreground uppercase">
          404
        </p>
        <h1 className="text-display-sm font-semibold">Page not found</h1>
        <p className="text-muted-foreground">
          That page has moved or never existed.
        </p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </Container>
    </main>
  );
}
