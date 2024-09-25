import { ExpoConfig, ConfigContext } from "@expo/config";

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register");


/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? [
    [
      "react-native-vision-camera",
      {
        cameraPermissionText: "$(PRODUCT_NAME) needs access to your Camera.",

        // optionally, if you want to record audio:
        enableMicrophonePermission: true,
        microphonePermissionText:
          "$(PRODUCT_NAME) needs access to your Microphone.",
      },
    ],
  ];

  return {
    ...config,
    plugins: [
      ...existingPlugins,
      require("./plugins/withSplashScreen").withSplashScreen,
    ],
  };
};
