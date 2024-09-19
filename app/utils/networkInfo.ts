import NetInfo from "@react-native-community/netinfo";

export const NetworkInfo = {
  isConnected: true,

  initialize() {
    NetInfo.addEventListener((state) => {
      this.isConnected = state.isConnected ?? false;
    });
  },
};
