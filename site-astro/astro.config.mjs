import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/style/global.scss";',
        },
      },
    },
  },
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
    }),
  ],
});
