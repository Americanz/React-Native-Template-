import React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { Screen, Text, Header, Button } from "../../components";
import { DemoTabScreenProps } from "../../navigators/DemoNavigator";
import {  spacing } from "../../theme";

export const AddressesScreen: React.FC<DemoTabScreenProps<
  "Addresses"
>> = function AddressesScreen({ navigation }) {
  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
    >
      <Header
        title="Addresses"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={$content}>
        <Text text="Your saved addresses will appear here." style={$text} />
        <Button
          text="Add New Address"
          style={$button}
          preset="reversed"
          onPress={() => {
            /* Handle adding new address */
          }}
        />
      </View>
    </Screen>
  );
};

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
};

const $content: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $text: TextStyle = {
  textAlign: "center",
  marginBottom: spacing.lg,
};

const $button: ViewStyle = {
  minWidth: 200,
};
