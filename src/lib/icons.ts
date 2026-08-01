import {
  Briefcase,
  Code,
  Gauge,
  Layers,
  Pencil,
  Rocket,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";

/**
 * Named Lucide icons referenced from content data.
 *
 * Services store an icon as a string (`"rocket"`) rather than a component so
 * `src/data` stays serialisable and reviewable as plain data. This map is the
 * only place that string is resolved — adding a new icon is one entry here,
 * not a change to every consumer.
 */
const icons = {
  briefcase: Briefcase,
  code: Code,
  gauge: Gauge,
  layers: Layers,
  pencil: Pencil,
  rocket: Rocket,
  sparkles: Sparkles,
  terminal: Terminal,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function getIcon(name: string): LucideIcon {
  if (name in icons) {
    return icons[name as IconName];
  }
  // Unknown names fall back rather than crashing a page — a mistyped icon in
  // content should never take down the services grid.
  return Sparkles;
}
