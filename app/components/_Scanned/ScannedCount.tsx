import React from "react";
import { ViewStyle, View } from "react-native";
import { Text } from "../Text";
import { spacing } from "../../theme";
import { barcodeStore } from "../../utils/storage/_barcode/BarcodeStore";
import { observer } from "mobx-react-lite";

export const ScannedCount = observer(function ScannedCount() {
  return (
    <View style={$container}>
      <Text
        text={`Scanned barcodes: ${barcodeStore.barcodes.length}`}
        preset="subheading"
      />
    </View>
  );
});

const $container: ViewStyle = {
  paddingVertical: spacing.sm,
  alignItems: "center",
};
