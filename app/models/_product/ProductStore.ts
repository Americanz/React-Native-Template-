// models/ProductStore.ts
import { Instance, SnapshotOut, types } from "mobx-state-tree";
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
      store.fetchProducts();
    },
    async fetchProducts(append: boolean = false) {
      this.setLoading(true);
      this.clearError();
      try {
        const offset = (store.currentPage - 1) * store.pageSize;
        const result = await dbOperations.getProducts(store.pageSize, offset, {
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
        this.setError("Не вдалося завантажити продукти з бази даних");
      } finally {
        this.setLoading(false);
      }
    },

    async fetchProductById(productId: number) {
      this.setLoading(true);
      this.clearError();
      try {
        const product = await dbOperations.getProductById(productId);
        if (product) {
          store.setProp("selectedProduct", product);
        } else {
          this.setError(`Продукт з ID ${productId} не знайдено`);
        }
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        this.setError(
          `Не вдалося завантажити продукт з ID ${productId}: ${error.message}`
        );
      } finally {
        this.setLoading(false);
      }
    },

    async fetchCategories() {
      this.setLoading(true);
      this.clearError();
      try {
        const categoriesData = await dbOperations.getCategories();
        store.setProp("categories", categoriesData);
      } catch (error) {
        console.error("Error fetching categories from database:", error);
        this.setError("Не вдалося завантажити категорії з бази даних");
      } finally {
        this.setLoading(false);
      }
    },
    setSelectedCategoryId(id: number | null) {
      store.selectedCategoryId = id;
      store.currentPage = 1;
      this.fetchProducts();
    },

    setCurrentPage(page: number) {
      store.setProp("currentPage", page);
    },
  }));

export interface ProductStore extends Instance<typeof ProductStoreModel> {}
export interface ProductStoreSnapshot
  extends SnapshotOut<typeof ProductStoreModel> {}
