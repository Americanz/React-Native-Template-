import React, { ReactNode } from "react";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "../colors";

const ThemedApp: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { paperTheme } = useTheme();

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
};

export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <ThemedApp>{children}</ThemedApp>
    </ThemeProvider>
  );
};
