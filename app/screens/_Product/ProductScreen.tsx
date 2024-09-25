import React from "react";
import { ViewStyle } from "react-native";
import { observer } from "mobx-react-lite";
import { Button, Screen, Text } from "app/components";
import { DemoTabScreenProps } from "app/navigators/DemoNavigator";
import { spacing } from "app/theme";
import { syncService } from "app/db/sync/syncService";

interface ProductScreenProps extends DemoTabScreenProps<"ProductTab"> {}

export const ProductScreen: React.FC<ProductScreenProps> = observer(
  function ProductScreen({ navigation }) {
    const handleRefresh = () => {
      syncService.syncAll();
    };

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
          onPress={() => navigation.navigate("BarcodeList")}
        />

        <Button
          text="View Categories"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("CategoriesScreen")}
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
          onPress={() => handleRefresh()}
        />

        <Button
          text="DatabaseInfo"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("DatabaseInfo")}
        />

        <Button
          text="OrderList"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("OrderList")}
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
