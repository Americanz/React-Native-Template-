import React from "react";
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { colors, spacing } from "app/theme";

interface DateHeaderProps {
  date: string;
  count: number;
  isExpanded: boolean;
  onPress: () => void;
}

export function DateHeader({
  date,
  count,
  isExpanded,
  onPress,
}: DateHeaderProps) {
  return (
    <TouchableOpacity onPress={onPress} style={$container}>
      <View style={$line} />
      <View style={$textContainer}>
        <Text style={$dateText}>{date}</Text>
        <Text style={$countText}>({count} orders)</Text>
      </View>
      <View style={$line} />
      <Text style={$expandIcon}>{isExpanded ? "▲" : "▼"}</Text>
    </TouchableOpacity>
  );
}

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: spacing.medium,
  paddingHorizontal: spacing.medium,
};

const $line: ViewStyle = {
  flex: 1,
  height: 1,
  backgroundColor: colors.line,
};

const $textContainer: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.small,
};

const $dateText: TextStyle = {
  color: colors.text,
  fontWeight: "bold",
  marginRight: spacing.tiny,
};

const $countText: TextStyle = {
  color: colors.dim,
};

const $expandIcon: TextStyle = {
  marginLeft: spacing.small,
  color: colors.dim,
};
