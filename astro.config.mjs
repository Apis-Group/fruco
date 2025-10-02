import path from "path";

import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [preact({ compat: true })],
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    optimizeDeps: {
      include: ["gsap"],
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: [
            "console.log",
            "console.info",
            "console.debug",
            "console.warn",
          ],
          dead_code: true,
          unused: true,
        },
        mangle: {
          toplevel: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ["gsap", "gsap/ScrollTrigger"],
            "preact-vendor": ["preact", "preact/hooks"],
          },
        },
        treeshake: {
          preset: "recommended",
          pureExternalModules: true,
        },
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
});
