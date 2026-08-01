import type { Graph } from "schema-dts";

/**
 * Renders a JSON-LD graph into the document.
 *
 * A plain `<script type="application/ld+json">` is used rather than
 * next/script: structured data must be present in the initial HTML for
 * crawlers, and it has no execution cost, so deferring it would only make it
 * less reliable.
 *
 * `JSON.stringify` output is inserted as-is. The input is always
 * developer-authored data from `src/lib/seo/json-ld.ts`, never user input; if
 * that ever changes, the `<` characters must be escaped first.
 */
export function JsonLd({ graph }: { graph: Graph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
