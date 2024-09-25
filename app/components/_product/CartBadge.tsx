import React, { FC } from "react";
import { ViewStyle } from "react-native";
import { Badge, Button } from "react-native-paper";
import { spacing } from "app/theme";

interface CartBadgeProps {
  itemCount: number;
  onPress: () => void;
}

export const CartBadge: FC<CartBadgeProps> = ({ itemCount, onPress }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      icon="cart"
      style={$cartButton}
      labelStyle={$cartButtonLabel}
    >
      Cart
      {itemCount > 0 && (
        <Badge size={20} style={$badge}>
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

const $cartButton: ViewStyle = {
  marginRight: spacing.xs,
};

const $cartButtonLabel: ViewStyle = {
  marginRight: spacing.lg,
};

const $badge: ViewStyle = {
  position: "absolute",
  top: 15,
  left: -25,

};

export default CartBadge;
