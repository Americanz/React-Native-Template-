import React, { FC, useState, useEffect } from "react";
import { View, ViewStyle, FlatList, useWindowDimensions } from "react-native";
import { observer } from "mobx-react-lite";
import { Screen, Header } from "../../components";
import { useStores } from "../../models";
import { AppStackScreenProps } from "../../navigators";
import { spacing, colors } from "../../theme";
import { Searchbar, ActivityIndicator, DataTable } from "react-native-paper";
import { ProductItem } from "./ProductItem";
import { ProductGridItem } from "./ProductGridItem";
import { FilterBar } from "./FilterBar";

interface ProductListScreenProps extends AppStackScreenProps<"ProductList"> {}

export const ProductListScreen: FC<ProductListScreenProps> = observer(
  function ProductListScreen({ navigation }) {
    const { productStore } = useStores();
    const [searchQuery, setSearchQuery] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const { width } = useWindowDimensions();

    const numColumns = Math.floor(width / 180);


    const filteredProducts = productStore.getFilteredProducts(searchQuery);
    const totalPages = Math.ceil(productStore.total / productStore.pageSize);

    useEffect(() => {
      loadInitialData();
    }, []);

    async function loadInitialData() {
      await Promise.all([
        productStore.fetchProducts(),
        productStore.fetchCategories(),
      ]);
    }

    async function handleRefresh() {
      await productStore.fetchProducts();
    }

    function handlePageChange(page: number) {
      productStore.setCurrentPage(page + 1);
    }

    const toggleViewMode = () => setIsGridView(!isGridView);

    const renderItem = ({ item }) =>
      isGridView ? (
        <ProductGridItem
          product={item}
          onPress={() =>
            navigation.navigate("ProductDetail", { productId: item.id })
          }
          numColumns={numColumns}
        />
      ) : (
        <ProductItem
          product={item}
          onPress={() =>
            navigation.navigate("ProductDetail", { productId: item.id })
          }
        />
      );

    return (
      <Screen preset="fixed" contentContainerStyle={$screenContentContainer}>
        <Header
          title="Products"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />

        <Searchbar
          placeholder="Пошук"
          elevation={1}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={$searchBar}
        />

        <FilterBar
          onFilterPress={() => navigation.navigate("FilterScreen")}
          onSortPress={() => {
            /* Додайте логіку сортування */
          }}
          onViewToggle={toggleViewMode}
          isGridView={isGridView}
        />

        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={isGridView ? numColumns : 1}
          key={isGridView ? `grid-${numColumns}` : "list"}
          refreshing={productStore.isLoading}
          onRefresh={handleRefresh}
          contentContainerStyle={$listContent}
          ListFooterComponent={() =>
            productStore.isLoading ? (
              <ActivityIndicator style={$loader} />
            ) : null
          }
        />

        <View style={$paginationContainer}>
          <DataTable.Pagination
            page={productStore.currentPage - 1}
            numberOfPages={totalPages}
            onPageChange={handlePageChange}
            label={`${productStore.currentPage} of ${totalPages}`}
            showFastPaginationControls
            numberOfItemsPerPageOptions={[productStore.pageSize]}
          />
        </View>
      </Screen>
    );
  }
);

const $screenContentContainer: ViewStyle = {
  flex: 1,
};

const $searchBar: ViewStyle = {
  margin: spacing.sm,
};

const $listContent: ViewStyle = {
  flexGrow: 1,
};

const $loader: ViewStyle = {
  marginVertical: spacing.md,
};

const $paginationContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.outline,
  backgroundColor: colors.background,
};

export default ProductListScreen;
