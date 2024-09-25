import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { ProductModel, Product } from "app/types/productTypes";
import { productOperations } from "app/db/dbOperations";
import { createLogger } from "app/utils/logger";

const logger = createLogger("ProductStore");

// Constants
const DEFAULT_PAGE_SIZE = 10;

// Custom types
type Filters = {
  categoryId?: number;
  priceRange?: { min: number; max: number };
  searchQuery?: string;
  // Add other filter properties as needed
};

type DatabaseError = {
  message: string;
  code?: string;
};

// Helper functions
const productNameIncludes = (product: Product, query: string) =>
  product.name.toLowerCase().includes(query.toLowerCase());

export const ProductStoreModel = types
  .model("ProductStore")
  .props({
    products: types.array(ProductModel),
    categories: types.array(types.frozen()),
    selectedCategoryId: types.maybeNull(types.number),
    currentPage: types.optional(types.number, 1),
    total: types.optional(types.number, 0),
    pageSize: types.optional(types.number, DEFAULT_PAGE_SIZE),
    isLoading: types.optional(types.boolean, false),
    hasError: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, ""),
    selectedProduct: types.maybeNull(types.frozen()),
    filters: types.optional(types.frozen<Filters>(), {}),
  })
  .views((store) => ({
    /**
     * Filters products based on the current search query and selected category
     * @param searchQuery - The search query to filter products by
     * @returns Filtered array of products
     */
    getFilteredProducts(searchQuery: string) {
      const lowercasedQuery = searchQuery.toLowerCase();
      return store.products.filter((product) => {
        const matchesSearchQuery =
          !searchQuery || productNameIncludes(product, lowercasedQuery);
        const matchesCategory =
          store.selectedCategoryId === null ||
          product.category?.id === store.selectedCategoryId;

        return matchesSearchQuery && matchesCategory;
      });
    },
  }))
  .actions((store) => {
    const setError = (error: DatabaseError) => {
      store.hasError = true;
      store.errorMessage = `Помилка: ${error.message}${
        error.code ? ` (Код: ${error.code})` : ""
      }`;
      logger.error("Встановлено стан помилки", { error });
    };

    const clearError = () => {
      store.hasError = false;
      store.errorMessage = "";
    };

    const setFilters = (filters: Filters) => {
      store.filters = { ...store.filters, ...filters };
      store.currentPage = 1;
      fetchProducts();
    };

    const setSelectedCategoryId = (id: number | null) => {
      store.selectedCategoryId = id;
      store.currentPage = 1;
      fetchProducts();
    };

    const setCurrentPage = (page: number) => {
      store.currentPage = page;
      fetchProducts();
    };

    const fetchProducts = flow(function* (append = false) {
      store.isLoading = true;
      clearError();
      try {
        const offset = (store.currentPage - 1) * store.pageSize;
        const result = yield productOperations.getProducts(store.pageSize, offset, {
          ...store.filters,
          categoryId: store.selectedCategoryId,
        });

        store.products = append
          ? [...store.products, ...result.products]
          : result.products;

        store.total = result.total;
      } catch (error) {
        const dbError = error as DatabaseError;
        logger.error("Помилка при завантаженні продуктів", {
          error: dbError,
          errorMessage: dbError.message
        });
        setError(dbError);
      } finally {
        store.isLoading = false;
      }
    });

    const fetchProductById = flow(function* (productId: number) {
      store.isLoading = true;
      clearError();
      try {
        const product = yield productOperations.getProductById(productId);
        store.selectedProduct = product || null;
        if (!product) {
          logger.warn("Продукт не знайдено", { productId });
          setError({ message: `Продукт з ID ${productId} не знайдено` });
        }
      } catch (error) {
        const dbError = error as DatabaseError;
        logger.error("Помилка при завантаженні продукту", {
          productId,
          error: dbError,
        });
        setError(dbError);
      } finally {
        store.isLoading = false;
      }
    });

    const fetchCategories = flow(function* () {
      store.isLoading = true;
      clearError();
      try {
        store.categories = yield productOperations.getCategories();
      } catch (error) {
        const dbError = error as DatabaseError;
        logger.error("Помилка при завантаженні категорій", { error: dbError });
        setError(dbError);
      } finally {
        store.isLoading = false;
      }
    });

    return {
      setError,
      clearError,
      setFilters,
      setSelectedCategoryId,
      setCurrentPage,
      fetchProducts,
      fetchProductById,
      fetchCategories,
    };
  });

export interface ProductStore extends Instance<typeof ProductStoreModel> {}
export interface ProductStoreSnapshot
  extends SnapshotOut<typeof ProductStoreModel> {}
