export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  userCreate: User;
};

export type MutationUserCreateArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Node = {
  id: Scalars["ID"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["ID"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["ID"]>;
};

export type Query = {
  __typename?: "Query";
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  users: QueryUsersConnection;
  /** Current package name and version */
  version: Scalars["String"];
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QueryNodesArgs = {
  ids: Array<Scalars["ID"]>;
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars["ID"]>;
  before?: InputMaybe<Scalars["ID"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryUsersConnection = {
  __typename?: "QueryUsersConnection";
  edges: Array<Maybe<QueryUsersConnectionEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

export type QueryUsersConnectionEdge = {
  __typename?: "QueryUsersConnectionEdge";
  cursor: Scalars["ID"];
  node: User;
};

export type Subscription = {
  __typename?: "Subscription";
  heartbeat: Scalars["Boolean"];
};

export type User = Node & {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["ID"];
  role: UserRole;
};

export enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Guest = "GUEST",
  Unverified = "UNVERIFIED",
}
