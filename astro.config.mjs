import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import auth from "auth-astro";

import icon from "astro-icon";

const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  scopedStyleStrategy: "class",
  experimental: {
    serverIslands: true,
  },
  integrations: [auth(), icon()],
  site: isProd ? "https://marketsforme.store/" : "http://localhost:4321/",
  image: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },
});
