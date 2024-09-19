import React from "react";
import { ViewStyle } from "react-native";
import { Button } from "../Button";
import { spacing } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export function ViewScannedButton() {
  const navigation = useNavigation();

  return (
    <Button
      text="View Scanned Barcodes"
      style={$button}
      preset="reversed"
      onPress={() => navigation.navigate("BarcodeList")}
    />
  );
}

const $button: ViewStyle = {
  marginTop: spacing.md,
};
