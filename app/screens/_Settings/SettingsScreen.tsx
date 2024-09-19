import React from "react";
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { Screen, Text, Icon, Card, Toggle, Button } from "../../components";
import { DemoTabScreenProps } from "../../navigators/DemoNavigator";
import { colors, spacing } from "../../theme";
import { observer } from "mobx-react-lite";
import { userStore } from "../../utils/storage/UserStore";
import { useStores } from "../../models";

interface SettingItemProps {
  icon: string;
  label: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingItem = ({
  icon,
  label,
  onPress,
  rightElement,
}: SettingItemProps) => (
  <TouchableOpacity style={$settingItem} onPress={onPress}>
    <Icon icon={icon} size={24} />
    <Text text={label} style={$settingLabel} />
    {rightElement || <Icon icon="caretRight" size={24} />}
  </TouchableOpacity>
);

export const SettingsScreen: React.FC<DemoTabScreenProps<
  "Settings"
>> = observer(function SettingsScreen({ navigation }) {
  const {
    authenticationStore: { logout },
  } = useStores();

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
    >
      <View style={$header}>
        <Icon icon="back" onPress={() => navigation.goBack()} />
        <Text text="Settings" preset="heading" style={$title} />
      </View>

      <TouchableOpacity
        style={$userInfo}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Icon icon="community" size={50} />
        <View style={$userTextContainer}>
          <Text
            text={userStore.userInfo.name || "Set your name"}
            preset="subheading"
          />
          <Text
            text={userStore.userInfo.phoneNumber || "Set your phone number"}
          />
        </View>
        <Text text="Edit" style={$editButton} />
      </TouchableOpacity>

      <Card
        style={$card}
        ContentComponent={
          <View style={$cardText}>
            <SettingItem
              icon="pin"
              label="Addresses"
              onPress={() => navigation.navigate("Addresses")}
            />
            <SettingItem
              icon="car"
              label="Vehicles"
              onPress={() => navigation.navigate("Vehicles")}
            />
            <SettingItem
              icon="components"
              label="Tabs"
              onPress={() => navigation.navigate("EditUiTab")}
            />
          </View>
        }
      />

      <Text text="Settings" preset="subheading" style={$sectionTitle} />
      <Card
        style={$card}
        ContentComponent={
          <View style={$cardText}>
            <SettingItem
              icon="flash"
              label="Quick Access"
              onPress={() => navigation.navigate("QuickAccess")}
            />
            <SettingItem
              icon="bell"
              label="Notifications"
              onPress={() => navigation.navigate("Notifications")}
            />
            <SettingItem icon="lock" label="Security" />
            <SettingItem icon="map" label="Maps" />
            <SettingItem
              icon="globe"
              label="Language"
              rightElement={
                <Toggle
                  variant="switch"
                  value={true}
                  onValueChange={() => {}}
                  label="Ukr"
                />
              }
            />
          </View>
        }
      />
      <Text text="Help" preset="subheading" style={$sectionTitle} />
      <Card
        style={$card}
        ContentComponent={
          <View style={$cardText}>
            <SettingItem icon="question" label="FAQ" />
            <SettingItem icon="info" label="Privacy Policy" />
          </View>
        }
      />
      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={logout} />
      </View>
    </Screen>
  );
});

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xxl,
};

const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.lg,
};

const $title: TextStyle = {
  flex: 1,
  textAlign: "center",
  marginRight: 24,
};

const $card: ViewStyle = {
  marginBottom: spacing.lg,
};

const $cardText: TextStyle = {
  marginBottom: spacing.xxs,
};
const $userInfo: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.xl,
};

const $userTextContainer: ViewStyle = {
  flex: 1,
  marginLeft: spacing.md,
};

const $editButton: TextStyle = {
  color: colors.tint,
};

const $settingItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral300,
};

const $settingLabel: TextStyle = {
  flex: 1,
  marginLeft: spacing.md,
};

const $sectionTitle: TextStyle = {
  marginBottom: spacing.sm,
};

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
};

const $button: ViewStyle = {
  marginBottom: spacing.xs,
};
