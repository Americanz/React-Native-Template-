import { getDatabase } from "../dbManager";
import * as schema from "../schema";
import { eq, desc, sql } from "drizzle-orm";
import { createLogger } from "app/utils/logger";

const logger = createLogger("syncOperations", { minLevel: "info" });

export type Product = typeof schema.product.$inferSelect;
export type Category = typeof schema.category.$inferSelect;

export type EntityType = "product" | "category";

export const mapApiDataToDbSchema = (
  apiData: Record<string, any>,
  dbSchema: Record<string, any>
) => {
  const mappedData: Record<string, any> = {};
  for (const field in dbSchema) {
    if (apiData[field] !== undefined) {
      mappedData[field] = apiData[field];
    }
  }
  return mappedData;
};

export const getLastSyncTime = async (entityType: EntityType) => {
  try {
    const db = getDatabase();
    const [result] = await db
      .select({ syncEndTime: schema.syncLog.syncEndTime })
      .from(schema.syncLog)
      .where(eq(schema.syncLog.entityType, entityType))
      .orderBy(desc(schema.syncLog.syncEndTime))
      .limit(1)
      .execute();

    return result?.syncEndTime || null;
  } catch (error) {
    logger.error(`Error getting last sync time for ${entityType}:`, error);
    throw error;
  }
};

export const logSync = async (syncData: {
  entityType: EntityType;
  syncStartTime: string;
  syncEndTime: string;
  itemsSynced: number;
  status: "success" | "failed";
  errorMessage?: string;
}) => {
  try {
    const db = getDatabase();
    await db.insert(schema.syncLog).values(syncData).execute();
    logger.info(`Sync log for ${syncData.entityType} saved successfully`);
  } catch (error) {
    logger.error(`Error logging sync for ${syncData.entityType}:`, error);
    throw error;
  }
};

export const getSyncStats = async (entityType: EntityType, limit: 10) => {
  try {
    const db = getDatabase();
    return await db
      .select()
      .from(schema.syncLog)
      .where(eq(schema.syncLog.entityType, entityType))
      .orderBy(desc(schema.syncLog.syncEndTime))
      .limit(limit)
      .execute();
  } catch (error) {
    logger.error(`Error getting sync stats for ${entityType}:`, error);
    throw error;
  }
};

export const upsertProduct = async (productData: Product): Promise<void> => {
  try {
    const db = getDatabase();
    const mappedProduct = mapApiDataToDbSchema(productData, schema.product);

    if (productData.attribute) {
      mappedProduct.attribute = JSON.stringify(productData.attribute);
    }

    await db
      .insert(schema.product)
      .values(mappedProduct)
      .onConflictDoUpdate({
        target: schema.product.id,
        set: mappedProduct,
      })
      .execute();

    logger.info(`Product ${mappedProduct.id} upserted successfully`);
  } catch (error) {
    logger.error(`Error upserting product ${productData.id}:`, error);
    throw error;
  }
};

export const batchUpsertProducts = async (
  products: Product[]
): Promise<void> => {
  const db = getDatabase();
  const batchSize = 100;

  try {
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);

      await db.transaction(async (tx) => {
        const queries = batch.map((product) => {
          const updateFields = mapApiDataToDbSchema(product, schema.product);

          if (product.attribute) {
            updateFields.attribute = JSON.stringify(product.attribute);
          }

          return tx
            .insert(schema.product)
            .values(product)
            .onConflictDoUpdate({
              target: schema.product.id,
              set: {
                ...updateFields,
                updatedAt: sql`CURRENT_TIMESTAMP`,
              },
            })
            .execute();
        });

        await Promise.all(queries);
      });

      console.log(`Processed batch ${i / batchSize + 1}`);
    }

    logger.info(`Batch upsert completed for ${products.length} products`);
  } catch (error) {
    logger.error("Error during batch upsert:", error);
    throw error;
  }
};

export const upsertCategory = async (categoryData: Category): Promise<void> => {
  try {
    const db = getDatabase();
    const mappedCategory = mapApiDataToDbSchema(categoryData, schema.category);

    await db
      .insert(schema.category)
      .values(mappedCategory)
      .onConflictDoUpdate({
        target: schema.category.id,
        set: mappedCategory,
      })
      .execute();

    logger.info(`Category ${mappedCategory.name} upserted successfully`);
  } catch (error) {
    logger.error(`Error upserting category ${categoryData.id}:`, error);
    throw error;
  }
};
