import React, { FC } from "react";
import { ViewStyle } from "react-native";
import { Button, Screen, Header, Toggle } from "../../components";
import { spacing } from "../../theme";
import { observer } from "mobx-react-lite";
import { AppStackScreenProps } from "../../navigators";
import { uiStore } from "../../utils/storage/UserStore";
import { DemoDivider } from "../DemoShowroomScreen/DemoDivider";

interface EditUiTabScreenProps extends AppStackScreenProps<"EditUiTab"> {}

export const EditUiTabScreen: FC<EditUiTabScreenProps> = observer(
  function EditUiTab(
    _props // @demo remove-current-line
  ) {
    const { navigation } = _props;

    return (
      <Screen
        preset="fixed"
        contentContainerStyle={$container}
        safeAreaEdges={["top", "bottom"]}
      >
        <Header
          title="Ui tab setting"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />

        <DemoDivider size={24} />

        <Toggle
          variant="switch"
          switchAccessibilityMode="icon"
          value={uiStore.tabStatuses.DemoCommunity}
          onValueChange={() => uiStore.toggleTabVisibility("DemoCommunity")}
          label="Show tab DemoCommunity"
        />
        <DemoDivider size={24} />

        <Toggle
          variant="switch"
          switchAccessibilityMode="icon"
          value={uiStore.tabStatuses.DemoPodcastList}
          onValueChange={() => uiStore.toggleTabVisibility("DemoPodcastList")}
          label="Show tab DemoPodcastList"
        />

        <DemoDivider size={24} />

        <Toggle
          variant="switch"
          switchAccessibilityMode="icon"
          value={uiStore.tabStatuses.DemoDebug}
          onValueChange={() => uiStore.toggleTabVisibility("DemoDebug")}
          label="Show tab DemoDebug"
        />

        <DemoDivider size={24} />

        <Toggle
          variant="switch"
          switchAccessibilityMode="icon"
          value={uiStore.tabStatuses.BarcodeScanner}
          onValueChange={() => uiStore.toggleTabVisibility("BarcodeScanner")}
          label="Show tab Barcode Scanner"
        />

        <DemoDivider size={24} />

        <Toggle
          variant="switch" // Вказуємо, що використовуємо switch
          switchAccessibilityMode="icon"
          value={uiStore.tabStatuses.Settings} // Прив'язуємо до стейту у сторі
          onValueChange={() => uiStore.toggleTabVisibility("Settings")} // Перемикаємо значення видимості таб-бару
          label="Show tab Settings" // Текст біля перемикача
         />

      </Screen>
    );
  }
);

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xxl,
};

const $button: ViewStyle = {
  marginTop: spacing.xl,
};
