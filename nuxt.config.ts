import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  graphqlCodegen: { devOnly: true },
  modules: ["nuxt-graphql-codegen", "~/modules/ws.ts"],
});
