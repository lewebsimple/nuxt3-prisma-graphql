import * as z from "zod";
import { UserRole } from "@prisma/client";

export const UserModel = z.object({
  id: z.number().int(),
  email: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
});
