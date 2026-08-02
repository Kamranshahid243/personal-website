import type {
  BlogPosting,
  BreadcrumbList,
  CollectionPage,
  CreativeWork,
  Graph,
  ItemList,
  Person,
  Thing,
  WebSite,
} from "schema-dts";

import { siteConfig } from "@/config/site";

/**
 * Structured data builders.
 *
 * Schema.org markup is what lets Google render a rich result and what lets an
 * LLM-backed search surface answer "who is this person and what do they do".
 * For a site whose job is inbound leads, that is not optional polish.
 *
 * Each builder returns a plain object; `<JsonLd />` serialises it into the
 * page. Types come from `schema-dts`, so a mistyped property is a build error
 * rather than silently invalid markup.
 */

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

export function personSchema(): Person {
  const sameAs = [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.x,
  ].filter(Boolean);

  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    ...(siteConfig.portrait
      ? { image: new URL(siteConfig.portrait, siteConfig.url).toString() }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteSchema(): WebSite {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.locale.replace("_", "-"),
    publisher: { "@id": personId },
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  image?: string;
}): BlogPosting {
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: siteConfig.locale.replace("_", "-"),
    keywords: post.keywords?.join(", "),
    articleSection: post.articleSection,
    wordCount: post.wordCount,
    image: post.image
      ? new URL(post.image, siteConfig.url).toString()
      : undefined,
    author: { "@id": personId },
    publisher: { "@id": personId },
    isPartOf: { "@id": websiteId },
  };
}

export function creativeWorkSchema(project: {
  name: string;
  description: string;
  slug: string;
  datePublished: string;
  keywords?: string[];
  genre?: string;
  image?: string;
  about?: string;
}): CreativeWork {
  const url = `${siteConfig.url}/projects/${project.slug}`;

  return {
    "@type": "CreativeWork",
    "@id": `${url}#case-study`,
    name: project.name,
    headline: project.name,
    description: project.description,
    url,
    mainEntityOfPage: url,
    datePublished: project.datePublished,
    inLanguage: siteConfig.locale.replace("_", "-"),
    genre: project.genre,
    about: project.about,
    image: project.image
      ? new URL(project.image, siteConfig.url).toString()
      : undefined,
    author: { "@id": personId },
    creator: { "@id": personId },
    publisher: { "@id": personId },
    keywords: project.keywords?.join(", "),
    isPartOf: { "@id": websiteId },
  };
}

export function breadcrumbSchema(
  items: readonly { name: string; path: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

/**
 * Index page structured data — CollectionPage + ItemList of child URLs.
 * Helps crawlers understand listing pages without inventing FAQ markup.
 */
export function collectionPageSchema(options: {
  name: string;
  description: string;
  path: string;
  items: readonly { name: string; path: string }[];
}): CollectionPage {
  const url = new URL(options.path, siteConfig.url).toString();
  const itemList: ItemList = {
    "@type": "ItemList",
    numberOfItems: options.items.length,
    itemListElement: options.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };

  return {
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: options.name,
    description: options.description,
    url,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: itemList,
  };
}

/** Combines several schemas into one `@graph`, which is the preferred shape. */
export function buildGraph(...nodes: Thing[]): Graph {
  return { "@context": "https://schema.org", "@graph": nodes };
}
