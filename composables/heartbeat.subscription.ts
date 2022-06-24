import * as Types from "../generated/schema";

import { DocumentNode } from "graphql";
import * as Urql from "@urql/vue";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type HearbeatSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type HearbeatSubscription = { __typename?: "Subscription"; heartbeat: boolean };

export const HearbeatDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "Hearbeat" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "heartbeat" } }],
      },
    },
  ],
} as unknown as DocumentNode;

export function useHearbeatSubscription<R = HearbeatSubscription>(
  options: Omit<Urql.UseSubscriptionArgs<never, HearbeatSubscriptionVariables>, "query"> = {},
  handler?: Urql.SubscriptionHandlerArg<HearbeatSubscription, R>,
) {
  return Urql.useSubscription<HearbeatSubscription, R, HearbeatSubscriptionVariables>(
    { query: HearbeatDocument, ...options },
    handler,
  );
}
