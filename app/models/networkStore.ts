import { types, flow } from "mobx-state-tree";
import NetInfo from "@react-native-community/netinfo";

const PING_URL = "http://192.168.1.55:8000/api/v1/auth/health"; // Замініть на URL вашого API

export const NetworkStoreModel = types
  .model("NetworkStore")
  .props({
    isOnline: types.optional(types.boolean, true),
    lastChecked: types.optional(types.Date, new Date()),
  })
  .actions((self) => ({
    setOnlineStatus(status: boolean) {
      self.isOnline = status;
      self.lastChecked = new Date();
    },
    setupNetInfoListener: flow(function* () {
      NetInfo.addEventListener((state) => {
        if (state.isConnected) {
          self.checkServerConnection();
        } else {
          self.setOnlineStatus(false);
        }
      });
    }),
    checkServerConnection: flow(function* () {
      try {
        const response = yield fetch(PING_URL, {
          method: "GET",
          timeout: 5000,
        });
        self.setOnlineStatus(response.ok);
      } catch (error) {
        console.error("Error checking server connection:", error);
        self.setOnlineStatus(false);
      }
    }),
    forceCheck: flow(function* () {
      const netInfoState = yield NetInfo.fetch();
      if (netInfoState.isConnected) {
        yield self.checkServerConnection();
      } else {
        self.setOnlineStatus(false);
      }
    }),
  }))
  .views((self) => ({
    get isConnected() {
      return self.isOnline;
    },
  }));

export interface NetworkStore extends Instance<typeof NetworkStoreModel> {}
