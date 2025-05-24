import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-css-tags": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-inline-styles": "off", // Disable inline styles warning
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off", // Disable explicit any warnings
      "react/no-unknown-property": [
        "error",
        { ignore: ["transform", "backfaceVisibility", "willChange"] },
      ],
      "react/forbid-dom-props": "off", // Allow inline styles for CSS Grid positioning
      "react/no-inline-styles": "off", // Allow inline styles
    },
  },
];

export default eslintConfig;
