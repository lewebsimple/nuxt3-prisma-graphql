import { defineNuxtModule } from "@nuxt/kit";
import { initWsServer } from "../server/utils/ws";

export default defineNuxtModule({
  setup(_options, nuxt) {
    nuxt.hook("listen", (server) => initWsServer(server));
  },
});
