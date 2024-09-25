import React, { ReactNode } from "react";
import { ViewStyle, TextStyle } from "react-native";
import {
  StackAggregator as RNUIStackAggregator,
  StackAggregatorProps as RNUIStackAggregatorProps,
} from "react-native-ui-lib";
import { colors, spacing } from "../../theme";
import { Text } from "../Text";

export interface StackAggregatorProps
  extends Omit<RNUIStackAggregatorProps, "title"> {
  /**
   * The title text to display in the header.
   */
  title?: string;
  /**
   * Optional title style override.
   */
  titleStyle?: TextStyle;
  /**
   * Custom title component.
   */
  TitleComponent?: ReactNode;
  /**
   * Optional content container style override.
   */
  contentContainerStyle?: ViewStyle;

  buttonProps?: ButtonProps | undefined;
  /**
   * Children components.
   */
  children: ReactNode;
}

export function StackAggregator(props: StackAggregatorProps) {
  const {
    title,
    titleStyle: $titleStyleOverride,
    TitleComponent,
    contentContainerStyle: $contentContainerStyleOverride,
    children,
    ...rest
  } = props;

  const titleComponent =
    TitleComponent ||
    (title && <Text style={[$title, $titleStyleOverride]} text={title} />);

  return (
    <RNUIStackAggregator
      {...rest}
      contentContainerStyle={[
        $contentContainer,
        $contentContainerStyleOverride,
      ]}
      title={titleComponent}
    >
      {children}
    </RNUIStackAggregator>
  );
}

const $title: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: colors.text,
  padding: spacing.small,
};

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing.small,
};
