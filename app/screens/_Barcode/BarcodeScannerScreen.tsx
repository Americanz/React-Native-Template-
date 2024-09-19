import React, { useState, useEffect } from "react";
import { View, ViewStyle, Platform } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { Button, Screen, Text, Header } from "../../components";
import { DemoTabScreenProps } from "../../navigators/DemoNavigator";
import { spacing } from "../../theme";
import { observer } from "mobx-react-lite";
import { barcodeStore } from "../../utils/storage/BarcodeStore";
import { ScannedCount } from "../../components/_Scanned/ScannedCount";
import { ViewScannedButton } from "../../components/_Scanned/ViewScannedButton";
import { syncService } from "../../db/sync/syncService";

// import { dbOperations } from "../../../db/dbOperations";

export const BarcodeScannerScreen: React.FC<DemoTabScreenProps<
  "BarcodeScanner"
>> = observer(({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [cameraEnabled] = useState(true);

  useEffect(() => {
    barcodeStore.fetchBarcodes();
  }, []);

  const handleRefresh = () => {
    // await dbOperations.checkDatabaseStructure();

    syncService.syncAll();
  };

  const handleBarCodeScanned = async (scanResult: BarcodeScanningResult) => {
    const newBarcode = {
      type: scanResult.type,
      data: scanResult.data,
      date: new Date().toISOString().split("T")[0],
    };
    await barcodeStore.addOrUpdateBarcode(newBarcode);
    setScanning(false);
  };

  const goBackCancelScanning = () => {
    setScanning(false);
    navigation.goBack();
  };

  if (!permission) {
    return <Text text="Requesting camera permission..." />;
  }

  if (!permission.granted) {
    return (
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
  }

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top", "bottom"]}
    >
      <Header
        title="Barcode Scanner"
        leftIcon="back"
        onLeftPress={goBackCancelScanning}
      />

      {scanning ? (
        <View style={$scannerContainer}>
          {cameraEnabled && (
            <CameraView
              autofocus={Platform.OS === "ios" ? "on" : "off"}
              style={$camera}
              onBarcodeScanned={handleBarCodeScanned}
            >
              {/* <Text text="Scan a barcode" style={$overlayText} /> */}
            </CameraView>
          )}

          <Button
            text="Cancel Scanning"
            onPress={() => setScanning(false)}
            style={$button}
          />
        </View>
      ) : (
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
            text="View Product List"
            style={$button}
            preset="default"
            onPress={() => navigation.navigate("ProductList")}
          />

          <Button
            text="Sync Api"
            style={$button}
            preset="default"
            onPress={() => handleRefresh()}
          />

          <Button
            text="View CategoriesScreen "
            style={$button}
            preset="default"
            onPress={() => navigation.navigate("CategoriesScreen")}
          />

          <Button
            text="View CalendarScreen "
            style={$button}
            preset="default"
            onPress={() => navigation.navigate("CalendarScreen")}
          />
        </>
      )}
    </Screen>
  );
});

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xl,
};

const $message: ViewStyle = {
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
