import { types, Instance } from "mobx-state-tree";

export const SyncModel = types.model("Sync", {
  id: types.identifierNumber,
  tableName: types.string,
  lastSyncTime: types.string,
});

export const SyncLogModel = types.model("SyncLog", {
  id: types.identifierNumber,
  entityType: types.string,
  syncStartTime: types.string,
  syncEndTime: types.string,
  itemsSynced: types.number,
  status: types.string,
  errorMessage: types.maybe(types.string),
});

export interface Sync extends Instance<typeof SyncModel> {}
export interface SyncLog extends Instance<typeof SyncLogModel> {}

export const Models = {
  Sync: SyncModel,
  SyncLog: SyncLogModel,
};
