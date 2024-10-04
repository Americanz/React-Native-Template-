import React, { ReactNode, useMemo, createContext, useContext, useEffect } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import {
  Theme as NavigationTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { createMaterialPalette } from "./materialPalette";

type ThemeType = "light" | "dark";

const createNavigationColors = (isDarkMode: boolean) => {
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  return {
    primary: paperTheme.colors.primary,
    background: paperTheme.colors.background,
    card: paperTheme.colors.elevation.level2,
    text: paperTheme.colors.onBackground,
    border: paperTheme.colors.outline,
    notification: paperTheme.colors.error,
  };
};

const getColors = (isDarkMode: boolean) => {
  console.log("getColors called with isDarkMode:", isDarkMode);
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const materialPalette = createMaterialPalette(isDarkMode);

  return {
    palette: materialPalette,
    transparent: "rgba(0, 0, 0, 0)",
    text: paperTheme.colors.onBackground,
    textDim: paperTheme.colors.onSurfaceVariant,
    background: paperTheme.colors.background,
    background2: materialPalette.accent400,
    border: paperTheme.colors.outline,
    tint: paperTheme.colors.primary,
    separator: paperTheme.colors.outlineVariant,
    error: paperTheme.colors.error,
    errorBackground: paperTheme.colors.errorContainer,
  };
};

export type Colors = ReturnType<typeof getColors>;
export type NavigationColors = ReturnType<typeof createNavigationColors>;

const colorsProxy = new Proxy({} as Colors, {
  get(target, prop) {
    if (Object.keys(target).length === 0) {
      Object.assign(target, getColors(false));
    }
    return Reflect.get(target, prop);
  },
});

export const colors: Colors = colorsProxy;

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  colors: Colors;
  setTheme: (theme: ThemeType) => void;
  navigationColors: NavigationColors;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = observer(
  ({ children }) => {
    const { themeStore } = useStores();
    const isDark = themeStore.theme === "dark";

    useEffect(() => {
      console.log("Theme effect triggered. Theme:", themeStore.theme, "isDark:", isDark);
      const newColors = getColors(isDark);
      Object.assign(colorsProxy, newColors);
    }, [themeStore.theme, isDark]);

    const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;
    const navigationColors = useMemo(() => createNavigationColors(isDark), [isDark]);

    const navigationTheme: NavigationTheme = {
      dark: isDark,
      colors: navigationColors,
    };

    const themeContextValue: ThemeContextType = {
      theme: themeStore.theme as ThemeType,
      isDark,
      colors: colorsProxy,
      setTheme: themeStore.setTheme,
      navigationColors,
    };

    return (
      <ThemeContext.Provider value={themeContextValue}>
        <NavigationThemeProvider value={navigationTheme}>
          <PaperProvider theme={paperTheme}>{children}</PaperProvider>
        </NavigationThemeProvider>
      </ThemeContext.Provider>
    );
  }
);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useColors = () => {
  const { colors } = useTheme();
  return colors;
};
