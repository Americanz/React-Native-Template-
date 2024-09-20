import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { ProductModel } from "../../types/productTypes";
import { withSetPropAction } from "../helpers/withSetPropAction";
import { dbOperations } from "../../db/dbOperations";

export const ProductStoreModel = types
  .model("ProductStore")
  .props({
    products: types.array(ProductModel),
    categories: types.array(types.frozen()),
    selectedCategoryId: types.maybeNull(types.number),
    currentPage: types.optional(types.number, 1),
    total: types.optional(types.number, 0),
    pageSize: types.optional(types.number, 10),
    isLoading: types.optional(types.boolean, false),
    hasError: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, ""),
    selectedProduct: types.maybeNull(types.frozen()),
    filters: types.optional(types.frozen(), {}),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    getFilteredProducts(searchQuery: string) {
      return store.products.filter((product) => {
        // Фільтрація за пошуковим запитом
        if (
          searchQuery &&
          !product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Фільтрація за категорією
        if (
          store.selectedCategoryId !== null &&
          product.category?.id !== store.selectedCategoryId
        ) {
          return false;
        }

        return true;
      });
    },
  }))
  .actions((store) => ({
    setLoading(loading: boolean) {
      store.setProp("isLoading", loading);
    },
    setError(message: string) {
      store.setProp("hasError", true);
      store.setProp("errorMessage", message);
    },
    clearError() {
      store.setProp("hasError", false);
      store.setProp("errorMessage", "");
    },
    setFilters(filters: Record<string, any>) {
      store.setProp("filters", { ...store.filters, ...filters });
      store.setCurrentPage(1);
      this.fetchProducts();
    },

    // Використання flow для асинхронних дій
    fetchProducts: flow(function* (append: boolean = false) {
      store.setLoading(true);
      store.clearError();
      try {
        const offset = (store.currentPage - 1) * store.pageSize;
        const result = yield dbOperations.getProducts(store.pageSize, offset, {
          ...store.filters,
          categoryId: store.selectedCategoryId,
        });
        if (append) {
          store.setProp("products", [...store.products, ...result.products]);
        } else {
          store.setProp("products", result.products);
        }
        store.setProp("total", result.total);
      } catch (error) {
        console.error("Error fetching products from database:", error);
        store.setError("Не вдалося завантажити продукти з бази даних");
      } finally {
        store.setLoading(false);
      }
    }),

    fetchProductById: flow(function* (productId: number) {
      store.setLoading(true);
      store.clearError();
      try {
        const product = yield dbOperations.getProductById(productId);
        if (product) {
          store.setProp("selectedProduct", product);
        } else {
          store.setError(`Продукт з ID ${productId} не знайдено`);
        }
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        store.setError(
          `Не вдалося завантажити продукт з ID ${productId}: ${error.message}`
        );
      } finally {
        store.setLoading(false);
      }
    }),

    fetchCategories: flow(function* () {
      store.setLoading(true);
      store.clearError();
      try {
        const categoriesData = yield dbOperations.getCategories();
        store.setProp("categories", categoriesData);
      } catch (error) {
        console.error("Error fetching categories from database:", error);
        store.setError("Не вдалося завантажити категорії з бази даних");
      } finally {
        store.setLoading(false);
      }
    }),

    setSelectedCategoryId(id: number | null) {
      store.setProp("selectedCategoryId", id);
      store.setProp("currentPage", 1);
      this.fetchProducts();
    },

    setCurrentPage(page: number) {
      store.setProp("currentPage", page);
      this.fetchProducts();
    },
  }));

export interface ProductStore extends Instance<typeof ProductStoreModel> {}
export interface ProductStoreSnapshot
  extends SnapshotOut<typeof ProductStoreModel> {}
