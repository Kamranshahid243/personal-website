import type { Metadata } from "next";

import { NotFoundPanel } from "@/components/common/not-found-panel";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Page not found",
  description: "That page has moved or never existed.",
  pathname: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center">
      <NotFoundPanel
        heading="Page not found"
        description="That page has moved or never existed."
        primaryLabel="Back to home"
        primaryHref="/"
      />
    </main>
  );
}
