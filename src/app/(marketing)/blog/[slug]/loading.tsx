import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function BlogPostLoading() {
  return (
    <Section spacing="lg" aria-busy="true" aria-live="polite">
      <Container width="prose" className="grid gap-4">
        <div className="h-4 w-32 animate-pulse rounded bg-surface-sunken" />
        <div className="h-12 max-w-xl animate-pulse rounded bg-surface-sunken" />
        <div className="h-6 max-w-lg animate-pulse rounded bg-surface-sunken" />
        <div className="mt-8 h-64 animate-pulse rounded-(--radius-lg) bg-surface-sunken" />
        <span className="sr-only">Loading article</span>
      </Container>
    </Section>
  );
}
