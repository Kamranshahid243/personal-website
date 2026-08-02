import type { Metadata } from "next";

import { NotFoundPanel } from "@/components/common/not-found-panel";
import { Section } from "@/components/layout/section";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Project not found",
  description: "That case study does not exist or the URL has changed.",
  pathname: "/projects",
  noIndex: true,
});

export default function ProjectNotFound() {
  return (
    <Section spacing="lg" className="grid min-h-[50vh] place-items-center">
      <NotFoundPanel
        heading="Project not found"
        description="That case study does not exist or the URL has changed."
        primaryLabel="Browse projects"
        primaryHref="/projects"
      />
    </Section>
  );
}
