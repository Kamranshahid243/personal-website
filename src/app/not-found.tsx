import type { Metadata } from "next";

import { GrainOverlay } from "@/components/common/animated-background";
import { NotFoundPanel } from "@/components/common/not-found-panel";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Section } from "@/components/layout/section";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Page not found",
  description: "That page has moved or never existed.",
  pathname: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main id="main" className="relative flex-1">
        <Section spacing="lg" className="grid min-h-[60svh] place-items-center">
          <NotFoundPanel
            heading="Page not found"
            description="That page has moved or never existed."
            primaryLabel="Back to home"
            primaryHref="/"
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
