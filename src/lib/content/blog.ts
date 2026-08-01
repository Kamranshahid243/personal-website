import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import readingTime from "reading-time";

import { postFrontmatterSchema } from "@/lib/content/schema";
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

/** Every published post, newest first. Drafts are excluded in production. */
export const getAllPosts = cache(async (): Promise<PostSummary[]> => {
  const slugs = await listSlugs();
  const posts = await Promise.all(slugs.map(readPost));

  return posts
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.draft || process.env.NODE_ENV === "development")
    .map(({ content: _content, ...summary }) => summary)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
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
