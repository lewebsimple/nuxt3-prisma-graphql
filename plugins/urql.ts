import urql, { cacheExchange, dedupExchange, fetchExchange, ssrExchange, subscriptionExchange } from "@urql/vue";
import { createClient as createWSClient } from "graphql-ws";
import { WebSocket } from "ws";

export default defineNuxtPlugin((nuxtApp) => {
  const { graphqlApiURL } = useRuntimeConfig();

  // Create SSR exchange
  const ssr = ssrExchange({
    isClient: process.client,
  });

  // Extract SSR payload once app is rendered on the server
  if (process.server) {
    nuxtApp.hook("app:rendered", () => {
      nuxtApp.payload?.data && (nuxtApp.payload.data.urql = ssr.extractData());
    });
  }

  // Restore SSR payload once app is created on the client
  if (process.client) {
    nuxtApp.hook("app:created", () => {
      nuxtApp.payload?.data && ssr.restoreData(nuxtApp.payload.data.urql);
    });
  }

  // Subscription over WebSocket exchange
  const wsClient = createWSClient({
    url: graphqlApiURL.replace("http", "ws"),
    webSocketImpl: process.server && WebSocket,
  });
  const wsExchange = subscriptionExchange({
    forwardSubscription(operation) {
      return {
        subscribe: (sink) => {
          const dispose = wsClient.subscribe(operation, sink);
          return {
            unsubscribe: dispose,
          };
        },
      };
    },
  });

  // Custom exchanges
  const exchanges = [dedupExchange, cacheExchange, ssr, fetchExchange, wsExchange];

  nuxtApp.vueApp.use(urql, {
    url: graphqlApiURL || "http://localhost:3000/api/graphql",
    exchanges,
  });
});
