import { useTheme as usePaperTheme } from "react-native-paper";

export const useTheme = () => {
  const theme = usePaperTheme();

  const toggleTheme = () => {
    // This is a placeholder. You'll need to implement the actual theme toggling logic
    console.log("Theme toggle functionality to be implemented");
  };

  return {
    ...theme,
    toggleTheme,
  };
};
