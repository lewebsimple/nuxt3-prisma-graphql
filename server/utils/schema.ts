import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaTypes from "../../prisma/pothos";
import { prisma } from "../../prisma/client";
import * as types from "./types";

// GraphQL context type
export type Context = {};

// Pothos GraphQL schema builder
export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: { client: prisma },
});

// Default Query / Mutation / Subscriptions
builder.queryType({});
//builder.mutationType({});
builder.subscriptionType({});

// Execute schema types
Object.values(types).forEach((type) => type());

// Build GraphQL schema
export const schema = builder.toSchema({});
