import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const ProductAttributeModel = types.model("ProductAttribute", {
  id: types.number,
  name: types.string,
  alias: types.maybeNull(types.string),
  value: types.union(types.string, types.number),
});

export const CategoryModel = types.model("ProductCategory", {
  id: types.number,
  name: types.string,
  code: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  updateTime: types.maybeNull(types.string),
  createTime: types.maybeNull(types.string),
  parentId: types.maybeNull(types.number),
  status: types.maybeNull(types.string)
});

export const ProductModel = types.model("Product", {
  id: types.number,
  currency: types.string,
  code: types.maybeNull(types.string),
  isArchived: types.boolean,
  name: types.string,
  updateTime: types.string,
  createTime: types.string,
  updatedAt: types.string,
  barcode: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  createdAt: types.maybeNull(types.string),
  status: types.string,
  categoryId: types.maybeNull(types.number),
  unitTypeId: types.maybeNull(types.number),
  attribute: types.array(ProductAttributeModel),
  category: types.maybeNull(CategoryModel),
});

export interface Product extends Instance<typeof ProductModel> {}
export interface Category extends Instance<typeof CategoryModel> {}
export interface ProductSnapshot extends SnapshotOut<typeof ProductModel> {}

export type ProductItem = SnapshotOut<typeof ProductModel>;
export type CategoryItem = SnapshotOut<typeof CategoryModel>;
export type ProductAttributeItem = SnapshotOut<typeof ProductAttributeModel>;
