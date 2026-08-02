import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function ProjectLoading() {
  return (
    <Section spacing="lg" aria-busy="true" aria-live="polite">
      <Container width="content" className="grid gap-4">
        <div className="h-4 w-28 animate-pulse rounded bg-surface-sunken" />
        <div className="h-12 max-w-xl animate-pulse rounded bg-surface-sunken" />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="h-20 animate-pulse rounded-(--radius-lg) bg-surface-sunken" />
          <div className="h-20 animate-pulse rounded-(--radius-lg) bg-surface-sunken" />
          <div className="h-20 animate-pulse rounded-(--radius-lg) bg-surface-sunken" />
        </div>
        <span className="sr-only">Loading case study</span>
      </Container>
    </Section>
  );
}
