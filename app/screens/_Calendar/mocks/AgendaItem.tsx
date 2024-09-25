import React from "react";
import {
  ViewStyle,
  TextStyle,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "app/components";
import { colors, spacing } from "app/theme";

interface AgendaItemProps {
  item: {
    hour?: string;
    duration?: string;
    title?: string;
  };
}

export function AgendaItem(props: AgendaItemProps) {
  const { item } = props;

  function buttonPressed() {
    Alert.alert("Show me more");
  }

  function itemPressed() {
    Alert.alert(item.title || "No title");
  }

  if (!item.title) {
    return (
      <View style={$emptyItem}>
        <Text style={$emptyItemText} text="No Events Planned Today" />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={$item}>
      <View>
        <Text style={$itemHourText} text={item.hour} />
        <Text style={$itemDurationText} text={item.duration} />
      </View>
      <Text style={$itemTitleText} text={item.title} />
      <View style={$itemButtonContainer}>
        <Button
          text="Info"
          onPress={buttonPressed}
          textStyle={$buttonText}
          style={$button}
          preset="flat"
        />
      </View>
    </TouchableOpacity>
  );
}

const $item: ViewStyle = {
  padding: spacing.medium,
  backgroundColor: colors.background,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
  flexDirection: "row",
};

const $itemHourText: TextStyle = {
  color: colors.text,
};

const $itemDurationText: TextStyle = {
  color: colors.dimmed,
  fontSize: 12,
  marginTop: spacing.tiny,
  marginLeft: spacing.tiny,
};

const $itemTitleText: TextStyle = {
  color: colors.text,
  marginLeft: spacing.medium,
  fontWeight: "bold",
  fontSize: 16,
};

const $itemButtonContainer: ViewStyle = {
  flex: 1,
  alignItems: "flex-end",
};

const $emptyItem: ViewStyle = {
  paddingLeft: spacing.medium,
  height: 52,
  justifyContent: "center",
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
};

const $emptyItemText: TextStyle = {
  color: colors.dimmed,
  fontSize: 14,
};

const $button: ViewStyle = {
  paddingVertical: spacing.tiny,
  paddingHorizontal: spacing.small,
  backgroundColor: colors.palette.neutral400,
};

const $buttonText: TextStyle = {
  color: colors.palette.neutral100,
};
