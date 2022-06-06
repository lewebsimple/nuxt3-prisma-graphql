import { createServer } from "@graphql-yoga/node";
import { initContextCache } from "@pothos/core";
import { schema, Context } from "~/server/utils/schema";

export default defineEventHandler(async (event) => {
  const server = createServer<Context>({
    context: { ...initContextCache() },
    graphiql: { defaultQuery: `{ version }`, endpoint: "/api/graphql" },
    schema,
  });
  return server.handle(event.req, event.res);
});
