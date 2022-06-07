import { createPubSub } from "@graphql-yoga/node";

export const pubsub = createPubSub<{
  heartbeat: [{ heartbeat: boolean }];
}>();
