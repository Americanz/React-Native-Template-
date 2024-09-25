import React, { FC } from "react";
import { View, ViewStyle, TextStyle, Alert } from "react-native";
import { Button, Screen, Text, Card, Header } from "../../components";
import { AppStackScreenProps } from "../../navigators";
import { spacing } from "../../theme";
import { observer } from "mobx-react-lite";
import { barcodeStore } from "../../utils/storage/_barcode/BarcodeStore";
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

    const confirmClearBarcode = () => {
      Alert.alert(
        "Clear All Barcode",
        "Are you sure you want to delete all barcode? This action cannot be undone.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => barcodeStore.clearBarcode(),
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

        {barcodeStore.barcode.map((barcode, index) => (
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

        {barcodeStore.barcode.length === 0 && (
          <Text text="No barcode scanned yet" style={$emptyText} />
        )}

        <Button
          text="Clear All Barcode"
          onPress={confirmClearBarcode}
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
