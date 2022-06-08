import { builder } from "../schema";
import { UserRole } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { encryptPassword } from "../password";

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

  builder.mutationField("userCreate", (t) =>
    t.prismaField({
      type: "User",
      authScopes: { hasUserRole: "EDITOR" },
      args: {
        email: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: (query, _parent, { email, password }) =>
        prisma.user.create({ ...query, data: { email, password: encryptPassword(password) } }),
    }),
  );
};
