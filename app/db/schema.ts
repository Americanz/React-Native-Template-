import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("User", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username"),
  email: text("email"),
  authToken: text("authToken"),
  refreshToken: text("refreshToken"),
  lastLogin: text("lastLogin"),
});

export const syncLog = sqliteTable("SyncLog", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  entityType: text("entityType").notNull(),
  syncStartTime: text("syncStartTime").notNull(),
  syncEndTime: text("syncEndTime").notNull(),
  itemsSynced: integer("itemsSynced").notNull(),
  status: text("status").notNull(),
  errorMessage: text("errorMessage"),
});

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

export const sync = sqliteTable("Sync", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tableName: text("tableName"),
  lastSyncTime: text("lastSyncTime"),
});

export const drizzleMigrations = sqliteTable("drizzle_migrations", {
  id: integer("id").primaryKey(),
  hash: text("hash").notNull(),
  created_at: integer("created_at"),
});

// Утилітний тип для створення уніфікованого типу
type Unified<T> = T extends { id: { autoIncrement: true } }
  ? Omit<typeof T.$inferSelect, "id"> & { id?: number }
  : typeof T.$inferSelect;

// Уніфіковані типи для кожної таблиці
export type Product = Unified<typeof product>;
export type Category = Unified<typeof category>;
export type ProductAttribute = Unified<typeof productAttribute>;
export type UnitType = Unified<typeof unitType>;
export type SyncLog = Unified<typeof syncLog>;
export type User = Unified<typeof user>;
