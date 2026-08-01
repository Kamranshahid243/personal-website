import { z } from "zod";

/**
 * Environment variable contract.
 *
 * Parsed once, at module load, so a missing or malformed variable fails the
 * build with a readable message instead of surfacing as `undefined` in
 * production. Import `env` rather than touching `process.env` anywhere else —
 * that is the only way the types stay honest.
 *
 * Next.js inlines `process.env.NEXT_PUBLIC_*` at build time only when it is
 * referenced statically, hence the explicit property access below rather than
 * passing `process.env` wholesale.
 */

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .url()
    .default("http://localhost:3000")
    // A trailing slash breaks naive URL concatenation in metadata and sitemaps.
    .transform((value) => value.replace(/\/$/, "")),
});

const parsed = z
  .object({ ...serverSchema.shape, ...clientSchema.shape })
  .safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    z.flattenError(parsed.error).fieldErrors,
  );
  throw new Error("Invalid environment variables. See .env.example.");
}

export const env = parsed.data;
