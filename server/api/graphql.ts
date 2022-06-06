import { createServer } from "@graphql-yoga/node";

export default defineEventHandler(async (event) => {
  const server = createServer({
    graphiql: { endpoint: "/api/graphql" },
  });
  return server.handle(event.req, event.res);
});
