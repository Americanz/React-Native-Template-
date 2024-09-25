import React, { FC } from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { Card, Text, Paragraph } from "react-native-paper";
import { Product } from "app/types/product";
import { colors, spacing } from "app/theme";
import { AddToCartButton } from "app/components/_product/AddToCartButton";

interface ProductItemProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onQuantityChange: () => void;
  quantity: number;
}

const productPlaceholder = require("../../../assets/images/product-placeholder.webp");

export const ProductItem: FC<ProductItemProps> = ({
  product,
  onPress,
  onAddToCart,
  onRemoveFromCart,
  onQuantityChange,
  quantity,
}) => {
  return (
    <Card style={$productItem} onPress={onPress}>
      <Card.Content style={$cardContent}>
        <Card.Cover source={productPlaceholder} style={$logo} />
        <View style={$productInfo}>
          <Text style={$productName}>
            {product.id}. {product.name}
          </Text>
          <Paragraph style={$productDetails}>
            {product.attribute
              .map((attr) => `${attr.alias}: ${attr.value}`)
              .join(", ")}
          </Paragraph>
          <Paragraph style={$productCategory}>
            {product.category?.name}
          </Paragraph>
        </View>
      </Card.Content>
      <Card.Actions style={$actions}>
        <AddToCartButton
          onPress={onAddToCart}
          onDecrement={onRemoveFromCart}
          onQuantityChange={onQuantityChange}
          quantity={quantity}
        />
      </Card.Actions>
    </Card>
  );
};

const $productItem: ViewStyle = {
  marginBottom: spacing.xs,
};

const $cardContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.sm,
};

const $logo: ViewStyle = {
  width: 60,
  height: 60,
  marginRight: spacing.sm,
};

const $productInfo: ViewStyle = {
  flex: 1,
};

const $productName: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
};

const $productDetails: TextStyle = {
  fontSize: 10,
  color: colors.textDim,
  marginBottom: spacing.xxs,
};

const $productCategory: TextStyle = {
  fontSize: 10,
  color: colors.palette.primary500,
};

const $actions: ViewStyle = {
  justifyContent: "flex-end",
};

export default ProductItem;
