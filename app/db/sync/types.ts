export type EntityType = "product" | "category";

export interface SyncResult {
  itemsSynced: number;
  status: "success" | "failed";
  errorMessage: string;
}

export interface SyncParams {
  current: number;
  size: number;
  lastUpdateTime?: string;
}

export interface SyncConfig {
    initialPage: number;
    pageSize: number;
  }
