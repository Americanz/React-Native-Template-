import { types, Instance } from "mobx-state-tree";

export const UserModel = types.model("User", {
  id: types.identifierNumber,
  username: types.maybe(types.string),
  email: types.maybe(types.string),
  authToken: types.maybe(types.string),
  refreshToken: types.maybe(types.string),
  lastLogin: types.maybe(types.string),
});

export interface User extends Instance<typeof UserModel> {}

export const Models = {
  User: UserModel,
};
