export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * Rough GitHub-style slug used by `rehype-slug`, so TOC anchors match the
 * compiled heading ids without running the full rehype pipeline twice.
 */
export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Pull h2/h3 headings from raw MDX for the article table of contents.
 *
 * Intentionally ignores fenced code blocks so commented markdown inside
 * examples does not pollute the outline.
 */
export function extractHeadings(source: string): TocHeading[] {
  const withoutCode = source.replace(/```[\s\S]*?```/g, "");
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();
  const pattern = /^(#{2,3})\s+(.+?)\s*$/gm;

  for (const match of withoutCode.matchAll(pattern)) {
    const marks = match[1];
    const raw = match[2];
    if (!marks || !raw) continue;

    const level = marks.length as 2 | 3;
    const text = raw
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_~]/g, "")
      .trim();

    if (!text) continue;

    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;

    headings.push({ id, text, level });
  }

  return headings;
}
