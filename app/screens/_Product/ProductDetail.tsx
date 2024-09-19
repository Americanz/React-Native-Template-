// ProductDetailScreen.tsx

import React, { FC, useEffect } from "react";
import {
  View,
  Image,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
  ImageStyle,
} from "react-native";
import { observer } from "mobx-react-lite";
import { Screen, Text, Header } from "../../components";
import { useStores } from "../../models";
import { AppStackScreenProps } from "../../navigators";
import { colors, spacing } from "../../theme";
import { Paragraph } from "react-native-paper";

interface ProductDetailScreenProps
  extends AppStackScreenProps<"ProductDetail"> {}

const productPlaceholder = require("../../../assets/images/product-placeholder.webp");

export const ProductDetailScreen: FC<ProductDetailScreenProps> = observer(
  function ProductDetailScreen({ route, navigation }) {
    const { productStore } = useStores();
    const { productId } = route.params;

    useEffect(() => {
      productStore.fetchProductById(productId);
    }, [productId]);

    const product = productStore.products.find((p) => p.id === productId);

    if (!product) {
      return (
        <Screen
          preset="fixed"
          safeAreaEdges={["top"]}
          contentContainerStyle={$screenContentContainer}
        >
          <Header
            title="Product Detail"
            leftIcon="back"
            onLeftPress={() => navigation.goBack()}
          />
          <ActivityIndicator size="large" color={colors.tint} />
        </Screen>
      );
    }

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <Header
          title="Product Detail"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={$detailContainer}>
          {product.category && (
            <Text style={$productName}>
              {`Category: ${product.category.name}`}
            </Text>
          )}
          <Image
            style={$image}
            source={productPlaceholder}
            resizeMode="contain"
          />

          <Text style={$productName} text={product.name} />
          <Text
            style={$productDescription}
            text={product.description || "No description available"}
          />
          <Text style={$productStatus} text={`Status: ${product.status}`} />
          <Paragraph style={$productDetails}>
            {product.attribute
              .map((attr) => `${attr.alias}: ${attr.value}`)
              .join(", ")}
          </Paragraph>
        </View>
      </Screen>
    );
  }
);

const $image: ImageStyle = {
  height: "50%",
  width: "100%",
  marginBottom: spacing.xl,
};
const $productDetails: TextStyle = {
  fontSize: 12,
  color: colors.textDim,
  marginBottom: spacing.xxs,
};

const $screenContentContainer: ViewStyle = {
  padding: spacing.md,
};

const $detailContainer: ViewStyle = {
  marginVertical: spacing.md,
  backgroundColor: colors.palette.neutral100,
  padding: spacing.md,
  borderRadius: 8,
};

const $productName: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: spacing.sm,
};

const $productDescription: TextStyle = {
  fontSize: 16,
  color: colors.textDim,
};

const $productStatus: TextStyle = {
  fontSize: 14,
  color: colors.palette.primary400,
};
