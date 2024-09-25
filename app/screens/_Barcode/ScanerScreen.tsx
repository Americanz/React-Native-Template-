import React, { FC, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { Screen, Text, Button } from "app/components";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

interface ScanerScreenProps extends AppStackScreenProps<"ScanerVisionScreen"> {}

const PermissionsPage: FC = () => (
  <Screen style={$container}>
    <Text text="Camera permission is required to use this feature." />
    <Button
      text="Grant Permission"
      onPress={() => {
        Camera.requestCameraPermission();
      }}
    />
  </Screen>
);

const NoCameraDeviceError: FC = () => (
  <Screen style={$container}>
    <Text text="No camera device available" />
  </Screen>
);

export const ScanerScreen: FC<ScanerScreenProps> = observer(
  function ScanerScreen() {
    const { hasPermission } = useCameraPermission();
    const device = useCameraDevice("back");
    const camera = useRef<Camera>(null);

    useEffect(() => {
      // Функція для логування інформації про камери
      const logCameraDevices = async () => {
        const devices = await Camera.getAvailableCameraDevices();
        console.log("Available camera devices:");
        console.log(JSON.stringify(devices, null, 2));
      };

      // Викликаємо функцію логування
      logCameraDevices();
    }, []);

    const capturePhoto = async () => {
      if (camera.current) {
        const photo = await camera.current.takePhoto({});
        console.log(photo.path);
        // Handle the captured photo here
      }
    };

    if (!hasPermission) return <PermissionsPage />;
    if (device == null) return <NoCameraDeviceError />;

    return (
      <Screen style={$container}>
        <Camera
          ref={camera}
          device={device}
          isActive={true}
          style={{ width: 500, height: 500 }}
        />
        <Button text="Capture" style={$captureButton} onPress={capturePhoto} />
      </Screen>
    );
  }
);

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

const $captureButton: ViewStyle = {
  position: "absolute",
  bottom: 20,
  alignSelf: "center",
};
