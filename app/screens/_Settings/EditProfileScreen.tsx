import React, { useState, FC } from "react";
import {  ViewStyle } from "react-native";
import { Button, Screen,  TextField, Header } from "../../components";
import {  spacing } from "../../theme";
import { observer } from "mobx-react-lite";
import { AppStackScreenProps } from "../../navigators"
import { userStore } from "../../utils/storage/UserStore";

interface EditProfileScreenProps extends AppStackScreenProps<"EditProfile"> {}

export const EditProfileScreen: FC<EditProfileScreenProps> = observer(function EditProfileScreen(
  _props, // @demo remove-current-line
) {
  const { navigation } = _props
  const [name, setName] = useState(userStore.userInfo.name);
  const [phoneNumber, setPhoneNumber] = useState(
    userStore.userInfo.phoneNumber
  );

  const handleSave = () => {
    userStore.setUserInfo({ name, phoneNumber });
    navigation.goBack();
  };

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
    >
      <Header
        title="Edit Profile"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
      />

      <TextField
        label="Name"
        value={name}
        onChangeText={setName}
        containerStyle={$input}
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        containerStyle={$input}
      />
      <Button
        text="Save"
        onPress={handleSave}
        style={$button}
        preset="reversed"
      />
    </Screen>
  );
});

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xxl,
};

const $input: ViewStyle = {
  marginBottom: spacing.md,
};

const $button: ViewStyle = {
  marginTop: spacing.xl,
};
