import React, { createContext, useState, useContext, ReactNode } from "react";
import { lightColors, darkColors } from "../colors";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  themeType: ThemeType;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeType, setThemeType] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setThemeType((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const colors = themeType === "light" ? lightColors : darkColors;


  const contextValue: ThemeContextType = {
    themeType,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
