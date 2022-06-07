import { config } from "dotenv";
import Prisma, * as PrismaScope from "@prisma/client";
export const { PrismaClient } = Prisma || PrismaScope;

// Load process.env.DATABASE_URL from .env
config();

export const prisma = process.env.DATABASE_URL && new PrismaClient();
