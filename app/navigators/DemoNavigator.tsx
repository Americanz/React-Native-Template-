import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components";
import { translate } from "../i18n";

import {
  DemoCommunityScreen,
  DemoShowroomScreen,
  DemoDebugScreen,
  BarcodeScannerScreen,
  ProductScreen,
} from "../screens";
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen";
import { colors, spacing, typography } from "../theme";
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator";
import { SettingsScreen } from "../screens/_Settings/SettingsScreen";
import { uiStore } from "../utils/storage/_user/UserStore";


export type DemoTabParamList = {
  DemoCommunity: undefined;
  DemoShowroom: { queryIndex?: string; itemIndex?: string };
  DemoDebug: undefined;
  DemoPodcastList: undefined;
  BarcodeTab: undefined;
  SettingsTab: undefined;
  ProductTab: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<
  T extends keyof DemoTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>;

const Tab = createBottomTabNavigator<DemoTabParamList>();

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="components"
              color={focused ? colors.tint : colors.text}
              size={30}
            />
          ),
          tabBarButton: uiStore.tabStatuses.DemoShowroom
            ? undefined
            : () => null,
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={DemoCommunityScreen}
        options={{
          tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="community"
              color={focused ? colors.tint : colors.text}
              size={30}
            />
          ),
          tabBarButton: uiStore.tabStatuses.DemoCommunity
            ? undefined
            : () => null,
        }}
      />

      <Tab.Screen
        name="DemoPodcastList"
        component={DemoPodcastListScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: translate("demoNavigator.podcastListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="podcast"
              color={focused ? colors.tint : colors.text}
              size={30}
            />
          ),
          tabBarButton: uiStore.tabStatuses.DemoPodcastList
            ? undefined
            : () => null,
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="debug"
              color={focused ? colors.tint : colors.text}
              size={30}
            />
          ),
          tabBarButton: uiStore.tabStatuses.DemoDebug ? undefined : () => null,
        }}
      />

      <Tab.Screen
        name="BarcodeTab"
        component={BarcodeScannerScreen}
        options={{
          tabBarLabel: "Barcode",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="barcode"
              color={focused ? colors.tint : colors.text}
              size={30}
            />
          ),
          tabBarButton: uiStore.tabStatuses.BarcodeScanner
            ? undefined
            : () => null,
        }}
      />

      <Tab.Screen
        name="ProductTab"
        component={ProductScreen}
        options={{
          tabBarLabel: "Product",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="view_list"
              color={focused ? colors.tint : colors.text}
              size={30}
            />
          ),
          tabBarButton: uiStore.tabStatuses.ProductScreen
            ? undefined
            : () => null,
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="settings"
              color={focused ? colors.tint : colors.text}
              size={30}
            />
          ),
          tabBarButton: uiStore.tabStatuses.Settings ? undefined : () => null, // Використовуємо tabBarButton для приховання
        }}
      />
    </Tab.Navigator>
  );
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
};

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
};

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
};

// @demo remove-file
