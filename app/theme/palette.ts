export const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  success50: "#64ff66",
  success100: "#42ff45",
  success200: "#21fe25",
  success300: "#08f60c",
  success400: "#07d50a",
  success500: "#0bbc0e",
  success600: "#0fa511",
  success700: "#118e13",
  success800: "#127914",
  success900: "#136414",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const;

export type Palette = typeof palette;
