import { CompatibilityEvent } from "h3";
import { CookieSerializeOptions } from "cookie-es";
import jwt, { SignOptions } from "jsonwebtoken";
import { authStateSchema, AuthState } from "./auth";

const jwtSecretKey = process.env.JWT_SECRET_KEY || "jwtsecretkey";

export function decodeJwt(token: string): AuthState {
  try {
    const auth = jwt.verify(token, jwtSecretKey) as AuthState;
    return authStateSchema.parse(auth);
  } catch (error) {
    return { user: null };
  }
}

export const jwtCookieName = process.env.JWT_COOKIE_NAME || "jwt";
const jwtSignOptions: SignOptions = { expiresIn: "2h" };
const jwtCookieOptions: CookieSerializeOptions = { path: "/", httpOnly: true };

export function setAuthState(auth: AuthState, event: CompatibilityEvent): AuthState {
  const result = authStateSchema.safeParse(auth);
  auth = result.success ? result.data : { user: null };
  const token = jwt.sign(auth, jwtSecretKey, jwtSignOptions);
  setCookie(event, jwtCookieName, token, jwtCookieOptions);
  return auth;
}
