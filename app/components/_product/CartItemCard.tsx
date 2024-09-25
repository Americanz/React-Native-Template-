import React from "react";
import { View, ViewStyle, TextStyle, Image, ImageStyle } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { Text } from "app/components";
import { Product } from "app/types/product";
import { spacing, colors } from "app/theme";
import { QuantityControl } from "./QuantityControl";

interface CartItemCardProps {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  additionalContent?: React.ReactNode;
}

const productPlaceholder = require("../../../assets/images/product-placeholder.webp");

export const CartItemCard: React.FC<CartItemCardProps> = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  additionalContent,
}) => {
  const priceAttribute = product.attribute.find(
    (attr) => attr.alias === "price"
  );
  const price = priceAttribute ? Number(priceAttribute.value) : 0;

  return (
    <Card style={$cartItem}>
      <Card.Content>
        <View style={$itemRow}>
          <Image source={productPlaceholder} style={$logo} />
          <View style={$itemInfo}>
            <Text style={$itemName} text={product.name} />
            <Paragraph style={$productBarcode}>{product.barcode}</Paragraph>
            <Paragraph style={$productDetails}>
              {product.attribute
                .map((attr) => `${attr.alias}: ${attr.value}`)
                .join(", ")}
            </Paragraph>
            <Text style={$itemPrice} text={`${price.toFixed(2)} ₴`} />
          </View>
          <QuantityControl
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            minQuantity={1}
          />
        </View>
      </Card.Content>
      {additionalContent && <Card.Actions>{additionalContent}</Card.Actions>}
    </Card>
  );
};

const $cartItem: ViewStyle = {
  marginBottom: spacing.sm,
};

const $itemRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const $itemInfo: ViewStyle = {
  flex: 1,
};

const $itemName: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
};

const $itemPrice: TextStyle = {
  fontSize: 14,
  color: colors.error,
};

const $logo: ImageStyle = {
  marginEnd: spacing.md,
  alignContent: "center",
  height: 48,
  width: 48,
};

const $productBarcode: TextStyle = {
  fontSize: 14,
  color: colors.textDim,
  marginBottom: spacing.xxs,
};

const $productDetails: TextStyle = {
  fontSize: 12,
  color: colors.textDim,
  marginBottom: spacing.xxs,
};
