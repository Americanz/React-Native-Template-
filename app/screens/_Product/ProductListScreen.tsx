import React, { FC, useState, useEffect, useCallback } from "react";
import { ViewStyle, FlatList, useWindowDimensions } from "react-native";
import { observer } from "mobx-react-lite";
import { Screen, Header } from "app/components";
import { useStores } from "app/models";
import { AppStackScreenProps } from "app/navigators";
import { colors } from "app/theme";
import { DataTable, Snackbar, ActivityIndicator } from "react-native-paper";
import { ProductItem } from "./ProductItem";
import { ProductGridItem } from "./ProductGridItem";
import { FilterBar } from "./FilterBar";
import { SearchBar } from "app/components/_product/SearchBar";
import { CartBadge } from "app/components/_product/CartBadge";
import debounce from "lodash/debounce";

interface ProductListScreenProps extends AppStackScreenProps<"ProductList"> {}

export const ProductListScreen: FC<ProductListScreenProps> = observer(
  function ProductListScreen({ navigation }) {
    const { productStore, cartStore } = useStores();
    const [searchQuery, setSearchQuery] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const { width } = useWindowDimensions();

    const numColumns = Math.floor(width / 180);
    const totalPages = Math.ceil(productStore.total / productStore.pageSize);

    const fetchData = useCallback(async () => {
      try {
        await Promise.all([
          productStore.fetchProducts(),
          productStore.fetchCategories(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        productStore.setError("Failed to fetch data. Please try again.");
      }
    }, [productStore]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const debouncedSearch = useCallback(
      debounce((query: string) => {
        productStore.setFilters({ searchQuery: query });
      }, 300),
      [productStore]
    );

    useEffect(() => {
      debouncedSearch(searchQuery);
    }, [searchQuery, debouncedSearch]);

    const handleRefresh = useCallback(() => {
      productStore.fetchProducts();
    }, [productStore]);

    const handlePageChange = useCallback(
      (page: number) => {
        productStore.setCurrentPage(page + 1);
      },
      [productStore]
    );

    const toggleViewMode = useCallback(() => {
      setIsGridView((prev) => !prev);
    }, []);

    const handleAddToCart = useCallback(
      (productId: number) => {
        cartStore.addItem(productId);
      },
      [cartStore]
    );

    const handleRemoveFromCart = useCallback(
      (productId: number) => {
        cartStore.removeItem(productId);
      },
      [cartStore]
    );

    const getProductQuantity = useCallback(
      (productId: number) => cartStore.getItemQuantity(productId),
      [cartStore]
    );

    const handleUpdateQuantity = useCallback(
      (productId: number, newQuantity: number) => {
        cartStore.updateItemQuantity(productId, newQuantity);
      },
      [cartStore]
    );

    const renderItem = useCallback(
      ({ item }) => {
        const commonProps = {
          product: item,
          onPress: () =>
            navigation.navigate("ProductDetail", { productId: item.id }),
          onAddToCart: () => handleAddToCart(item.id),
          onRemoveFromCart: () => handleRemoveFromCart(item.id),
          onQuantityChange: (newQuantity: number) =>
            handleUpdateQuantity(item.id, newQuantity),
          quantity: getProductQuantity(item.id),
        };

        return isGridView ? (
          <ProductGridItem {...commonProps} numColumns={numColumns} />
        ) : (
          <ProductItem {...commonProps} />
        );
      },
      [
        isGridView,
        navigation,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        getProductQuantity,
        numColumns,
      ]
    );

    return (
      <Screen preset="fixed" contentContainerStyle={$screenContentContainer}>
        <Header
          title="Product"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <CartBadge
              itemCount={cartStore.totalItems}
              onPress={() => navigation.navigate("Cart")}
            />
          }
        />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
        <FilterBar
          onFilterPress={() => navigation.navigate("FilterScreen")}
          onViewToggle={toggleViewMode}
          isGridView={isGridView}
        />

        {productStore.isLoading ? (
          <ActivityIndicator size="large" color={colors.palette.primary500} />
        ) : (
          <FlatList
            data={productStore.getFilteredProducts(searchQuery)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={isGridView ? numColumns : 1}
            key={isGridView ? `grid-${numColumns}` : "list"}
            refreshing={productStore.isLoading}
            onRefresh={handleRefresh}
            contentContainerStyle={$listContent}
          />
        )}

        <DataTable.Pagination
          page={productStore.currentPage - 1}
          numberOfPages={totalPages}
          onPageChange={handlePageChange}
          label={`${productStore.currentPage} of ${totalPages}`}
          showFastPaginationControls
          numberOfItemsPerPageOptions={[productStore.pageSize]}
          style={$paginationContainer}
        />

        <Snackbar
          visible={productStore.hasError}
          onDismiss={() => productStore.clearError()}
          action={{
            label: "Retry",
            onPress: () => {
              productStore.clearError();
              fetchData();
            },
          }}
        >
          {productStore.errorMessage}
        </Snackbar>
      </Screen>
    );
  }
);

const $screenContentContainer: ViewStyle = {
  flex: 1,
};

const $listContent: ViewStyle = {
  flexGrow: 1,
};

const $paginationContainer: ViewStyle = {
  justifyContent: "center",
};

export default ProductListScreen;
