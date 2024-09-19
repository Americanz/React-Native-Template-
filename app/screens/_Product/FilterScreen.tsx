import React, { useState } from "react";
import { ViewStyle, View, ScrollView } from "react-native";
import { observer } from "mobx-react-lite";
import { Screen, Header, Text } from "../../components";
import { useStores } from "../../models";
import { AppStackScreenProps } from "../../navigators";
import { colors, spacing } from "../../theme";
import { List, Button } from "react-native-paper";

interface FilterScreenProps extends AppStackScreenProps<"FilterScreen"> {}

export const FilterScreen: React.FC<FilterScreenProps> = observer(
  function FilterScreen({ navigation }) {
    const { productStore } = useStores();
    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

    const handleCategorySelect = (categoryId: number | null) => {
      productStore.setSelectedCategoryId(categoryId);
    };

    const handleReset = () => {
      productStore.setSelectedCategoryId(null);
      // Скидання інших фільтрів, якщо вони є
    };

    const handleApply = () => {
      navigation.goBack();
    };

    const selectedCategory = productStore.categories.find(
      (category) => category.id === productStore.selectedCategoryId
    );

    return (
      <Screen preset="fixed" contentContainerStyle={$screen}>
        <Header
          title="Фільтр"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={handleApply}
        />
        <ScrollView style={$content}>
          <List.Accordion
            title="Категорії"
            expanded={isCategoryExpanded}
            onPress={() => setIsCategoryExpanded(!isCategoryExpanded)}
            left={(props) => <List.Icon {...props} icon="folder" />}
          >
            <List.Item
              title="Всі категорії"
              onPress={() => handleCategorySelect(null)}
              right={() =>
                productStore.selectedCategoryId === null && (
                  <List.Icon icon="check" />
                )
              }
            />
            {productStore.categories.map((category) => (
              <List.Item
                key={category.id}
                title={category.name}
                onPress={() => handleCategorySelect(category.id)}
                right={() =>
                  productStore.selectedCategoryId === category.id && (
                    <List.Icon icon="check" />
                  )
                }
              />
            ))}
          </List.Accordion>
          {/* Додайте інші фільтри тут */}
        </ScrollView>
        <View style={$footer}>
          <Button mode="outlined" onPress={handleReset} style={$resetButton}>
            Скинути
          </Button>
          <Text style={$selectionText}>
            {selectedCategory
              ? `Вибрано: ${selectedCategory.name}`
              : "Категорію не вибрано"}
          </Text>
        </View>
      </Screen>
    );
  }
);

const $screen: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
};

const $content: ViewStyle = {
  flex: 1,
};

const $footer: ViewStyle = {
  padding: spacing.md,
  borderTopWidth: 1,
  borderTopColor: colors.separator,
};

const $resetButton: ViewStyle = {
  marginBottom: spacing.sm,
};

const $selectionText: TextStyle = {
  textAlign: "center",
};

export default FilterScreen;
