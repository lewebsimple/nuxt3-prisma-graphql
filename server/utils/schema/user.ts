import { builder } from "../schema";
import { UserRole } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export const UserSchema = () => {
  builder.enumType(UserRole, {
    name: "UserRole",
  });

  builder.prismaNode("User", {
    findUnique: (id) => ({ id: Number.parseInt(id) }),
    id: { resolve: (user) => user.id },
    fields: (t) => ({
      email: t.exposeString("email"),
      role: t.field({
        type: UserRole,
        resolve: ({ role }) => role,
      }),
    }),
  });

  builder.queryField("users", (t) =>
    t.prismaConnection({
      type: "User",
      cursor: "id",
      resolve: (query) => prisma.user.findMany({ ...query }),
    }),
  );
};
