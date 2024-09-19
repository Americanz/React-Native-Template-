import React, { FC } from "react";
import { View, ViewStyle, TextStyle, Alert } from "react-native";
import { Button, Screen, Text, Card, Header } from "../../components";
import { AppStackScreenProps } from "../../navigators";
import { spacing } from "../../theme";
import { observer } from "mobx-react-lite";
import { barcodeStore } from "../../utils/storage/BarcodeStore";
import { QuantityControl } from "../../components/_Scanned/QuantityControl";


interface BarcodeListProps extends AppStackScreenProps<"BarcodeList"> {}

export const BarcodeListScreen: FC<BarcodeListProps> = observer(
  function BarcodeListScreen(
    _props // @demo remove-current-line
  ) {
    const { navigation } = _props;

    const updateQuantity = (index: number, newQuantity: number) => {
      if (newQuantity >= 0) {
        barcodeStore.updateBarcodeQuantity(index, newQuantity);
      }
    };


    const confirmClearBarcodes = () => {
      Alert.alert(
        "Clear All Barcodes",
        "Are you sure you want to delete all barcodes? This action cannot be undone.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => barcodeStore.clearBarcodes(),
          },
        ]
      );
    };

    return (
      <Screen
        preset="scroll"
        contentContainerStyle={$container}
        safeAreaEdges={["top", "bottom"]}
      >
        <Header
          title="Scanned Barcodes"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />

        {barcodeStore.barcodes.map((barcode, index) => (
          <Card
            key={index}
            style={$card}
            ContentComponent={
              <View>
                <Text
                  preset="bold"
                  text={`Barcode ${index + 1}:`}
                  style={$cardTitle}
                />
                <Text text={`Type: ${barcode.type}`} style={$cardText} />
                <Text text={`Data: ${barcode.data}`} style={$cardText} />
                <Text text={`Date: ${barcode.date}`} style={$cardText} />
                <View style={$quantityContainer}>
                  <Text text="Quantity:" style={$quantityLabel} />
                  <QuantityControl
                    quantity={barcode.quantity}
                    onIncrease={() =>
                      updateQuantity(index, barcode.quantity + 1)
                    }
                    onDecrease={() =>
                      updateQuantity(index, barcode.quantity - 1)
                    }
                  />
                </View>
              </View>
            }
          />
        ))}

        {barcodeStore.barcodes.length === 0 && (
          <Text text="No barcodes scanned yet" style={$emptyText} />
        )}

        <Button
          text="Scan New Barcode"
          onPress={() => navigation.navigate("BarcodeScanner")}
          style={$button}
          preset="reversed"
        />

        <Button
          text="Clear All Barcodes"
          onPress={confirmClearBarcodes}
          style={$button}
        />
      </Screen>
    );
  }
);

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xl,
};

const $card: ViewStyle = {
  marginBottom: spacing.md,
};

const $cardTitle: TextStyle = {
  marginBottom: spacing.xs,
};

const $cardText: TextStyle = {
  marginBottom: spacing.xxs,
};

const $button: ViewStyle = {
  marginTop: spacing.lg,
};

const $emptyText: TextStyle = {
  textAlign: "center",
  marginTop: spacing.xl,
};

const $quantityContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: spacing.xs,
};

const $quantityLabel: TextStyle = {
  marginRight: spacing.xs,
};
