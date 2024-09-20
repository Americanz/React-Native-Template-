import React from "react";
import { ViewStyle } from "react-native";
import { observer } from "mobx-react-lite";
import { Button, Screen, Text } from "../../components";
import { DemoTabScreenProps } from "../../navigators/DemoNavigator";
import { spacing } from "../../theme";

interface ProductScreenProps extends DemoTabScreenProps<"ProductScreen"> {}

export const ProductScreen: React.FC<ProductScreenProps> = observer(
  function ProductScreen({ navigation }) {
    return (
      <Screen
        preset="scroll"
        safeAreaEdges={["top"]}
        contentContainerStyle={$container}
      >
        <Text preset="heading" text="Product Management" style={$title} />

        <Button
          text="View Product List"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("ProductList")}
        />

        <Button
          text="Scan Barcode"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("BarcodeScanner")}
        />

        <Button
          text="View Categories"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("CategoriesScreen")}
        />

        <Button
          text="Add New Product"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("AddProduct")}
        />

        <Button
          text="Product Reports"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("ProductReports")}
        />

        <Button
          text="Sync Products"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("SyncProducts")}
        />
      </Screen>
    );
  }
);

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xl,
};

const $title: ViewStyle = {
  marginBottom: spacing.xl,
  textAlign: "center",
};

const $button: ViewStyle = {
  marginBottom: spacing.md,
};
