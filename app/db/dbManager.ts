import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { sql } from "drizzle-orm";
import * as schema from "./schema";
import migrations from "./drizzle/migrations";
import { APPLY_MIGRATIONS, DATABASE_NAME, RESET_DATABASE } from "@env";
import * as FileSystem from "expo-file-system";
import { openDatabaseAsync } from "expo-sqlite/next";

let sqliteDb: ReturnType<typeof openDatabaseAsync> | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export const initDatabase = async () => {
  if (db) return db;

  if (!DATABASE_NAME) {
    throw new Error("DATABASE_NAME is not defined in .env file");
  }

  const dbDirectory = `${FileSystem.documentDirectory}SQLite`;
  const dbPath = `${dbDirectory}/${DATABASE_NAME}`;

  if (RESET_DATABASE === "true") {
    await resetDatabase(dbPath);
  }

  sqliteDb = await openDatabaseAsync(DATABASE_NAME);
  db = drizzle(sqliteDb, { schema });

  console.log(`Database ${DATABASE_NAME} connected successfully`);

  if (APPLY_MIGRATIONS === "true") {
    await checkAndApplyMigrations();
  } else {
    console.log("Skipping migrations based on environment configuration");
  }

  return db;
};

const resetDatabase = async (dbPath: string) => {
  try {
    const dbFileInfo = await FileSystem.getInfoAsync(dbPath);
    if (dbFileInfo.exists) {
      await FileSystem.deleteAsync(dbPath, { idempotent: true });
      console.log("Database deleted successfully");
    } else {
      console.log("Database file does not exist, no need to delete.");
    }
  } catch (error) {
    console.error("Error deleting database:", error);
  }
};

const checkAndApplyMigrations = async () => {
  if (!db) throw new Error("Database not initialized");

  try {
    const tableExists = await db
      .select({ count: sql`count(*)` })
      .from(sql`sqlite_master`)
      .where(sql`type = 'table' AND name = 'drizzle_migrations'`)
      .execute();

    if (Number(tableExists[0]?.count) === 0) {
      console.log("Migrations table not found. Applying all migrations.");
      await applyMigrations();
      return;
    }

    const appliedMigrations = await db
      .select()
      .from(schema.drizzleMigrations)
      .execute();

    const pendingMigrations = migrations.migrations.filter(
      (migration: any) =>
        !appliedMigrations.some((applied) => applied.id === migration.id)
    );

    if (pendingMigrations.length > 0) {
      console.log(
        `Found ${pendingMigrations.length} pending migrations. Applying...`
      );
      await applyMigrations();
    } else {
      console.log("All migrations are up to date.");
    }
  } catch (error) {
    console.error("Error checking migrations:", error);
    throw error;
  }
};

const applyMigrations = async () => {
  if (!db) throw new Error("Database not initialized");

  try {
    await migrate(db, migrations);
    console.log("Migrations applied successfully");
  } catch (error) {
    console.error("Error applying migrations:", error);
    throw error;
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error("Database not initialized. Call initDatabase first.");
  }
  return db;
};

export const closeDatabase = async () => {
  if (sqliteDb) {
    await sqliteDb.closeAsync();
    sqliteDb = null;
  }
  if (db) {
    db = null;
  }
  console.log("Database closed successfully");
};
