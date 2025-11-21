import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Archivos a ignorar
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.astro/**",
      "**/public/**",
      "**/.vercel/**",
      "**/coverage/**",
    ],
  },

  // Configuración base de ESLint
  eslint.configs.recommended,

  // Configuración de TypeScript
  ...tseslint.configs.recommended,

  // Configuración de Astro
  ...eslintPluginAstro.configs.recommended,

  // Configuración general para archivos JS/TS
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // Mejores prácticas generales
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // Configuración específica para archivos Astro
  {
    files: ["**/*.astro"],
    rules: {
      // Deshabilitar reglas que causan problemas en archivos .astro
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Deshabilitar reglas de formato que maneja Prettier
  eslintConfigPrettier,
]);
