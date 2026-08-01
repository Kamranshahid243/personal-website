import { z } from "zod";

/**
 * Frontmatter contract for MDX articles.
 *
 * Validating at read time means a typo in a date or a missing description
 * fails the build with the offending filename, instead of rendering an empty
 * `<meta>` tag in production. This is the closest thing to a schema-backed CMS
 * that costs nothing to run.
 */
export const postFrontmatterSchema = z.object({
  title: z.string().min(1).max(120),
  /** Doubles as the meta description and the card excerpt. */
  description: z.string().min(1).max(200),
  /** ISO date, e.g. 2026-01-31. */
  publishedAt: z.iso.date(),
  updatedAt: z.iso.date().optional(),
  tags: z.array(z.string()).default([]),
  /** Hidden from listings and excluded from the sitemap, but reachable by URL. */
  draft: z.boolean().default(false),
  /** Pins a post to the top of the writing index. */
  featured: z.boolean().default(false),
  image: z.string().optional(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
