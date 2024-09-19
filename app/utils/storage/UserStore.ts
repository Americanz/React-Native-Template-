import { makeAutoObservable, runInAction } from "mobx";
import { load, save } from "../storage";

export interface UserInfo {
  name: string;
  phoneNumber: string;
  // Додайте інші поля, які вам потрібні
}

const USER_STORAGE_KEY = "user_info";

class UserStore {
  userInfo: UserInfo = {
    name: "",
    phoneNumber: "",
  };

  constructor() {
    makeAutoObservable(this);
    this.loadUserInfo();
  }

  setUserInfo(info: Partial<UserInfo>) {
    Object.assign(this.userInfo, info);
    this.saveUserInfo();
  }

  private async loadUserInfo() {
    try {
      const storedInfo = await load(USER_STORAGE_KEY);
      if (storedInfo) {
        runInAction(() => {
          this.userInfo = storedInfo as UserInfo;
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

// Клас для управління інтерфейсом (UI)
class UIStore {
  tabStatuses = {
    DemoShowroom: true,
    DemoCommunity: true,
    DemoPodcastList: true,
    DemoDebug: true,
    BarcodeScanner: true,
    Settings: true,
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для перемикання видимості конкретного табу
  toggleTabVisibility(tabName: keyof typeof this.tabStatuses) {
    this.tabStatuses[tabName] = !this.tabStatuses[tabName];
  }

  // Метод для явного показу табу
  showTab(tabName: keyof typeof this.tabStatuses) {
    this.tabStatuses[tabName] = true;
  }

  // Метод для явного приховання табу
  hideTab(tabName: keyof typeof this.tabStatuses) {
    this.tabStatuses[tabName] = false;
  }
}

export const userStore = new UserStore();
export const uiStore = new UIStore();
