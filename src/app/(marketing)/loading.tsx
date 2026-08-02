import { Container } from "@/components/layout/container";

/**
 * Lightweight pending UI for marketing navigations.
 * Matches surface tokens so it never flashes a different visual language.
 */
export default function MarketingLoading() {
  return (
    <div className="flex-1 py-section" aria-busy="true" aria-live="polite">
      <Container width="wide" className="grid gap-6">
        <div className="h-10 w-48 animate-pulse rounded-(--radius-md) bg-surface-sunken" />
        <div className="h-16 max-w-2xl animate-pulse rounded-(--radius-md) bg-surface-sunken" />
        <div className="h-24 max-w-xl animate-pulse rounded-(--radius-md) bg-surface-sunken" />
        <span className="sr-only">Loading</span>
      </Container>
    </div>
  );
}
