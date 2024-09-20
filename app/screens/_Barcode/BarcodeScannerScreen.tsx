import React, { useState, useEffect, useCallback } from "react";
import { View, ViewStyle, Platform, TextStyle } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { Button, Screen, Text } from "../../components";
import { DemoTabScreenProps } from "../../navigators/DemoNavigator";
import { spacing } from "../../theme";
import { observer } from "mobx-react-lite";
import { barcodeStore } from "../../utils/storage/_barcode/BarcodeStore";
import { ScannedCount } from "../../components/_Scanned/ScannedCount";
import { ViewScannedButton } from "../../components/_Scanned/ViewScannedButton";
import { Appbar } from "react-native-paper";

export const BarcodeScannerScreen: React.FC<DemoTabScreenProps<
  "BarcodeScanner"
>> = observer(({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    barcodeStore.fetchBarcodes();
  }, []);

  const handleBarCodeScanned = useCallback(
    async (scanResult: BarcodeScanningResult) => {
      const newBarcode = {
        type: scanResult.type,
        data: scanResult.data,
        date: new Date().toISOString().split("T")[0],
      };
      await barcodeStore.addOrUpdateBarcode(newBarcode);
      setScanning(false);
    },
    []
  );

  const renderPermissionRequest = () => (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <Text
        text="We need your permission to show the camera"
        style={$message}
      />
      <Button
        onPress={requestPermission}
        text="Grant permission"
        style={$button}
      />
    </Screen>
  );

  const renderScanner = () => (
    <View style={$scannerContainer}>
      <CameraView
        autofocus={Platform.OS === "ios" ? "on" : "off"}
        style={$camera}
        onBarcodeScanned={handleBarCodeScanned}
      />
      <Button
        text="Cancel Scanning"
        onPress={() => setScanning(false)}
        style={$button}
      />
    </View>
  );

  const renderMainContent = () => (
    <>
      <ScannedCount />
      <Button
        text="Start Scanning"
        onPress={() => setScanning(true)}
        style={$button}
        preset="reversed"
      />
      <ViewScannedButton />
      <Button
        text="Clear All Barcodes"
        onPress={() => barcodeStore.clearBarcodes()}
        style={$button}
      />
      <Button
        text=" New Scaner"
        onPress={() => navigation.navigate("Scaner")}
        style={$button}
        // preset="reversed"
      />
    </>
  );

  if (!permission) {
    return <Text text="Requesting camera permission..." />;
  }

  if (!permission.granted) {
    return renderPermissionRequest();
  }

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$container}
    >
      <Appbar.Header>
        <Appbar.Content title="Barcode Scanner" />
      </Appbar.Header>

      {scanning ? renderScanner() : renderMainContent()}
    </Screen>
  );
});

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xl,
};

const $message: TextStyle = {
  marginBottom: spacing.md,
};

const $scannerContainer: ViewStyle = {
  height: 500,
  marginVertical: spacing.lg,
  position: "relative",
};

const $camera: ViewStyle = {
  flex: 1,
  borderRadius: 20,
  overflow: "hidden",
};

const $button: ViewStyle = {
  marginTop: spacing.lg,
};
