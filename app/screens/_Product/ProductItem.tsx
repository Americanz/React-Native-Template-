import React from "react";
import { View, Image, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Text } from "../../components";
import { Product } from "../../types/product";
import { colors, spacing } from "../../theme";
import { Card,  Paragraph, TouchableRipple } from "react-native-paper";

interface ProductItemProps {
  product: Product;
  onPress: () => void;
}

const productPlaceholder = require("../../../assets/images/product-placeholder.webp");

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onPress,
}) => {
  return (
    <Card style={$productItem}>
      <TouchableRipple onPress={onPress}>
        <Card.Content style={$cardContent}>
          <Image source={productPlaceholder} style={$logo} />
          <View style={$productInfo}>
            <Text style={$productName}>
              {product.id}. {product.name}
            </Text>
            <Paragraph style={$productBarcode}>{product.barcode}</Paragraph>
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
      </TouchableRipple>
    </Card>
  );
};

const $productItem: ViewStyle = {
  marginBottom: spacing.xs,
  elevation: 1,
};

const $cardContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.sm,
};

const $logo: ImageStyle = {
  marginEnd: spacing.md,
  alignContent: "center",
  height: 48,
  width: 48,
};

const $productInfo: ViewStyle = {
  flex: 1,
};

const $productName: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: spacing.xxs,
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

const $productCategory: TextStyle = {
  fontSize: 12,
  color: colors.palette.primary500,
};
