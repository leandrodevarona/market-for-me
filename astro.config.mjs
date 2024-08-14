import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import auth from "auth-astro";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  scopedStyleStrategy: "class",
  experimental: {
    serverIslands: true,
    actions: true,
  },
  integrations: [auth(), icon()],
});
