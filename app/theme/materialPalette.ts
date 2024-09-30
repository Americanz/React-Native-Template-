import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const createMaterialPalette = (isDark: boolean) => {
  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  return {
    // Ваші поточні назви кольорів, мапнуті на кольори Material Design
    neutral100: theme.colors.background,
    neutral200: theme.colors.surfaceVariant,
    neutral300: theme.colors.surfaceVariant,
    neutral400: theme.colors.outline,
    neutral500: theme.colors.onSurfaceVariant,
    neutral600: theme.colors.onSurface,
    neutral700: theme.colors.onSurface,
    neutral800: theme.colors.onBackground,
    neutral900: theme.colors.onBackground,

    primary100: theme.colors.primaryContainer,
    primary200: theme.colors.primary,
    primary300: theme.colors.primary,
    primary400: theme.colors.primary,
    primary500: theme.colors.primary,
    primary600: theme.colors.primary,

    secondary100: theme.colors.secondaryContainer,
    secondary200: theme.colors.secondary,
    secondary300: theme.colors.secondary,
    secondary400: theme.colors.secondary,
    secondary500: theme.colors.secondary,

    accent100: theme.colors.tertiaryContainer,
    accent200: theme.colors.tertiary,
    accent300: theme.colors.tertiary,
    accent400: theme.colors.tertiary,
    accent500: theme.colors.tertiary,

    angry100: theme.colors.errorContainer,
    angry500: theme.colors.error,

    success50: theme.colors.primaryContainer,
    success100: theme.colors.primary,
    success200: theme.colors.primary,
    success300: theme.colors.primary,
    success400: theme.colors.primary,
    success500: theme.colors.primary,
    success600: theme.colors.primary,
    success700: theme.colors.primary,
    success800: theme.colors.primary,
    success900: theme.colors.primary,

    overlay20: `rgba(${theme.colors.onSurface}, 0.2)`,
    overlay50: `rgba(${theme.colors.onSurface}, 0.5)`,
  };
};

export type MaterialPalette = ReturnType<typeof createMaterialPalette>;

export { createMaterialPalette };
