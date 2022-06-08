import * as Types from "../generated/schema";

import { DocumentNode } from "graphql";
import * as Urql from "@urql/vue";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type VersionQueryVariables = Types.Exact<{ [key: string]: never }>;

export type VersionQuery = { __typename?: "Query"; version: string };

export const VersionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Version" },
      selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "version" } }] },
    },
  ],
} as unknown as DocumentNode;

export function useVersionQuery(options: Omit<Urql.UseQueryArgs<never, VersionQueryVariables>, "query"> = {}) {
  return Urql.useQuery<VersionQuery>({ query: VersionDocument, ...options });
}
