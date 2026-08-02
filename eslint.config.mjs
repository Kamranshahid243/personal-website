import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),

  ...nextVitals,
  ...nextTs,

  {
    rules: {
      // `import type` keeps type-only imports out of the runtime bundle.
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Keeps module graph readable and refactor-safe.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../*"],
              message:
                "Use the '@/' path alias instead of reaching up more than one directory.",
            },
          ],
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  {
    // Generated/vendored shadcn primitives: kept as close to upstream as
    // possible so `shadcn add --overwrite` stays a no-drama operation.
    files: ["src/components/ui/**"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },

  // Must stay last: disables every rule that would fight Prettier.
  prettier,
]);

export default eslintConfig;
