import type { IncomingMessage } from "http";
import { parse } from "cookie-es";
import { z } from "zod";
import { prisma } from "../../prisma/client";
import { UserModel } from "../../prisma/zod";
import { decodeJwt, jwtCookieName } from "./jwt";

// Authenticated user schema
export const authUserSchema = UserModel.omit({ password: true });
export type AuthUser = z.infer<typeof authUserSchema>;

// Authentication state schema
export const authStateSchema = z.object({ user: authUserSchema.nullable() });
export type AuthState = z.infer<typeof authStateSchema>;

// Initialize auth state from request
export async function initAuthState(req: IncomingMessage): Promise<AuthState> {
  try {
    const cookies = parse(req.headers.cookie || "") as Record<string, string>;
    const auth = decodeJwt(cookies[jwtCookieName] || "");
    auth.user && (await prisma.user.findFirst({ where: { ...auth.user }, rejectOnNotFound: true }));
    return auth;
  } catch (e) {
    return { user: null };
  }
}
