import SchemaBuilder from "@pothos/core";
import * as types from "./types";

// GraphQL context type
export type Context = {};

// Pothos GraphQL schema builder
export const builder = new SchemaBuilder<{
  Context: Context;
}>({});

// Default Query / Mutation / Subscriptions
builder.queryType({});
//builder.mutationType({});
//builder.subscriptionType({});

// Execute schema types
Object.values(types).forEach((type) => type());

// Build GraphQL schema
export const schema = builder.toSchema({});
