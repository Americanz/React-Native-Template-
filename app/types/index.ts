// types/index.ts
import * as ProductModule from "./product";
import * as UserModule from "./user";
import * as SyncModule from "./sync";
import * as DrizzleMigrationsModule from "./drizzleMigrations";

export const Models = {
  ...ProductModule.Models,
  ...UserModule.Models,
  ...SyncModule.Models,
  ...DrizzleMigrationsModule.Models,
};

export type ModelTypesType = typeof Models;

// Re-export all other exports from modules
export * from "./product";
export * from "./user";
export * from "./sync";
export * from "./drizzleMigrations";

// Експортуємо API типи
export * from "./api";
