import { makeAutoObservable, runInAction } from "mobx";
import { load, save } from "../storage";

export interface UserInfo {
  name: string;
  phoneNumber: string;
  theme: "light" | "dark" | "system";
}

const USER_STORAGE_KEY = "user_info";

class UserStore {
  userInfo: UserInfo = {
    name: "",
    phoneNumber: "",
    theme: "system",
  };

  constructor() {
    makeAutoObservable(this);
    this.loadUserInfo();
  }

  setUserInfo(info: Partial<UserInfo>) {
    Object.assign(this.userInfo, info);
    this.saveUserInfo();
  }

  setTheme(theme: "light" | "dark" | "system") {
    this.userInfo.theme = theme;
    this.saveUserInfo();
  }

  private async loadUserInfo() {
    try {
      const storedInfo = await load(USER_STORAGE_KEY);
      if (storedInfo) {
        runInAction(() => {
          this.userInfo = { ...this.userInfo, ...(storedInfo as UserInfo) };
        });
      }
    } catch (error) {
      console.error("Failed to load user info:", error);
    }
  }

  private async saveUserInfo() {
    try {
      await save(USER_STORAGE_KEY, this.userInfo);
    } catch (error) {
      console.error("Failed to save user info:", error);
    }
  }
}

class UIStore {
  tabStatuses = {
    DemoShowroom: true,
    DemoCommunity: false,
    DemoPodcastList: false,
    DemoDebug: false,
    BarcodeScanner: true,
    ProductScreen: true,
    Settings: true,
  };

  constructor() {
    makeAutoObservable(this);
  }

  toggleTabVisibility(tabName: keyof typeof this.tabStatuses) {
    this.tabStatuses[tabName] = !this.tabStatuses[tabName];
  }

  showTab(tabName: keyof typeof this.tabStatuses) {
    this.tabStatuses[tabName] = true;
  }

  hideTab(tabName: keyof typeof this.tabStatuses) {
    this.tabStatuses[tabName] = false;
  }
}

export const userStore = new UserStore();
export const uiStore = new UIStore();
