import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, ImageStyle, Dimensions } from "react-native";
import { Text } from "app/components";
import { Card, Checkbox } from "react-native-paper";

export interface CardComponentProps {
  title: string;
  description: string;
  image: string;
  disabled: boolean;
  checked: boolean;
  onPress: (isChecked: boolean) => void;
}

const windowWidth = Dimensions.get("window").width;
const cardWidth = (windowWidth - 40) / 3;

export const CardComponent: FC<CardComponentProps> = observer(
  function CardComponent(props) {
    const { title, description, image, disabled, checked, onPress } = props;
    const [isChecked, setIsChecked] = useState(checked);

    const handlePress = () => {
      if (!disabled) {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onPress(newCheckedState);
      }
    };

    return (
      <Card
        style={[$card, disabled && $cardDisabled]}
        onPress={handlePress}
        accessible={!disabled}
      >
        <Card.Cover
          source={{ uri: image }}
          style={[$coverImage, !isChecked && $coverImageGrayscale]}
        />
        <Card.Content style={$cardContent}>
          <Text
            style={[$title, disabled && $textDisabled]}
            text={title}
            numberOfLines={1}
          />
          <Text
            style={[$subtitle, disabled && $textDisabled]}
            text={description}
            numberOfLines={2}
          />
        </Card.Content>
        <Card.Actions style={$checkboxContainer}>
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={handlePress}
            color={
              disabled ? COLORS.disabledCheckbox : COLORS.backgroundCheckbox
            }
            disabled={disabled}
          />
        </Card.Actions>
      </Card>
    );
  }
);

const COLORS = {
  background: "#fff",
  backgroundCheckbox: "#0082ff",
  disabledCheckbox: "#cccccc",
  textColor: "#666",
  textDisabled: "#999",
  textHeadline: "#000",
  cardShadow: "#0082ff",
  cardDisabled: "#f0f0f0",
};

const SIZES = {
  cardHeight: 160,
  cardWidth: cardWidth,
  cardRadius: 12,
  headerHeight: 60,
};

const $card: ViewStyle = {
  height: SIZES.cardHeight,
  width: SIZES.cardWidth,
  marginBottom: 10,
};

const $cardDisabled: ViewStyle = {
  opacity: 0.5,
};

const $coverImage: ImageStyle = {
  height: SIZES.cardHeight - SIZES.headerHeight,
};

const $coverImageGrayscale: ImageStyle = {
  tintColor: "gray",
  opacity: 0.3,
};

const $cardContent: ViewStyle = {
  height: SIZES.headerHeight,
  padding: 5,
};

const $checkboxContainer: ViewStyle = {
  position: "absolute",
  right: 5,
  bottom: 5,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: 20,
  padding: 5, // Додає відступ навколо чекбоксу
  width: 40, // Встановлює ширину контейнера
  height: 40, // Встановлює висоту контейнера
  // justifyContent: "center", // Центрує чекбокс вертикально
  // alignItems: "center", // Центрує чекбокс горизонтально
};

const $title: TextStyle = {
  color: COLORS.textHeadline,
  fontWeight: "bold",
  fontSize: 12,
  marginBottom: 2,
};

const $subtitle: TextStyle = {
  color: COLORS.textColor,
  fontWeight: "500",
  fontSize: 10,
};

const $textDisabled: TextStyle = {
  color: COLORS.textDisabled,
};
