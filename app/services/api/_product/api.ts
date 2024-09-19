// api/product-manage.ts

import { request } from "../../request";
import * as apiTypes from "../../../types/apiTypes";
import * as productTypes from "../../../types/productTypes";

/** get product list */
export function fetchGetProductList(params?: apiTypes.SearchParams) {
  return request<apiTypes.ListResponse>({
    url: "/api/v1/product-manage/products",
    method: "get",
    params,
  });
}

export function fetchProductById(productId: number) {
  return request<productTypes.ProductItem>({
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
