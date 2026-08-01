import { Container } from "@/components/layout/container";
import { Display, Eyebrow, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

/**
 * Placeholder home route.
 *
 * The architecture and design system are in place but no pages have been
 * designed yet. This file exists only so the app has a valid root route, and
 * is replaced by `src/app/(marketing)/page.tsx` once the home page is built.
 */
export default function Page() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center">
      <Container
        width="prose"
        className="flex flex-col items-center gap-(--spacing-stack-md) text-center"
      >
        <Eyebrow>Scaffold ready</Eyebrow>
        <Display size="sm">{siteConfig.name}</Display>
        <Text tone="muted">
          Architecture and design system are set up. Pages are next — see{" "}
          <code className="font-mono text-sm">docs/DESIGN-SYSTEM.md</code>.
        </Text>
      </Container>
    </main>
  );
}
