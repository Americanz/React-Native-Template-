import React from "react";
import { ViewStyle } from "react-native";
import { observer } from "mobx-react-lite";
import { Toggle } from "app/components/Toggle";
import { useTheme } from "app/theme/colors";

export const ThemeToggle = observer(function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  console.log("ThemeToggle rendering. Current theme:", theme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("Toggling theme to:", newTheme);
    setTheme(newTheme);
  };

  return (
    <Toggle
      variant="switch"
      switchAccessibilityMode="text"
      containerStyle={$containerStyle}
      value={theme === "dark"}
      onValueChange={toggleTheme}
      label={theme === "dark" ? "Dark Mode" : "Light Mode"}
      accessibilityLabel={`Switch to ${
        theme === "dark" ? "Light" : "Dark"
      } Mode`}
    />
  );
});

const $containerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};
