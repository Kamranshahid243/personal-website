import type { Metadata } from "next";

import { NotFoundPanel } from "@/components/common/not-found-panel";
import { Section } from "@/components/layout/section";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Article not found",
  description: "That post does not exist, is still a draft, or the URL has changed.",
  pathname: "/blog",
  noIndex: true,
});

export default function BlogPostNotFound() {
  return (
    <Section spacing="lg" className="grid min-h-[50vh] place-items-center">
      <NotFoundPanel
        heading="Article not found"
        description="That post does not exist, is still a draft, or the URL has changed."
        primaryLabel="Browse articles"
        primaryHref="/blog"
      />
    </Section>
  );
}
