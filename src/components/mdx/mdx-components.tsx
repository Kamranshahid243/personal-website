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
 * Visual styling stays in `src/styles/prose.css` under `.prose`; this file
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
 * height={630} />`. Prefer this when you know intrinsic dimensions.
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

/**
 * Markdown `![alt](src)` images. Local paths use next/image with a stable
 * aspect box to avoid CLS; remote URLs stay lazy-loaded native images.
 */
function MarkdownImage({
  src,
  alt = "",
  width,
  height,
  className,
  ...props
}: ComponentProps<"img">) {
  if (!src || typeof src !== "string") return null;

  const parsedWidth =
    typeof width === "string" ? Number.parseInt(width, 10) : width;
  const parsedHeight =
    typeof height === "string" ? Number.parseInt(height, 10) : height;
  const hasDimensions =
    typeof parsedWidth === "number" &&
    Number.isFinite(parsedWidth) &&
    typeof parsedHeight === "number" &&
    Number.isFinite(parsedHeight);

  if (src.startsWith("/") && hasDimensions) {
    return (
      <Image
        src={src}
        alt={alt}
        width={parsedWidth}
        height={parsedHeight}
        sizes="(max-width: 768px) 100vw, 42rem"
        className={cn("h-auto w-full", className)}
      />
    );
  }

  if (src.startsWith("/")) {
    return (
      <span className="relative block aspect-video w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 42rem"
          className={cn("object-cover", className)}
        />
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote MDX assets
    <img
      src={src}
      alt={alt}
      width={parsedWidth}
      height={parsedHeight}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  img: MarkdownImage,
  Img,
};
