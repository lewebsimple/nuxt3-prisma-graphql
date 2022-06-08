import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import { UserRole } from "@prisma/client";
import PrismaTypes from "../../prisma/pothos";
import { prisma } from "../../prisma/client";
import { AuthState } from "./auth";
import * as types from "./types";

// GraphQL context type
export type Context = {
  auth: AuthState;
};

// Pothos GraphQL schema builder
export const builder = new SchemaBuilder<{
  AuthScopes: {
    isAuthenticated: boolean;
    hasUserRole: UserRole;
  };
  Context: Context;
  PrismaTypes: PrismaTypes;
}>({
  plugins: [ScopeAuthPlugin, PrismaPlugin, RelayPlugin],
  authScopes: async (context) => ({
    isAuthenticated: !!context.auth.user,
    hasUserRole: (role) => ["ADMIN", role].includes(context.auth.user?.role || ""),
  }),
  prisma: { client: prisma },
  relayOptions: {
    cursorType: "ID",
    encodeGlobalID: (typename: string, id: string | number | bigint) => `${typename}:${id}`,
    decodeGlobalID: (globalID: string) => {
      const [typename, id] = globalID.split(":");
      return { typename, id };
    },
  },
});

// Default Query / Mutation / Subscriptions
builder.queryType({});
builder.mutationType({});
builder.subscriptionType({});

// Execute schema types
Object.values(types).forEach((type) => type());

// Build GraphQL schema
export const schema = builder.toSchema({});
