import type { BlogPosting, Graph, Person, Thing, WebSite } from "schema-dts";

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
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.x,
    ].filter(Boolean),
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
}): BlogPosting {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@id": personId },
    publisher: { "@id": personId },
    isPartOf: { "@id": websiteId },
  };
}

/** Combines several schemas into one `@graph`, which is the preferred shape. */
export function buildGraph(...nodes: Thing[]): Graph {
  return { "@context": "https://schema.org", "@graph": nodes };
}
