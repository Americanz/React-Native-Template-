import React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { IconButton } from "react-native-paper";
import { Text } from "app/components";
import { spacing } from "app/theme";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 0,
  maxQuantity = Infinity,
}) => {
  return (
    <View style={$container}>
      <IconButton
        icon="minus"
        size={20}
        onPress={onDecrease}
        disabled={quantity <= minQuantity}
      />
      <Text style={$quantityText} text={quantity.toString()} />
      <IconButton
        icon="plus"
        size={20}
        onPress={onIncrease}
        disabled={quantity >= maxQuantity}
      />
    </View>
  );
};

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

const $quantityText: TextStyle = {
  fontSize: 16,
  marginHorizontal: spacing.xs,
};
