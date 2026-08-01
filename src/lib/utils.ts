import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom type scale from `tokens/typography.css`.
 *
 * Without this, `tailwind-merge` treats `text-display-lg` as a colour (same
 * group as `text-text`) and drops the font-size — every Display/Heading on the
 * site collapses to body size. Keep this list in sync with the token file.
 */
const fontSizes = [
  "display-xl",
  "display-lg",
  "display-md",
  "display-sm",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "body-lg",
  "body-md",
  "body-sm",
  "caption",
  "eyebrow",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...fontSizes] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
