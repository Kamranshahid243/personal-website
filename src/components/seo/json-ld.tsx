import type { Graph } from "schema-dts";

/**
 * Renders a JSON-LD graph into the document.
 *
 * A plain `<script type="application/ld+json">` is used rather than
 * next/script: structured data must be present in the initial HTML for
 * crawlers, and it has no execution cost, so deferring it would only make it
 * less reliable.
 *
 * Serialised JSON escapes `<` so a content string cannot prematurely close the
 * script tag even if a future CMS source is less trusted than today's data.
 */
export function JsonLd({ graph }: { graph: Graph }) {
  const json = JSON.stringify(graph)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
