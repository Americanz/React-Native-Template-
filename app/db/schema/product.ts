import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const product = sqliteTable("Product", {
  id: integer("id").primaryKey(),
  code: text("code"),
  name: text("name"),
  description: text("description"),
  price: real("price"),
  currency: text("currency"),
  categoryId: integer("categoryId").references(() => category.id),
  isArchived: integer("isArchived", { mode: "boolean" }),
  createdAt: text("createdAt"),
  updatedAt: text("updatedAt"),
  status: text("status"),
  barcode: text("barcode"),
  updateTime: text("updateTime"),
  createTime: text("createTime"),
  unitTypeId: integer("unitTypeId"),
  attribute: text("attribute"),
});

export const category = sqliteTable("Category", {
  id: integer("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  parentId: integer("parentId"),
  status: text("status"),
});

export const productAttribute = sqliteTable("ProductAttribute", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  alias: text("alias"),
  name: text("name"),
  value: text("value"),
});

export const unitType = sqliteTable("UnitType", {
  id: integer("id").primaryKey(),
  name: text("name"),
  description: text("description"),
});


type Unified<T> = T extends { id: { autoIncrement: true } }
  ? Omit<typeof T.$inferSelect, "id"> & { id?: number }
  : typeof T.$inferSelect;


export type Product = Unified<typeof product>;
export type Category = Unified<typeof category>;
export type ProductAttribute = Unified<typeof productAttribute>;
export type UnitType = Unified<typeof unitType>;
