import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthenticationStoreModel } from "./AuthenticationStore";
import { EpisodeStoreModel } from "./EpisodeStore";

import { ProductStoreModel } from "./_product/ProductStore";
import { ThemeStoreModel } from "./_theme";

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
  productStore: types.optional(ProductStoreModel, {}),
  themeStore: types.optional(ThemeStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
