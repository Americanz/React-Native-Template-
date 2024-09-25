import React from "react";
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { Screen, Text, Icon, Card } from "../../components";
import { DemoTabScreenProps } from "../../navigators/DemoNavigator";
import { colors, spacing } from "../../theme";
import { observer } from "mobx-react-lite";
import { userStore } from "../../utils/storage/_user/UserStore";
import { useStores } from "../../models";
import { ThemeToggle } from "../../theme/_ThemeProvider/ThemeToggle";

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
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      style={[$settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
    >
      <Icon icon={icon} size={24} color={colors.text} />
      <Text text={label} style={[$settingLabel, { color: colors.text }]} />
      {rightElement || <Icon icon="caretRight" size={24} color={colors.text} />}
    </TouchableOpacity>
  );
};

export const SettingsScreen: React.FC<DemoTabScreenProps<
  "SettingsTab"
>> = observer(function SettingsScreen({ navigation }) {
  const {
    authenticationStore: { logout },
  } = useStores();

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={[
        $container,
        { backgroundColor: colors.background },
      ]}
      safeAreaEdges={["top"]}
    >
      <View style={[$header, { borderBottomColor: colors.border }]}>
        <Text
          text="Settings"
          preset="heading"
          style={[$title, { color: colors.text }]}
        />
      </View>

      <ThemeToggle />

      <TouchableOpacity
        style={$userInfo}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Icon icon="community" size={50} color={colors.tint} />
        <View style={$userTextContainer}>
          <Text
            text={userStore.userInfo.name || "Set your name"}
            preset="subheading"
            style={{ color: colors.text }}
          />
          <Text
            text={userStore.userInfo.phoneNumber || "Set your phone number"}
            style={{ color: colors.textDim }}
          />
        </View>
        <Text text="Edit" style={[$editButton, { color: colors.tint }]} />
      </TouchableOpacity>

      <Card
        style={[$card, { backgroundColor: colors.background }]}
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

      <Text
        text="Settings"
        preset="subheading"
        style={[$sectionTitle, { color: colors.text }]}
      />
      <Card
        style={[$card, { backgroundColor: colors.background }]}
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
                <Text text="English" style={{ color: colors.textDim }} />
              }
            />
          </View>
        }
      />

      <Text
        text="Help"
        preset="subheading"
        style={[$sectionTitle, { color: colors.text }]}
      />
      <Card
        style={[$card, { backgroundColor: colors.background }]}
        ContentComponent={
          <View style={$cardText}>
            <SettingItem icon="question" label="FAQ" />
            <SettingItem icon="info" label="Privacy Policy" />
          </View>
        }
      />

      <View style={$buttonContainer}>
        <TouchableOpacity
          style={[$button, { backgroundColor: colors.error }]}
          onPress={logout}
        >
          <Text tx="common.logOut" style={{ color: colors.background }} />
        </TouchableOpacity>
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
  // color is set dynamically
};

const $settingItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
  borderBottomWidth: 1,
  // borderBottomColor is set dynamically
};

const $settingLabel: TextStyle = {
  flex: 1,
  marginLeft: spacing.md,
  // color is set dynamically
};

const $sectionTitle: TextStyle = {
  marginBottom: spacing.sm,
};

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
};

const $button: ViewStyle = {
  marginBottom: spacing.xs,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  borderRadius: 4,
  alignItems: "center",
};
