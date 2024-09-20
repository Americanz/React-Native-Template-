import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { palette, Palette } from "./palette";
import { observer } from "mobx-react-lite";
import { userStore } from "../utils/storage/_user/UserStore";

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

    useEffect(() => {
      if (userStore.userInfo.theme === "system") {
        userStore.setTheme(colorScheme === "dark" ? "dark" : "light");
      }
    }, [colorScheme]);

    const isDark =
      userStore.userInfo.theme === "dark" ||
      (userStore.userInfo.theme === "system" && colorScheme === "dark");

    const colors = getColors(isDark);

    const contextValue: ThemeContextType = {
      theme: userStore.userInfo.theme,
      isDark,
      colors,
      toggleTheme: () => {
        const newTheme = isDark ? "light" : "dark";
        userStore.setTheme(newTheme);
      },
      setTheme: (theme) => userStore.setTheme(theme),
    };

    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
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
