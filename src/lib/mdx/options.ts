import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

/**
 * The MDX compilation pipeline, defined once and shared by every consumer.
 *
 * All of this runs at build time on the server, so the browser downloads plain
 * HTML: no markdown parser and no syntax highlighter ship to the client.
 */

const prettyCodeOptions: PrettyCodeOptions = {
  /* Both themes are compiled into CSS variables, and `src/styles/typography.css`
     picks one based on the active colour scheme. Highlighting therefore costs
     nothing at runtime and switches instantly with the theme. */
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: { block: "text", inline: "text" },
  onVisitLine(node) {
    // Without this, empty lines collapse and the copy-paste output is wrong.
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = [
      ...((node.properties.className as string[] | undefined) ?? []),
      "line--highlighted",
    ];
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word--highlighted"];
  },
};

export const mdxOptions: {
  remarkPlugins: PluggableList;
  rehypePlugins: PluggableList;
} = {
  remarkPlugins: [
    // GitHub-flavoured markdown: tables, strikethrough, task lists, autolinks.
    remarkGfm,
  ],
  rehypePlugins: [
    // `rehypeSlug` must run before autolink so the anchors have ids to target.
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: { className: ["heading-anchor"] },
      },
    ],
    [rehypePrettyCode, prettyCodeOptions],
  ],
};
