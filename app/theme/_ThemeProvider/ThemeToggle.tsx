import React from "react";
import { ViewStyle } from "react-native";
import { observer } from "mobx-react-lite";
import { Toggle } from "../../components/Toggle";
import { useStores } from "../../models";
import { colors, spacing } from "../../theme";

interface ThemeToggleProps {
  style?: ViewStyle;
}

export const ThemeToggle = observer(function ThemeToggle(
  props: ThemeToggleProps
) {
  const { style } = props;
  const { themeStore } = useStores();

  const $containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    ...style,
  };

  return (
    <Toggle
      variant="switch"
      containerStyle={$containerStyle}
      value={themeStore.theme === "dark"}
      onValueChange={() =>
        themeStore.setTheme(themeStore.theme === "dark" ? "light" : "dark")
      }
      inputOuterStyle={{
        backgroundColor: colors.palette.neutral300,
        borderColor: colors.palette.neutral400,
      }}
      inputInnerStyle={{
        backgroundColor: colors.palette.secondary500,
      }}
      inputDetailStyle={{
        backgroundColor: colors.palette.neutral100,
      }}
      labelPosition="left"
      label="Dark Mode"
      labelStyle={{
        color: colors.text,
        marginRight: spacing.md,
      }}
    />
  );
});
