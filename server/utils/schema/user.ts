import { builder } from "../schema";
import { UserRole } from "@prisma/client";

export const UserSchema = () => {
  builder.enumType(UserRole, {
    name: "UserRole",
  });
  builder.prismaObject("User", {
    findUnique: (user) => ({ id: user.id }),
    fields: (t) => ({
      id: t.exposeID("id"),
      email: t.exposeString("email"),
      role: t.field({
        type: UserRole,
        resolve: ({ role }) => role,
      }),
    }),
  });
};
