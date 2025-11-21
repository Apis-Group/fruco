/** @type {import("prettier").Config} */
export default {
  // Configuración básica
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",

  // Plugins
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],

  // Configuración específica por tipo de archivo
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
