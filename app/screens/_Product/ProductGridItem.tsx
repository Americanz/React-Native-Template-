import React from "react";
import {
  ViewStyle,
  useWindowDimensions,
  TextStyle,
  ImageStyle,
  Image,
  View,
} from "react-native";
import { Text } from "../../components";
import { Product } from "../../types/product";
import { colors, spacing } from "../../theme";
import { Card, TouchableRipple } from "react-native-paper";

interface ProductGridItemProps {
  product: Product;
  onPress: () => void;
  numColumns: number;
}

const productPlaceholder = require("../../../assets/images/product-placeholder.webp");

export const ProductGridItem: React.FC<ProductGridItemProps> = ({
  product,
  onPress,
  numColumns,
}) => {
  const { width } = useWindowDimensions();
  const itemWidth = (width - spacing.sm * (numColumns + 1)) / numColumns;

  return (
    <Card style={[$container, { width: itemWidth }]}>
      <TouchableRipple onPress={onPress}>
        <View style={$contentWrapper}>
          <Card.Content style={$content}>
            <Image
              style={$image}
              source={productPlaceholder}
              resizeMode="contain"
            />
            <Text style={$name} numberOfLines={2} text={product.name} />
            {/* <Text style={$price} text={`${product.price} грн`} /> */}
          </Card.Content>
        </View>
      </TouchableRipple>
    </Card>
  );
};

const $container: ViewStyle = {
  margin: spacing.xs,
  elevation: 2,
  borderRadius: 8,
};

const $contentWrapper: ViewStyle = {
  overflow: "hidden",
  borderRadius: 8,
};

const $image: ImageStyle = {
  alignSelf: "center",
  height: 88,
  width: "100%",
//   marginBottom: spacing.xxl,
};

const $content: ViewStyle = {
  padding: spacing.xs,
};

const $name: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  marginBottom: spacing.xxs,
};

const $price: TextStyle = {
  fontSize: 14,
  color: colors.palette.primary500,
};

export default ProductGridItem;
