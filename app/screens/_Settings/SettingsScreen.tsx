import React from "react";
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { Screen, Text, Icon, Card } from "app/components";
import { DemoTabScreenProps } from "app/navigators/DemoNavigator";
import { colors, spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import { userStore } from "app/utils/storage/_user/UserStore";
import { useStores } from "app/models";
import { ThemeToggle } from "app/theme/_ThemeProvider/ThemeToggle";

interface SettingItemProps {
  icon: string;
  label: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingItem = observer(
  ({ icon, label, onPress, rightElement }: SettingItemProps) => {
    return (
      <TouchableOpacity
        style={[$settingItem, { borderBottomColor: colors.border }]}
        onPress={onPress}
      >
        <Icon icon={icon} size={24} color={colors.text} />
        <Text text={label} style={[$settingLabel, { color: colors.text }]} />
        {rightElement || (
          <Icon icon="caretRight" size={24} color={colors.text} />
        )}
      </TouchableOpacity>
    );
  }
);

export const SettingsScreen: React.FC<DemoTabScreenProps<
  "SettingsTab"
>> = observer(function SettingsScreen({ navigation }) {
  const {
    authenticationStore: { logout },
  } = useStores();

  const renderSettingsCard = (title: string, items: SettingItemProps[]) => (
    <>
      <Text
        text={title}
        preset="subheading"
        style={[$sectionTitle, { color: colors.text }]}
      />
      <Card
        style={[$card, { backgroundColor: colors.background }]}
        ContentComponent={
          <View style={$cardContent}>
            {items.map((item, index) => (
              <SettingItem key={index} {...item} />
            ))}
          </View>
        }
      />
    </>
  );

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
        <ThemeToggle />
      </View>

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

      {renderSettingsCard("Account", [
        {
          icon: "pin",
          label: "Addresses",
          onPress: () => navigation.navigate("Addresses"),
        },
        {
          icon: "car",
          label: "Vehicles",
          onPress: () => navigation.navigate("Vehicles"),
        },
        {
          icon: "components",
          label: "Tabs",
          onPress: () => navigation.navigate("EditUiTab"),
        },
      ])}

      {renderSettingsCard("Settings", [
        {
          icon: "flash",
          label: "Quick Access",
          onPress: () => navigation.navigate("QuickAccess"),
        },
        {
          icon: "bell",
          label: "Notifications",
          onPress: () => navigation.navigate("Notifications"),
        },
        { icon: "lock", label: "Security" },
        { icon: "map", label: "Maps" },
        {
          icon: "globe",
          label: "Language",
          rightElement: (
            <Text text="English" style={{ color: colors.textDim }} />
          ),
        },
      ])}

      {renderSettingsCard("Help", [
        { icon: "question", label: "FAQ" },
        { icon: "info", label: "Privacy Policy" },
      ])}

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
  justifyContent: "space-between",
  marginBottom: spacing.lg,
  paddingVertical: spacing.sm,
};

const $title: TextStyle = {
  flex: 1,
};

const $card: ViewStyle = {
  marginBottom: spacing.lg,
};

const $cardContent: ViewStyle = {
  paddingVertical: spacing.xs,
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
  fontSize: 14,
};

const $settingItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
  borderBottomWidth: 1,
};

const $settingLabel: TextStyle = {
  flex: 1,
  marginLeft: spacing.md,
};

const $sectionTitle: TextStyle = {
  marginBottom: spacing.sm,
};

const $buttonContainer: ViewStyle = {
  marginTop: spacing.xl,
};

const $button: ViewStyle = {
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  borderRadius: 4,
  alignItems: "center",
};
