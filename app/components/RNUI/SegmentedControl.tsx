import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import { SegmentedControl as RNUISegmentedControl } from "react-native-ui-lib";
import { colors, spacing } from "../../theme";

export interface SegmentedControlProps {
  segments: Array<{ label: string; value: string }>;
  initialIndex?: number;
  onChangeIndex?: (index: number) => void;
  style?: ViewStyle;
  activeSegmentStyle?: ViewStyle;
  segmentStyle?: ViewStyle;
  activeTextStyle?: TextStyle;
  textStyle?: TextStyle;
}

export function SegmentedControl(props: SegmentedControlProps) {
  const {
    segments,
    initialIndex = 0,
    onChangeIndex,
    style: $containerStyleOverride,
    activeSegmentStyle: $activeSegmentStyleOverride,
    segmentStyle: $segmentStyleOverride,
    activeTextStyle: $activeTextStyleOverride,
    textStyle: $textStyleOverride,
  } = props;

  return (
    <RNUISegmentedControl
      segments={segments.map((seg) => ({ label: seg.label }))}
      initialIndex={initialIndex}
      onChangeIndex={onChangeIndex}
      style={[$container, $containerStyleOverride]}
      activeSegmentStyle={[$activeSegment, $activeSegmentStyleOverride]}
      segmentStyle={[$segment, $segmentStyleOverride]}
      activeTextStyle={[$activeText, $activeTextStyleOverride]}
      inactiveTextStyle={[$text, $textStyleOverride]}
    />
  );
}

const $container: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
  borderRadius: 8,
  marginHorizontal: spacing.small,
  marginBottom: spacing.medium,
};

const $segment: ViewStyle = {
  paddingVertical: spacing.xs,
};

const $activeSegment: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
};

const $text: TextStyle = {
  color: colors.text,
  fontSize: 14,
};

const $activeText: TextStyle = {
  color: colors.tint,
  fontWeight: "bold",
};
