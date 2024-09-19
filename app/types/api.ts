// types/api.ts
import { Product, Category } from "./product";

export interface ListData<T = Product | Category> {
  records: T[];
  total?: number;
  current?: number;
  size?: number;
}

export interface SearchParams {
  current?: number;
  size?: number;
  lastUpdateTime?: string;
}

export interface ApiResult<T> {
  code: string;
  msg: string;
  data: T;
}

export type ListResponse = ApiResult<ListData>;
