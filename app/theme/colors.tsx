import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { palette, Palette } from "./palette";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";

const getColors = (isDarkMode: boolean) => {
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  return {
    palette,
    transparent: "rgba(0, 0, 0, 0)",
    text: paperTheme.colors.onBackground,
    textDim: paperTheme.colors.onSurfaceVariant,
    background: paperTheme.colors.background,
    background2: palette.accent400,
    border: paperTheme.colors.outline,
    tint: paperTheme.colors.primary,
    separator: paperTheme.colors.outlineVariant,
    error: paperTheme.colors.error,
    errorBackground: paperTheme.colors.errorContainer,
  };
};

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  colors: ReturnType<typeof getColors>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = observer(
  ({ children }) => {
    const colorScheme = useColorScheme();
    const { themeStore } = useStores();

    useEffect(() => {
      if (themeStore.theme === "system") {
        themeStore.setTheme(colorScheme === "dark" ? "dark" : "light");
      }
    }, [colorScheme, themeStore]);

    const isDark =
      themeStore.theme === "dark" ||
      (themeStore.theme === "system" && colorScheme === "dark");

    const colors = getColors(isDark);
    const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;

    const contextValue: ThemeContextType = {
      theme: themeStore.theme,
      isDark,
      colors,
      toggleTheme: themeStore.toggleTheme,
      setTheme: themeStore.setTheme,
    };

    return (
      <ThemeContext.Provider value={contextValue}>
        <PaperProvider theme={paperTheme}>{children}</PaperProvider>
      </ThemeContext.Provider>
    );
  }
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useColors = () => {
  const { colors } = useTheme();
  return colors;
};

export const colors = getColors(false);

export type Colors = ReturnType<typeof getColors>;

export type { Palette };
