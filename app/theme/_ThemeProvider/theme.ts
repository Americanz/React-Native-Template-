import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1e88e5",
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    error: "#d32f2f",
    onError: "#ffffff",
    // Add more custom colors as needed
  },
};

export const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#90caf9",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
    error: "#cf6679",
    onError: "#000000",
    // Add more custom colors as needed
  },
};
