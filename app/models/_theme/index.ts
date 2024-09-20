import { Instance, types } from "mobx-state-tree";

export const ThemeStoreModel = types
  .model("ThemeStore")
  .props({
    theme: types.optional(
      types.enumeration(["light", "dark", "system"]),
      "system"
    ),
  })
  .actions((self) => ({
    setTheme(newTheme: "light" | "dark" | "system") {
      self.theme = newTheme;
      console.log("New theme set:", newTheme); 
    },
    toggleTheme() {
      if (self.theme === "light") self.theme = "dark";
      else if (self.theme === "dark") self.theme = "light";
      // If the theme is "system", we don't change it when toggling
    },
  }));

type ThemeStoreType = Instance<typeof ThemeStoreModel>;
export interface ThemeStore extends ThemeStoreType {}

export default ThemeStoreModel;
