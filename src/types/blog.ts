import type { PostFrontmatter } from "@/lib/content/schema";

/** A post with its raw MDX body, as returned by `getPostBySlug`. */
export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  /** Whole minutes, floored at 1. */
  readingTime: number;
};

/** A post without its body — everything a listing card needs, nothing more. */
export type PostSummary = Omit<Post, "content">;
