import { createServer } from "@graphql-yoga/node";
import { initContextCache } from "@pothos/core";
import { schema, Context } from "../utils/schema";

export default defineEventHandler(async (event) => {
  const server = createServer<Context>({
    context: { ...initContextCache(), auth: event.context.auth },
    graphiql: {
      defaultQuery: `{ version }`,
      endpoint: "/api/graphql",
      subscriptionsProtocol: "WS",
    },
    schema,
  });
  return server.handle(event.req, event.res);
});
