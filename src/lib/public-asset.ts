import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

/** True when a root-relative public path exists on disk. */
export function publicAssetExists(src: string | undefined | null): boolean {
  if (!src || !src.startsWith("/")) return false;
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}
