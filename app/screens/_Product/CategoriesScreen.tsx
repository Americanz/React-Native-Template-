import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { observer } from "mobx-react-lite";
import { Screen, Header } from "../../components";
import { useStores } from "../../models";
import { AppStackScreenProps } from "../../navigators";
import { colors, spacing } from "../../theme";
import { Button } from "react-native-paper";
import CategoryGrid from "./CategoryGrid";

interface CategoriesScreenProps
  extends AppStackScreenProps<"CategoriesScreen"> {}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = observer(
  function CategoriesScreen({ navigation }) {
    // const { categoryStore } = useStores();

    // const fruitAndVegCategories = categoryStore.getFruitAndVegCategories();
    const fruitAndVegCategories = [
      {
        id: 1,
        title: "Сезонні овочі, фрукти",
        imageUrl: "https://example.com/seasonal.jpg",
      },
      { id: 2, title: "Фрукти", imageUrl: "https://example.com/fruits.jpg" },
      { id: 3, title: "Ягоди", imageUrl: "https://example.com/berries.jpg" },
      { id: 4, title: "Овочі", imageUrl: "https://example.com/vegetables.jpg" },
    ];

    const handleCategoryPress = (category) => {
      // categoryStore.setSelectedCategory(category);
      // navigation.navigate("ProductList", { categoryId: category.id });
    };

    const handleSeeAllPress = () => {
      // navigation.navigate("AllCategories");
    };

    return (
      <Screen preset="fixed" contentContainerStyle={styles.screen}>
        <Header
          title="Categories"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <CategoryGrid
            title="Фрукти, овочі"
            categories={fruitAndVegCategories}
            onCategoryPress={handleCategoryPress}
            onSeeAllPress={handleSeeAllPress}
          />
        </ScrollView>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Close
        </Button>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    margin: spacing.md,
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    padding: spacing.sm,
  },
});

export default CategoriesScreen;
