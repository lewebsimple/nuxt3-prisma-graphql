import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ["@urql/vue"],
  },
  graphqlCodegen: { devOnly: true },
  modules: ["nuxt-graphql-codegen", "~/modules/ws.ts"],
  publicRuntimeConfig: {
    graphqlApiURL: process.env.GRAPHQL_API_URL || "http://localhost:3000/api/graphql",
  },
});
