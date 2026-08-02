import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import readingTime from "reading-time";

import { postFrontmatterSchema } from "@/lib/content/schema";
import type { BlogCategory } from "@/lib/content/schema";
import type { Post, PostSummary } from "@/types/blog";

/**
 * File-system backed content layer for the blog.
 *
 * Deliberately not a CMS and not a build-time codegen step: articles are MDX
 * files in git, reviewed in pull requests, and read here at build time. That
 * keeps the whole pipeline debuggable, diffable and dependency-free.
 *
 * `server-only` makes it a build error to import this from a client component,
 * which is the guardrail that stops `node:fs` ending up in a browser bundle.
 *
 * Every reader is wrapped in React's `cache()` so a page that calls
 * `getPostBySlug` and `getAllPosts` still touches the disk once per render.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MDX_EXTENSION = ".mdx";

/** Page size for the writing index. */
export const POSTS_PER_PAGE = 4;

async function listSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(MDX_EXTENSION))
      .map((entry) => entry.name.slice(0, -MDX_EXTENSION.length));
  } catch (error) {
    // An empty content directory is a valid state, not a failure.
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function readPost(slug: string): Promise<Post | null> {
  let raw: string;
  try {
    raw = await readFile(
      path.join(CONTENT_DIR, `${slug}${MDX_EXTENSION}`),
      "utf8",
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }

  const { data, content } = matter(raw);
  const parsed = postFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}${MDX_EXTENSION}:\n${JSON.stringify(
        parsed.error.issues,
        null,
        2,
      )}`,
    );
  }

  return {
    slug,
    ...parsed.data,
    content,
    readingTime: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

/** Every published post, featured first then newest. Drafts excluded in prod. */
export const getAllPosts = cache(async (): Promise<PostSummary[]> => {
  const slugs = await listSlugs();
  const posts = await Promise.all(slugs.map(readPost));

  return posts
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.draft || process.env.NODE_ENV === "development")
    .map(({ content: _content, ...summary }) => summary)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.publishedAt.localeCompare(a.publishedAt);
    });
});

/** A single post including its raw MDX body. `null` when the slug is unknown. */
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> =>
  readPost(slug),
);

/** Powers `generateStaticParams`, so every article is prerendered. */
export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
});

/** Tag counts for the writing index filter, most used first. */
export const getAllTags = cache(
  async (): Promise<{ tag: string; count: number }[]> => {
    const posts = await getAllPosts();
    const counts = new Map<string, number>();

    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }

    return [...counts.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  },
);

/** Category counts for the writing index filter. */
export const getAllCategories = cache(
  async (): Promise<{ category: BlogCategory; count: number }[]> => {
    const posts = await getAllPosts();
    const counts = new Map<BlogCategory, number>();

    for (const post of posts) {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }

    return [...counts.entries()]
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
  },
);

export type PostFilters = {
  query?: string;
  tag?: string;
  category?: string;
};

/** Filter the index by search text, tag, and/or category. */
export function filterPosts(
  posts: readonly PostSummary[],
  filters: PostFilters,
): PostSummary[] {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const tag = filters.tag?.trim();
  const category = filters.category?.trim();

  return posts.filter((post) => {
    if (category && post.category !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    if (!query) return true;

    const haystack = [
      post.title,
      post.description,
      post.category,
      ...post.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export type PaginatedPosts = {
  posts: PostSummary[];
  page: number;
  pageCount: number;
  total: number;
};

/** Slice a filtered list into a page for the writing index. */
export function paginatePosts(
  posts: readonly PostSummary[],
  page = 1,
  pageSize = POSTS_PER_PAGE,
): PaginatedPosts {
  const total = posts.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;

  return {
    posts: posts.slice(start, start + pageSize),
    page: safePage,
    pageCount,
    total,
  };
}

/** Related articles: shared tags first, then same category, then recent. */
export async function getRelatedPosts(
  post: Pick<PostSummary, "slug" | "tags" | "category">,
  limit = 2,
): Promise<PostSummary[]> {
  const posts = await getAllPosts();

  return posts
    .filter((entry) => entry.slug !== post.slug)
    .map((entry) => {
      const tagOverlap = entry.tags.filter((tag) =>
        post.tags.includes(tag),
      ).length;
      const categoryBonus = entry.category === post.category ? 2 : 0;
      return { entry, score: tagOverlap * 3 + categoryBonus };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.entry.publishedAt.localeCompare(a.entry.publishedAt);
    })
    .slice(0, limit)
    .map(({ entry }) => entry);
}

/**
 * Adjacent posts in chronological order (newest → oldest listing).
 * `newer` is the previous item in that list; `older` is the next.
 */
export async function getAdjacentPosts(slug: string): Promise<{
  newer: PostSummary | null;
  older: PostSummary | null;
}> {
  const posts = await getAllPosts();
  const chronological = [...posts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const index = chronological.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { newer: null, older: null };
  }

  return {
    newer: chronological[index - 1] ?? null,
    older: chronological[index + 1] ?? null,
  };
}
