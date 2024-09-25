import { getDatabase } from "../dbManager";
import { sql } from "drizzle-orm";
import * as schema from "../schema";
import * as FileSystem from "expo-file-system";
import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite/next";
import { DATABASE_NAME } from "@env";
import { createLogger } from "app/utils/logger";

const logger = createLogger("dbStructure", { minLevel: "info" });

export interface TableInfo {
  name: string;
  rowCount: number;
  columns: Array<{ name: string; type: string }>;
  sampleData: any[];
}

export interface DatabaseInfo {
  name: string;
  size: string;
  path: string;
  tables: string[];
  version?: string;
}

export const getDatabaseInfo = async (): Promise<DatabaseInfo> => {
  const db = getDatabase();
  const dbPath = `${FileSystem.documentDirectory}SQLite/${DATABASE_NAME}`;

  try {
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    const size = fileInfo.exists
      ? `${(fileInfo.size / (1024 * 1024)).toFixed(2)} MB`
      : "Unknown";

    // Get tables using Drizzle's introspection
    const tablesResult = await db
      .select({ name: sql`name` })
      .from(sql`sqlite_master`)
      .where(sql`type = 'table' AND name NOT LIKE 'sqlite_%'`)
      .execute();

    const tables = tablesResult.map((r) => r.name);

    let version = "Unknown";
    try {
      const sqliteDb: SQLiteDatabase = await openDatabaseAsync(DATABASE_NAME);
      const versionResult: any[] = await sqliteDb.getAllAsync(
        "SELECT sqlite_version() as version"
      );

      if (versionResult && versionResult.length > 0) {
        version = versionResult[0].version;
      }
    } catch (versionError) {
      logger.error("Error getting SQLite version:", versionError);
    }

    return { name: DATABASE_NAME, size, path: dbPath, tables, version };
  } catch (error) {
    logger.error("Error in getDatabaseInfo:", error);
    throw error;
  }
};

export const getTableInfo = async (tableName: string): Promise<TableInfo> => {
  logger.info(`Fetching info for table: ${tableName}`);

  const db = getDatabase();
  try {
    // Get column information
    const columnsInfo = await db
      .select()
      .from(sql`pragma_table_info(${sql.identifier(tableName)})`)
      .execute();

    const columns = columnsInfo.map((col) => ({
      name: col.name,
      type: col.type,
    }));
    logger.info(`Columns for ${tableName}:`, columns);

    // Get row count
    const rowCountResult = await db
      .select({ count: sql`count(*)` })
      .from(schema[tableName])
      .execute();
    const rowCount = Number(rowCountResult[0]?.count);
    logger.info(`Row count for ${tableName}:`, rowCount);

    // Get sample data
    const sampleData = await db
      .select()
      .from(schema[tableName])
      .limit(5)
      .execute();
    logger.info(`Sample data for ${tableName}:`, sampleData);

    return {
      name: tableName,
      rowCount,
      columns,
      sampleData,
    };
  } catch (error) {
    logger.error(`Error fetching info for ${tableName}:`, error);
    throw error;
  }
};
