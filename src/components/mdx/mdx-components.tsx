import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Element overrides for MDX content.
 *
 * The mapping exists so an article can be written in plain markdown while
 * still rendering with the app's components — an author never has to think
 * about `next/link`, and no internal link in an article can trigger a full
 * page reload.
 *
 * Visual styling stays in `src/styles/typography.css` under `.prose`; this file
 * only handles behaviour and structure.
 */

function Anchor({ href = "", ...props }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    // MDX hrefs are authored strings, so they cannot be checked by
    // `typedRoutes`; broken internal links are caught by the link checker in
    // CI instead.
    return <Link href={href as Route} {...props} />;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/**
 * Optimised image for use inside MDX: `<Img src="..." alt="..." width={1200}
 * height={630} />`. Markdown's `![alt](src)` syntax cannot carry intrinsic
 * dimensions, so it stays a plain `<img>` and is styled by `.prose`.
 */
function Img({ className, alt, ...props }: ImageProps) {
  return (
    <Image
      className={cn("h-auto w-full", className)}
      // Articles render in a single column at the prose measure, so this is
      // accurate and lets the browser choose a candidate before layout.
      sizes="(max-width: 768px) 100vw, 42rem"
      alt={alt}
      {...props}
    />
  );
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  Img,
};
