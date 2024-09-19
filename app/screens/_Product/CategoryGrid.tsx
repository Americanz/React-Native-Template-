import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, TouchableRipple } from "react-native-paper";
import { colors, spacing } from "../../theme";

interface Category {
  id: number;
  title: string;
  imageUrl: string;
}

interface CategoryGridProps {
  title: string;
  categories: Category[];
  onCategoryPress: (category: Category) => void;
  onSeeAllPress: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  title,
  categories,
  onCategoryPress,
  onSeeAllPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableRipple onPress={onSeeAllPress}>
          <Text style={styles.seeAllText}>Дивитись всі</Text>
        </TouchableRipple>
      </View>
      <View style={styles.grid}>
        {categories.map((category) => (
          <Card key={category.id} style={styles.categoryItem}>
            <TouchableRipple onPress={() => onCategoryPress(category)}>
              <React.Fragment>
                <Card.Cover
                  source={{ uri: category.imageUrl }}
                  style={styles.categoryImage}
                />
                <Card.Content>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </Card.Content>
              </React.Fragment>
            </TouchableRipple>
          </Card>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryImage: {
    height: 100,
  },
  categoryItem: {
    marginBottom: spacing.sm,
    width: "48%",
  },
  categoryTitle: {
    fontSize: 14,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  container: {
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xs,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  seeAllText: {
    color: colors.palette.primary500,
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CategoryGrid;
