import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const syncLog = sqliteTable("SyncLog", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  entityType: text("entityType").notNull(),
  syncStartTime: text("syncStartTime").notNull(),
  syncEndTime: text("syncEndTime").notNull(),
  itemsSynced: integer("itemsSynced").notNull(),
  status: text("status").notNull(),
  errorMessage: text("errorMessage"),
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

type Unified<T> = T extends { id: { autoIncrement: true } }
  ? Omit<typeof T.$inferSelect, "id"> & { id?: number }
  : typeof T.$inferSelect;


export type SyncLog = Unified<typeof syncLog>;
