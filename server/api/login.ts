import { prisma } from "../../prisma/client";
import { setAuthState } from "../utils/jwt";
import { verifyPassword } from "../utils/password";

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await useBody(event);
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw new Error("User does not exist.");
    if (!verifyPassword(password, user.password)) throw new Error("Invalid password");
    return setAuthState({ user }, event);
  } catch (error) {
    event.res.statusCode = 401;
    event.res.statusMessage = (error as Error).message;
    return setAuthState({ user: null }, event);
  }
});
