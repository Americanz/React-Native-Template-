// types/drizzleMigrations.ts
import { types, Instance } from "mobx-state-tree";

export const DrizzleMigrationsModel = types.model("DrizzleMigrations", {
  id: types.identifierNumber,
  hash: types.string,
  created_at: types.maybe(types.number),
});

export interface DrizzleMigrations
  extends Instance<typeof DrizzleMigrationsModel> {}

export const Models = {
  DrizzleMigrations: DrizzleMigrationsModel,
};
