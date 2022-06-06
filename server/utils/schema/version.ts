import { builder } from "~/server/utils/schema";
import { name, version } from "~/package.json";

export const VersionSchema = () => {
  builder.queryField("version", (t) =>
    t.string({
      description: "Current package name and version",
      resolve: () => `${name} v${version}`,
    }),
  );
};
