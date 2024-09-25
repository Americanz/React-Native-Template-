import { createLogger } from "app/utils/logger";
import { EntityType, SyncResult, SyncConfig } from "./types";
import { syncProducts, syncCategories } from "./productSync";
import * as dbOperations from "../dbOperations";

const logger = createLogger("SyncService", { minLevel: "info" });

export const syncService = {
  syncProducts,
  syncCategories,

  async syncAll(
    configs?: Record<EntityType, SyncConfig>
  ): Promise<Record<EntityType, SyncResult>> {
    const categoryResult = await this.syncCategories(configs?.category);
    const productResult = await this.syncProducts(configs?.product);
    return { category: categoryResult, product: productResult };
  },

  async getSyncStats(entityType: EntityType) {
    return await dbOperations.getSyncStats(entityType);
  },

  startPeriodicSync(
    intervalMinutes: number,
    configs?: Record<EntityType, SyncConfig>
  ) {
    setInterval(async () => {
      logger.info("Starting periodic sync");
      const results = await this.syncAll(configs);
      logger.info("Periodic sync completed", results);
    }, intervalMinutes * 60 * 1000);
  },
};
