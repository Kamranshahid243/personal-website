/**
 * Small, locale-aware formatters.
 *
 * Kept free of React so they can run on the server during static generation
 * and in client components without pulling a date library into either bundle.
 */

const monthYearFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const longDateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** `2024-03` or `2024-03-15` → `Mar 2024`. Always UTC so SSR and client agree. */
export function formatMonthYear(iso: string): string {
  return monthYearFormatter.format(parseIsoDate(iso));
}

/** `2024-03-15` → `15 March 2024`. */
export function formatLongDate(iso: string): string {
  return longDateFormatter.format(parseIsoDate(iso));
}

/**
 * An experience date range. Omitting `end` means the role is current and
 * renders as "Present".
 */
export function formatDateRange(start: string, end?: string): string {
  const from = formatMonthYear(start);
  const to = end ? formatMonthYear(end) : "Present";
  return `${from} – ${to}`;
}

/** `3` → `3 min read`. */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

function parseIsoDate(iso: string): Date {
  // Bare `YYYY-MM` is valid ISO-8601 month form; append a day so Date parses
  // it as UTC midnight rather than local midnight of an undefined day.
  const normalised = /^\d{4}-\d{2}$/.test(iso) ? `${iso}-01` : iso;
  const date = new Date(`${normalised}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ISO date: ${iso}`);
  }
  return date;
}
