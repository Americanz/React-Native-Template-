import * as React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { IconButton } from "react-native-paper";

const PaperIcon = ({ name, color, size, style }) => (
  <IconButton icon={name} iconColor={color} size={size} style={style} />
);

export const iconRegistry = {
  // Локальні іконки
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/demo/clap.png"),
  community: require("../../assets/icons/demo/community.png"),
  components: require("../../assets/icons/demo/components.png"),
  debug: require("../../assets/icons/demo/debug.png"),
  github: require("../../assets/icons/demo/github.png"),
  heart: require("../../assets/icons/demo/heart.png"),
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/demo/pin.png"),
  podcast: require("../../assets/icons/demo/podcast.png"),
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/demo/slack.png"),
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),

  barcode: { paperIconName: "barcode" },
  qrcode: { paperIconName: "qrcode-scan" },
  magnify: { paperIconName: "magnify" },
  view_list: { paperIconName: "format-list-bulleted" },
};

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  icon: IconTypes;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper = isPressable ? TouchableOpacity : View;

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    color !== undefined && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ];

  const IconComponent = iconRegistry[icon];

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      {typeof IconComponent === "object" && IconComponent.paperIconName ? (
        <PaperIcon
          name={IconComponent.paperIconName}
          color={color}
          size={size}
          style={$imageStyle}
        />
      ) : (
        <Image style={$imageStyle} source={IconComponent} />
      )}
    </Wrapper>
  );
}

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
};
