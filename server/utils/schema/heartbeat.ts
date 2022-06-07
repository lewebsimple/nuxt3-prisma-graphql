import { builder } from "../schema";
import { pubsub } from "../pubsub";

export const HeartbeatSchema = () => {
  builder.subscriptionField("heartbeat", (t) =>
    t.boolean({
      subscribe: () => ({
        [Symbol.asyncIterator]: () => pubsub.asyncIterator<{ heartbeat: boolean }>(["heartbeat"]),
      }),
      resolve: (data: { heartbeat: boolean }) => data.heartbeat,
    }),
  );
};
