import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

/**
 * Placeholder home route.
 *
 * The architecture is in place but no pages have been designed yet. This file
 * exists only so the app has a valid root route, and is replaced by
 * `src/app/(marketing)/page.tsx` as soon as the home page is built.
 */
export default function Page() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center">
      <Container width="prose" className="space-y-4 text-center">
        <p className="font-mono text-eyebrow text-muted-foreground uppercase">
          Scaffold ready
        </p>
        <h1 className="text-display-sm font-semibold">{siteConfig.name}</h1>
        <p className="text-muted-foreground">
          Project architecture is set up. Pages are next — see{" "}
          <code className="font-mono text-sm">docs/ARCHITECTURE.md</code>.
        </p>
      </Container>
    </main>
  );
}
