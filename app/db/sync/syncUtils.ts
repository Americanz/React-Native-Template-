import { NetworkInfo } from "app/utils/networkInfo";
import * as dbOperations from "../dbOperations";
import { EntityType, SyncResult, SyncParams, SyncConfig } from "./types";
import { ApiResult } from "app/types/api";
import { createLogger } from "app/utils/logger";

const logger = createLogger("SyncService", { minLevel: "info" });

export async function syncEntity<T>(
  entityType: EntityType,
  fetchFunction: (params: SyncParams) => Promise<ApiResult<T[]>>,
  upsertFunction: (item: T) => Promise<void>,
  config: SyncConfig
): Promise<SyncResult> {
  const syncStartTime = new Date().toISOString();
  let itemsSynced = 0;
  let status: "success" | "failed" = "success";
  let errorMessage = "";

  try {
    if (!NetworkInfo.isConnected) {
      throw new Error("No internet connection");
    }

    const params: SyncParams = {
      current: config.initialPage,
      size: config.pageSize,
    };

    let hasMoreItems = true;
    while (hasMoreItems) {
      const response = await fetchFunction(params);

      if (response.code === "0000") {
        const serverItems = response.data.records;

        for (const item of serverItems) {
          try {
            await upsertFunction(item);
            itemsSynced++;
          } catch (error) {
            logger.error(
              `Error upserting ${entityType} ${(item as any).id}:`,
              error
            );
          }
        }

        hasMoreItems = serverItems.length === params.size;
        if (hasMoreItems) {
          params.current = (params.current || 1) + 1;
        }
      } else {
        throw new Error(`Error syncing ${entityType}s: ${response.msg}`);
      }
    }

    logger.info(`${entityType}s synced successfully`);
  } catch (error) {
    status = "failed";
    errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Sync error for ${entityType}:`, errorMessage);
  } finally {
    const syncEndTime = new Date().toISOString();
    await dbOperations.logSync({
      entityType,
      syncStartTime,
      syncEndTime,
      itemsSynced,
      status,
      errorMessage,
    });
  }

  return { itemsSynced, status, errorMessage };
}
