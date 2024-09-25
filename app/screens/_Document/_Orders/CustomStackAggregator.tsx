// У новому файлі, наприклад, CustomStackAggregator.tsx
import React from "react";
import {
  StackAggregator as RNUIStackAggregator,
  StackAggregatorProps,
} from "react-native-ui-lib";

interface CustomStackAggregatorProps
  extends Omit<StackAggregatorProps, "collapsed"> {
  collapsed?: boolean;
}

export function CustomStackAggregator({
  collapsed = true,
  containerStyle,
  contentContainerStyle,
  children,
  ...rest
}: CustomStackAggregatorProps) {
  return (
    <RNUIStackAggregator
      collapsed={collapsed}
      containerStyle={containerStyle}
      contentContainerStyle={contentContainerStyle}
      {...rest}
    >
      {children}
    </RNUIStackAggregator>
  );
}
