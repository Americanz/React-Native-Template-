import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text, Button } from "app/components";
import { Camera, useCameraDevices } from "react-native-vision-camera";

interface ScanerScreenProps extends AppStackScreenProps<"Scaner"> {}

export const ScanerScreen: FC<ScanerScreenProps> = observer(
  function ScanerScreen() {
    const [hasPermission, setHasPermission] = useState(false);
    const [isCameraAvailable, setIsCameraAvailable] = useState(false);
    const devices = useCameraDevices();
    const device = devices?.back;

    useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermission();
        setHasPermission(cameraPermission === "authorized");

        const isAvailable = await Camera.isAvailable();
        setIsCameraAvailable(isAvailable);
      })();
    }, []);

    // Додаткова перевірка на випадок, якщо `devices` undefined
    useEffect(() => {
      if (devices) {
        setIsCameraAvailable(!!device);
      }
    }, [devices]);

    if (!isCameraAvailable) {
      return (
        <Screen style={$container}>
          <Text text="Camera is not available on this device." />
        </Screen>
      );
    }

    if (!hasPermission) {
      return (
        <Screen style={$container}>
          <Text text="Camera permission is required to use this feature." />
          <Button
            text="Grant Permission"
            style={$captureButton}
            onPress={async () => {
              const cameraPermission = await Camera.requestCameraPermission();
              setHasPermission(cameraPermission === "authorized");
            }}
          />
        </Screen>
      );
    }

    if (!device) {
      return (
        <Screen style={$container}>
          <Text text="Loading camera..." />
        </Screen>
      );
    }

    return (
      <Screen style={$container}>
        <Camera style={$camera} device={device} isActive={true} />
        <Button
          text="Capture"
          style={$captureButton}
          onPress={() => {
            // Implement capture functionality here
            console.log("Capture button pressed");
          }}
        />
      </Screen>
    );
  }
);

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $camera: ViewStyle = {
  flex: 1,
  width: "100%",
  height: "100%",
};

const $captureButton: ViewStyle = {
  position: "absolute",
  bottom: 20,
  alignSelf: "center",
};
