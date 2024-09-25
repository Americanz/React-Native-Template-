import React from "react";
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { colors, spacing } from "app/theme";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  style?: ViewStyle;
}

export function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  style,
}: QuantityControlProps) {
  return (
    <View style={[$container, style]}>
      <TouchableOpacity style={$button} onPress={onDecrease}>
        <Text text="-" style={$buttonText} />
      </TouchableOpacity>
      <View style={$quantityContainer}>
        <Text text={quantity.toString()} style={$quantityText} />
      </View>
      <TouchableOpacity style={$button} onPress={onIncrease}>
        <Text text="+" style={$buttonText} />
      </TouchableOpacity>
    </View>
  );
}

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
  borderRadius: 4,
  overflow: "hidden",
};

const $button: ViewStyle = {
  padding: spacing.xs,
  backgroundColor: colors.palette.neutral300,
};

const $buttonText: TextStyle = {
  fontSize: 20,
  color: colors.text,
};

const $quantityContainer: ViewStyle = {
  paddingHorizontal: spacing.sm,
  minWidth: 40,
  alignItems: "center",
};

const $quantityText: TextStyle = {
  fontSize: 16,
};
