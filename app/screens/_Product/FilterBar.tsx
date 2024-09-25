import React from "react";
import { View, ViewStyle, TouchableOpacity, TextStyle } from "react-native";
import { Text } from "app/components";
import { colors, spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import { Icon } from "react-native-paper";

interface FilterBarProps {
  onFilterPress: () => void;
  onSortPress: () => void;
  onViewToggle: () => void;
  isGridView: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = observer(function FilterBar({
  onFilterPress,
  onViewToggle,
  isGridView,
}) {
  const { productStore } = useStores();

  const selectedCategory = productStore.categories.find(
    (category) => category.id === productStore.selectedCategoryId
  );

  const filterText = selectedCategory
    ? `Фільтр: ${selectedCategory.name}`
    : "Фільтр";

  return (
    <View style={$container}>
      <View style={$leftButtons}>
        <TouchableOpacity
          style={[
            $button,
            productStore.selectedCategoryId !== null && $activeButton,
          ]}
          onPress={onFilterPress}
        >
          <Icon
            source="filter-variant"
            size={20}
            color={
              productStore.selectedCategoryId !== null
                ? colors.palette.primary500
                : colors.text
            }
          />
          <Text
            text={filterText}
            style={[
              $buttonText,
              productStore.selectedCategoryId !== null && $activeButtonText,
            ]}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={$button} onPress={onViewToggle}>
        <Icon
          source={isGridView ? "view-grid" : "view-list"}
          size={20}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
});

const $container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxxs,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
};

const $leftButtons: ViewStyle = {
  flexDirection: "row",
};

const $button: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.xxxs,
  paddingHorizontal: spacing.xxxs,
  borderRadius: 4,
  marginRight: spacing.sm,
};

const $activeButton: ViewStyle = {
  backgroundColor: colors.palette.primary100,
};

const $buttonText: TextStyle = {
  fontSize: 14,
  color: colors.text,
  marginLeft: spacing.xxxs,
};

const $activeButtonText: TextStyle = {
  color: colors.palette.primary500,
};

export default FilterBar;
