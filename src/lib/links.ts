/**
 * Link hygiene for config-driven URLs.
 *
 * Placeholder handles (`/username`, example.com) ship in the template and must
 * never render as live outbound links — they destroy trust on a first visit.
 */

const PLACEHOLDER_PATTERNS = [
  /example\.com/i,
  /\/username(?:\/|$)/i,
  /^https?:\/\/github\.com\/?$/i,
  /^https?:\/\/(www\.)?linkedin\.com\/?$/i,
  /^https?:\/\/(www\.)?x\.com\/?$/i,
  /^https?:\/\/(www\.)?twitter\.com\/?$/i,
];

export function isUsableHref(href: string | undefined | null): boolean {
  if (!href) return false;
  const trimmed = href.trim();
  if (!trimmed) return false;
  return !PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(trimmed));
}
