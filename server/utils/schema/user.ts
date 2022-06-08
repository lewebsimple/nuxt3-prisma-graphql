import { builder } from "../schema";
import { UserRole } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export const UserSchema = () => {
  builder.enumType(UserRole, {
    name: "UserRole",
  });

  builder.prismaNode("User", {
    authScopes: (user, { auth }) => {
      if (user.id === auth.user?.id) return true;
      return { hasUserRole: "EDITOR" };
    },
    findUnique: (id) => ({ id: parseInt(id) }),
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
      authScopes: { hasUserRole: "EDITOR" },
      cursor: "id",
      totalCount: () => prisma.user.count(),
      resolve: (query, _parent) => prisma.user.findMany({ ...query }),
    }),
  );
};
