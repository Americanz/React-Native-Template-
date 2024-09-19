import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Icon, AutoImage } from "../../components";
import { colors, spacing } from "../../theme";
import { Product } from "../../types/product";

const placeholderImage = require("../../../assets/images/product-placeholder.png");

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onToggleFavorite,
}) => {
  const priceAttribute = product.attribute.find(
    (attr) => attr.name === "price"
  );
  const discountAttribute = product.attribute.find(
    (attr) => attr.name === "discount"
  );

  const price = priceAttribute ? Number(priceAttribute.value) : 0;
  const discount = discountAttribute ? Number(discountAttribute.value) : 0;


  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(product)}>
      <View style={styles.imageContainer}>
        <AutoImage
          //   source={{ uri: imageUrl }}
          defaultSource={placeholderImage}
          maxWidth={200}
          maxHeight={200}
          style={styles.image}
        />
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text text={`-${discount}%`} style={styles.discountText} />
          </View>
        )}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(product)}
        >
          <Icon icon="heartOutline" color={colors.palette.neutral800} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text text={product.name} style={styles.name} numberOfLines={2} />
        <Text
          text={`${price.toFixed(2)} ${product.currency}`}
          style={styles.price}
        />
        {discount > 0 && (
          <Text
            text={`${(price * (1 - discount / 100)).toFixed(2)} ${
              product.currency
            }`}
            style={styles.discountPrice}
          />
        )}
        <Text text={product.code} style={styles.unit} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    elevation: 2,
    flex: 1,
    margin: spacing.xs,
    overflow: "hidden",
    shadowColor: colors.palette.neutral800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  discountBadge: {
    backgroundColor: colors.error,
    borderRadius: 4,
    left: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    position: "absolute",
    top: spacing.xs,
  },
  discountPrice: {
    color: colors.palette.secondary500,
    fontSize: 14,
  },
  discountText: {
    color: colors.palette.neutral100,
    fontSize: 12,
    fontWeight: "bold",
  },
  favoriteButton: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 20,
    padding: spacing.xs,
    position: "absolute",
    right: spacing.xs,
    top: spacing.xs,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    aspectRatio: 1,
    position: "relative",
  },
  infoContainer: {
    padding: spacing.sm,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  price: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  unit: {
    color: colors.textDim,
    fontSize: 12,
    marginTop: spacing.xxs,
  },
});
