/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React from "react";
import { useColorScheme } from "react-native";
import * as Screens from "app/screens";
import Config from "../config";
import { useStores } from "../models";
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";
import { colors } from "app/theme";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Demo: NavigatorScreenParams<DemoTabParamList>;
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST

  EditProfile: undefined;
  BarcodeList: undefined;
  EditUiTab: undefined;
  ProductDetail: { productId: number };
  ProductList: undefined;
  FilterScreen: undefined;
  CategoriesScreen: undefined;
  CalendarScreen: undefined;
  ScanerVisionScreen: undefined;
  ExpandableCalendar: undefined;
  OrderList: undefined;
  OrderDetail: { orderId: number };
  Cart: undefined;
  DatabaseInfo: undefined;
  CardComponentScreen: undefined;
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<
  T extends keyof AppStackParamList
> = NativeStackScreenProps<AppStackParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
      }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />

          <Stack.Screen name="Demo" component={DemoNavigator} />

          <Stack.Screen
            name="EditProfile"
            component={Screens.EditProfileScreen}
          />

          <Stack.Screen
            name="BarcodeList"
            component={Screens.BarcodeListScreen}
          />
          <Stack.Screen name="EditUiTab" component={Screens.EditUiTabScreen} />

          <Stack.Screen
            name="ProductDetail"
            component={Screens.ProductDetailScreen}
          />

          <Stack.Screen
            name="ProductList"
            component={Screens.ProductListScreen}
          />

          <Stack.Screen
            name="CategoriesScreen"
            component={Screens.CategoriesScreen}
          />

          <Stack.Screen
            name="CalendarScreen"
            component={Screens.CalendarScreen}
          />

          <Stack.Screen name="FilterScreen" component={Screens.FilterScreen} />

          <Stack.Screen
            name="ScanerVisionScreen"
            component={Screens.ScanerScreen}
          />

          <Stack.Screen
            name="ExpandableCalendar"
            component={Screens.ExpandableCalendarScreen}
          />

          <Stack.Screen name="OrderList" component={Screens.OrderListScreen} />

          <Stack.Screen name="Cart" component={Screens.CartScreen} />

          <Stack.Screen
            name="CardComponentScreen"
            component={Screens.CardComponentScreen}
          />

          <Stack.Screen
            name="OrderDetail"
            component={Screens.OrderDetailScreen}
          />

          <Stack.Screen
            name="DatabaseInfo"
            component={Screens.DatabaseInfoScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  );
});

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(
  props: NavigationProps
) {
  const colorScheme = useColorScheme();

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
});
