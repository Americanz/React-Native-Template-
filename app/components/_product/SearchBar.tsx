import React, { FC } from "react";
import { ViewStyle } from "react-native";
import { View, TextField, Button } from "react-native-ui-lib";
import { colors, spacing } from "app/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
}) => {
  return (
    <View style={$searchContainer}>
      <TextField
        placeholder="Пошук"
        value={value}
        onChangeText={onChangeText}
        style={$searchInput}
      />
      {value !== "" && (
        <Button
          label="X"
          size={Button.sizes.small}
          onPress={onClear}
          style={$clearButton}
        />
      )}
    </View>
  );
};

const $searchContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.xs,
  backgroundColor: colors.background,
};

const $searchInput: ViewStyle = {
  flex: 1,
  marginRight: spacing.xs,
};

const $clearButton: ViewStyle = {
  width: 30,
  height: 30,
};
