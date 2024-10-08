import React, { useState } from "react";
import { ViewStyle, ActivityIndicator } from "react-native";
import { observer } from "mobx-react-lite";
import { Button, Screen, Text } from "app/components";
import { DemoTabScreenProps } from "app/navigators/DemoNavigator";
import { colors, spacing } from "app/theme";
import { syncService } from "app/db/sync/syncService";

interface ProductScreenProps extends DemoTabScreenProps<"ProductTab"> {}

export const ProductScreen: React.FC<ProductScreenProps> = observer(
  function ProductScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    const handleRefresh = async () => {
      setLoading(true);
      try {
        await syncService.syncAll();
      } finally {
        setLoading(false);
      }
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
          onPress={() => navigation.navigate("CategoriesScreen")}        />



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

        <Button
          text="CardComponentScreen"
          style={$button}
          preset="default"
          onPress={() => navigation.navigate("CardComponentScreen")}
        />
        {loading && <ActivityIndicator size="large" color={colors.palette.primary} />}
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
};

const $button: ViewStyle = {
  marginBottom: spacing.md,
};
