import type { Prisma, User } from "@prisma/client";
export default interface PrismaTypes {
  User: {
    Name: "User";
    Shape: User;
    Include: never;
    Select: Prisma.UserSelect;
    Where: Prisma.UserWhereUniqueInput;
    Fields: never;
    RelationName: never;
    ListRelations: never;
    Relations: {};
  };
}
