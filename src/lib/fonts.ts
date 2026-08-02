import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

/**
 * Typefaces, self-hosted via next/font.
 *
 * next/font subsets, preloads and emits a `size-adjust` fallback at build time,
 * so there is no third-party request and no cumulative layout shift when the
 * webfont swaps in. The variables (`--font-geist-sans`, `--font-geist-mono`)
 * are mapped onto the `--font-sans` / `--font-mono` design tokens in
 * `src/styles/tokens.css`.
 *
 * Swapping in a different face is a change to this file plus that token block,
 * and nothing else.
 */
export const fontVariables = [
  GeistSans.variable,
  GeistMono.variable,
].join(" ");

/** Expose the resolved family names for edge OG routes that cannot use CSS vars. */
export const fontFamilies = {
  sans: GeistSans.style.fontFamily,
  mono: GeistMono.style.fontFamily,
} as const;
