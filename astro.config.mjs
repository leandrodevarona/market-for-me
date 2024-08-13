import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  scopedStyleStrategy: "class",
  experimental: {
    serverIslands: true,
  },
  integrations: [auth()],
});
