import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ["@urql/vue"],
  },
  graphqlCodegen: { devOnly: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-graphql-codegen", "~/modules/ws.ts"],
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
