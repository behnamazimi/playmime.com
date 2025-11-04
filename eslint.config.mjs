import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  },
  {
    ignores: [
      ".next",
      "**/node_modules/",
      "**/public",
      "**/*.d.ts",
      ".swc",
      "data",
      ".vercel",
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "react/prop-types": "off",
      "no-unused-expressions": [
        "error",
        {
          allowTernary: true,
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
