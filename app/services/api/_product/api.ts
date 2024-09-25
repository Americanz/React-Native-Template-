// api/product-manage.ts

import { request } from "../../request";
import * as apiTypes from "app/types/api";
import * as productTypes from "app/types/product";

/** get product list */
export function fetchGetProductList(params?: apiTypes.SearchParams) {
  return request<apiTypes.ListResponse>({
    url: "/api/v1/product-manage/products",
    method: "get",
    params,
  });
}

export function fetchProductById(productId: number) {
  return request<productTypes.Product>({
    url: `/api/v1/product-manage/products/${productId}`,
    method: "get",
  });
}

export function fetchCategories(params?: apiTypes.SearchParams) {
  return request<apiTypes.ListResponse>({
    url: "/api/v1/product-manage/categories",
    method: "get",
    params,
  });
}
