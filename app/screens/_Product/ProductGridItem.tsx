import React from "react";
import {
  ViewStyle,
  useWindowDimensions,
  TextStyle,
  ImageStyle,
  View,
} from "react-native";
import { Text, Card } from "react-native-paper";
import { Product } from "app/types/product";
import { colors, spacing } from "app/theme";
import { AddToCartButton } from "app/components/_product/AddToCartButton";

interface ProductGridItemProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onQuantityChange: () => void;
  quantity: number;
  numColumns: number;
}

const productPlaceholder = require("../../../assets/images/product-placeholder.webp");

export const ProductGridItem: React.FC<ProductGridItemProps> = ({
  product,
  onPress,
  onAddToCart,
  onRemoveFromCart,
  onQuantityChange,
  quantity,
  numColumns,
}) => {
  const { width } = useWindowDimensions();
  const itemWidth = (width - spacing.sm * (numColumns + 1)) / numColumns;

  return (
    <Card style={[$container, { width: itemWidth }]} onPress={onPress}>
      <Card.Cover
        source={productPlaceholder}
        style={$image}
        resizeMode="contain"
      />
      <Card.Content style={$content}>
        <Text style={$name} numberOfLines={2}>
          {product.name}
        </Text>
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

const $container: ViewStyle = {
  margin: spacing.xs,
  elevation: 2,
};

const $image: ImageStyle = {
  height: 88,
};

const $content: ViewStyle = {
  padding: spacing.xs,
};

const $name: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  marginBottom: spacing.xxs,
};

const $actions: ViewStyle = {
  justifyContent: "center",
};

export default ProductGridItem;
