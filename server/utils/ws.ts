import type { Server } from "http";
import { initContextCache } from "@pothos/core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { execute, subscribe } from "graphql";
import { pubsub } from "./pubsub";
import { schema } from "./schema";

export async function initWsServer(server: Server) {
  const wsServer = new WebSocketServer({ server, path: "/api/graphql" });
  useServer(
    {
      context: () => ({ ...initContextCache() }),
      execute,
      subscribe,
      schema,
    },
    wsServer,
  );
  setInterval(() => pubsub.publish("heartbeat", { heartbeat: true }), 5000);
}
