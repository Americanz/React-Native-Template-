import { Instance, types } from "mobx-state-tree";

export const ThemeStoreModel = types
  .model("ThemeStore")
  .props({
    theme: types.optional(types.enumeration(["light", "dark"]), "light"),
  })
  .actions((self) => ({
    setTheme(newTheme: "light" | "dark") {
      self.theme = newTheme;
    },
    toggleTheme() {
      self.theme = self.theme === "light" ? "dark" : "light";
    },
  }));

type ThemeStoreType = Instance<typeof ThemeStoreModel>;
export interface ThemeStore extends ThemeStoreType {}

export default ThemeStoreModel;
