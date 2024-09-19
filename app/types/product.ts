// types/product.ts
import { types, Instance } from "mobx-state-tree";
import { BaseModel } from "./baseModel";

export const CategoryModel = BaseModel.props({
  name: types.string,
  code: types.maybe(types.string),
  description: types.maybe(types.string),
  parentId: types.maybe(types.number),
  status: types.maybe(types.string),
});

export const ProductAttributeModel = BaseModel.props({
  name: types.string,
  alias: types.maybe(types.string),
  value: types.union(types.string, types.number),
});

export const ProductModel = BaseModel.props({
  currency: types.string,
  code: types.maybe(types.string),
  name: types.maybe(types.string),
  barcode: types.maybe(types.string),
  description: types.maybe(types.string),
  status: types.maybe(types.string),
  categoryId: types.maybe(types.number),
  unitTypeId: types.maybe(types.number),
  isArchived: types.optional(types.boolean, false),
  attribute: types.array(types.late(() => ProductAttributeModel)),
  category: types.maybe(types.late(() => CategoryModel)),
});

export const UnitTypeModel = types.model("UnitType", {
  id: types.identifierNumber,
  name: types.maybe(types.string),
  description: types.maybe(types.string),
});

export interface Product extends Instance<typeof ProductModel> {}
export interface Category extends Instance<typeof CategoryModel> {}
export interface ProductAttribute extends Instance<typeof ProductAttributeModel> {}
export interface UnitType extends Instance<typeof UnitTypeModel> {}

export const Models = {
  Product: ProductModel,
  Category: CategoryModel,
  ProductAttribute: ProductAttributeModel,
  UnitType: UnitTypeModel,
};

// Optional: Additional types or utility functions related to these models
export type ProductWithCategory = Product & { category: Category };

export function isProductArchived(product: Product): boolean {
  return product.isArchived;
}
