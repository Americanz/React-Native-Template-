// types/baseModel.ts
import { types } from "mobx-state-tree";

export const BaseModel = types.model({
  id: types.identifierNumber,
  createdAt: types.maybe(types.string),
  updatedAt: types.maybe(types.string),
});
