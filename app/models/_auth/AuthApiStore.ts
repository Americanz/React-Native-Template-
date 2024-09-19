import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { fetchLogin, fetchRefreshToken } from "../services/api/auth";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TokenPayload {
  data: {
    userId: number;
    userName: string;
    tokenType: string;
  };
  iat: number;
  exp: number;
}

const STORAGE_KEY = "AUTH_DATA";

export const AuthApiStoreModel = types
  .model("AutApiStore")
  .props({
    authToken: types.maybe(types.string),
    refreshToken: types.maybe(types.string),
    username: "",
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
    userId: types.maybe(types.number),
    userName: types.maybe(types.string),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken;
    },
    get validationError() {
      if (store.username.length === 0) return "Username can't be blank";
      if (store.username.length < 3)
        return "Username must be at least 3 characters";
      if (!/^[a-zA-Z0-9_]+$/.test(store.username))
        return "Username can only contain letters, numbers, and underscores";
      return "";
    },
  }))
  .actions((store) => ({
    setAuthTokens(tokens: { token: string; refreshToken: string }) {
      store.authToken = tokens.token;
      store.refreshToken = tokens.refreshToken;

      const decoded = jwtDecode<TokenPayload>(tokens.token);
      store.userId = decoded.data.userId;
      store.userName = decoded.data.userName;

      // Зберігаємо дані в локальному сховищі
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          authToken: tokens.token,
          refreshToken: tokens.refreshToken,
          userId: decoded.data.userId,
          userName: decoded.data.userName,
        })
      );
    },
    setUsername(value: string) {
      store.username = value.trim();
    },
    setIsLoading(value: boolean) {
      store.isLoading = value;
    },
    setError(value: string | undefined) {
      store.error = value;
    },
    logout() {
      store.authToken = undefined;
      store.refreshToken = undefined;
      store.username = "";
      store.error = undefined;
      store.userId = undefined;
      store.userName = undefined;
      AsyncStorage.removeItem(STORAGE_KEY);
    },
    login: flow(function* (password: string) {
      store.setIsLoading(true);
      store.setError(undefined);
      try {
        const response = yield fetchLogin(store.username, password);
        if (response.code === "0000") {
          store.setAuthTokens(response.data);
        } else {
          throw new Error(response.msg || "Login failed");
        }
      } catch (error) {
        store.setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        store.setIsLoading(false);
      }
    }),
    refreshAuthToken: flow(function* () {
      if (!store.refreshToken) {
        throw new Error("No refresh token available");
      }
      try {
        const response = yield fetchRefreshToken(store.refreshToken);
        if (response.code === "0000") {
          store.setAuthTokens(response.data);
        } else {
          throw new Error(response.msg || "Failed to refresh token");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        store.logout(); // Logout user if token refresh fails
      }
    }),
    loadAuthData: flow(function* () {
      const storedData = yield AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        store.authToken = parsedData.authToken;
        store.refreshToken = parsedData.refreshToken;
        store.userId = parsedData.userId;
        store.userName = parsedData.userName;

        // Перевіряємо, чи не застарів токен
        const decoded = jwtDecode<TokenPayload>(parsedData.authToken);
        if (decoded.exp * 1000 < Date.now()) {
          // Якщо токен застарів, спробуємо оновити його
          yield store.refreshAuthToken();
        }
      }
    }),
  }));

export interface AuthApiStore
  extends Instance<typeof AuthApiStoreModel> {}
export interface AuthApiStoreSnapshot
  extends SnapshotOut<typeof AuthApiStoreModel> {}
