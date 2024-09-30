import React, { FC } from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { Badge, Button } from "react-native-paper";
import { spacing } from "app/theme";

interface CartBadgeProps {
  itemCount: number;
  onPress: () => void;
}

export const CartBadge: FC<CartBadgeProps> = ({ itemCount, onPress }) => {
  return (
    <View style={$container}>
      <Button
        mode="contained"
        onPress={onPress}
        icon="cart"
        style={$cartButton}
        labelStyle={$cartButtonLabel}
      >
        Cart
      </Button>
      {itemCount > 0 && (
        <Badge size={20} style={$badge}>
          {itemCount}
        </Badge>
      )}
    </View>
  );
};

const $container: ViewStyle = {
  position: "relative",
  marginRight: spacing.xs,
};

const $cartButton: ViewStyle = {
  // Видаліть marginRight звідси, якщо він більше не потрібен
};

const $cartButtonLabel: TextStyle = {
  marginRight: spacing.lg,
};

const $badge: ViewStyle = {
  position: "absolute",
  top: -5,
  right: 8,
  zIndex: 1,
};

export default CartBadge;
