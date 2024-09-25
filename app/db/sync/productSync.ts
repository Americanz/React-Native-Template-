import {
  fetchGetProductList,
  fetchCategories,
} from "app/services/api/_product/api";
import { upsertProduct, upsertCategory } from "../dbOperations";
import { syncEntity } from "./syncUtils";
import { SyncResult, SyncConfig } from "./types";

const PRODUCT_SYNC_CONFIG: SyncConfig = {
  initialPage: 1,
  pageSize: 100,
};

const CATEGORY_SYNC_CONFIG: SyncConfig = {
  initialPage: 1,
  pageSize: 50,
};

export async function syncProducts(
  config: SyncConfig = PRODUCT_SYNC_CONFIG
): Promise<SyncResult> {
  return syncEntity("product", fetchGetProductList, upsertProduct, config);
}

export async function syncCategories(
  config: SyncConfig = CATEGORY_SYNC_CONFIG
): Promise<SyncResult> {
  return syncEntity("category", fetchCategories, upsertCategory, config);
}
