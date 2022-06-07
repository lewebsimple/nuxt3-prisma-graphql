import { builder } from "../schema";
import { pubsub } from "../pubsub";

export const HeartbeatSchema = () => {
  builder.subscriptionField("heartbeat", (t) =>
    t.boolean({
      subscribe: () => ({
        [Symbol.asyncIterator]: () => pubsub.subscribe("heartbeat"),
      }),
      resolve: (data: { heartbeat: boolean }) => data.heartbeat,
    }),
  );
};
