import { ProductItem } from "../../types/productTypes";
import { isAlive } from "mobx-state-tree";

export const prepareProductForDB = (product: ProductItem) => ({
  ...product,
  attribute: JSON.stringify(product.attribute),
  isArchived: product.isArchived ? 1 : 0,
});

export const parseProductFromDB = (product: any): ProductItem => ({
  ...product,
  attribute: JSON.parse(product.attribute),
  isArchived: Boolean(product.isArchived),
});

export function safeAccess<T, R>(store: T, accessor: (store: T) => R): R | undefined {
  if (isAlive(store)) {
    return accessor(store);
  }
  return undefined;
}
