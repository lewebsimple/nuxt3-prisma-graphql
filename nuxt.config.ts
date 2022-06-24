import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ["@heroicons/vue", "@urql/vue"],
  },
  components: {
    dirs: ["~/components", { path: "node_modules/@heroicons/vue/outline/esm", prefix: "hero" }],
  },
  graphqlCodegen: { devOnly: true },
  modules: ["@formkit/nuxt", "@nuxtjs/tailwindcss", "nuxt-graphql-codegen", "~/modules/ws.ts"],
  publicRuntimeConfig: {
    graphqlApiURL: process.env.GRAPHQL_API_URL || "http://localhost:3000/api/graphql",
  },
  tailwindcss: {
    cssPath: "~/assets/styles/_main.scss",
    viewer: false,
  },
  vite: {
    css: { devSourcemap: true },
  },
});
