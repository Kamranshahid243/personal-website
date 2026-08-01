import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";

import { mdxComponents } from "@/components/mdx/mdx-components";
import { mdxOptions } from "@/lib/mdx/options";
import { cn } from "@/lib/utils";

/**
 * Compiles and renders an MDX article body.
 *
 * A React Server Component: the markdown parser, the plugin chain and Shiki
 * all run on the server at build time, and the browser receives finished HTML.
 * This is the reason the blog can have full syntax highlighting without adding
 * a byte to the client bundle.
 */
export async function MdxContent({
  source,
  components,
  className,
}: {
  source: string;
  components?: MDXComponents;
  className?: string;
}) {
  return (
    <div className={cn("prose", className)}>
      <MDXRemote
        source={source}
        components={{ ...mdxComponents, ...components }}
        options={{ mdxOptions }}
      />
    </div>
  );
}
