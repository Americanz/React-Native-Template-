// ProductStore.ts
import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { ProductModel, CategoryModel } from "./product/ProductModel";
import { withSetPropAction } from "./helpers/withSetPropAction";
import {
  fetchGetProductList,
  fetchProductById,
  fetchCategories,
} from "../services/api/product/api";
import * as apiTypes from "../types/apiTypes";

export const ProductStoreModel = types
  .model("ProductStore")
  .props({
    products: types.array(ProductModel),
    categories: types.array(CategoryModel),
    currentPage: types.optional(types.number, 1),
    pageSize: types.optional(types.number, 10),
    total: types.optional(types.number, 0),
    selectedCategoryId: types.maybeNull(types.number),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchProducts() {
      const params: apiTypes.SearchParams = {
        current: store.currentPage,
        size: store.pageSize,
      };
      try {
        const response = await fetchGetProductList(params);
        if (response.code === "0000") {
          store.setProp(
            "products",
            response.data.records.map((item: any) => ({
              ...item,
              attribute: item.attribute.map((attr: any) => ({
                id: attr.id,
                name: attr.name,
                alias: attr.alias,
                value: attr.value,
              })),
            }))
          );
          store.setProp("total", response.data.total);
          store.setProp("currentPage", response.data.current);
          store.setProp("pageSize", response.data.size);
        } else {
          console.error(`Error fetching products: ${response.msg}`);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        }
        if (typeof error === "object" && error !== null) {
          console.error(
            "Error details:",
            JSON.stringify(error, Object.getOwnPropertyNames(error))
          );
        }
      }
    },
    async fetchProductById(productId: number) {
      try {
        const response = await fetchProductById(productId);
        if (response.code === "0000") {
          const productData = response.data;

          const attributes = productData.attribute
            ? productData.attribute.map((attr) => ({
                id: attr.id,
                name: attr.name,
                value: attr.value,
              }))
            : [];

          store.setProp("products", [
            ...store.products.filter((product) => product.id !== productId),
            {
              ...productData,
              attribute: attributes,
            },
          ]);
        } else {
          console.error(`Error fetching product by ID: ${response.msg}`);
        }
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    },

    async fetchCategories() {
      const params: apiTypes.SearchParams = {
        current: store.currentPage,
        size: store.pageSize,
      };
      try {
        const response = await fetchCategories(params);
        if (response.code === "0000") {
          store.setProp(
            "categories",
            response.data.records.map((item: any) => ({
              ...item,
            }))
          );
        } else {
          console.error(`Error fetching categories: ${response.msg}`);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    setCurrentPage(page: number) {
      store.setProp("currentPage", page);
    },

    setSelectedCategoryId(id: number | null) {
      store.selectedCategoryId = id;
      store.currentPage = 1; // Reset to first page when changing category
      this.fetchProducts();
    },

    // loadMoreProducts() {
    //   if (store.currentPage < Math.ceil(store.total / store.pageSize)) {
    //     store.setCurrentPage(store.currentPage + 1);
    //     return this.fetchProducts(true);
    //   }
    // },
  }));

export interface ProductStore extends Instance<typeof ProductStoreModel> {}
export interface ProductStoreSnapshot
  extends SnapshotOut<typeof ProductStoreModel> {}
