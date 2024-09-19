// request/index.ts

import { create, ApiResponse, ApisauceInstance } from "apisauce";
import Config from "../../config";
import { Platform } from "react-native";
import { createLogger } from "../../utils/logger";
import { ApiResult } from "../../types/apiTypes";

const logger = createLogger("API");

export interface ApiConfig {
  url: string;
  timeout: number;
}

interface RequestConfig<P = unknown, D = unknown> {
  url: string;
  method: "get" | "post" | "put" | "delete";
  params?: P;
  data?: D;
}

export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public data?: any,
    public problem?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const DEFAULT_API_CONFIG: ApiConfig = {
  url: __DEV__
    ? Platform.select({
        android: "http://192.168.1.55:8000",
        ios: "http://192.168.1.55:8000",
        default: "http://192.168.1.55:8000",
      }) ?? Config.API_URL
    : Config.API_URL,
  timeout: 10000,
};

export const api: ApisauceInstance = create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: { Accept: "application/json" },
});

async function checkApiAvailability(): Promise<boolean> {
  try {
    logger.info("Checking API availability...");
    const response = await api.get("/api/v1/auth/health");
    return response.ok;
  } catch (error) {
    logger.error("API availability check failed", error);
    return false;
  }
}

export async function request<T, P = unknown, D = unknown>(
  config: RequestConfig<P, D>
): Promise<ApiResult<T>> {
  try {
    if (__DEV__ && !(await checkApiAvailability())) {
      throw new ApiError(`API is not available at ${DEFAULT_API_CONFIG.url}`);
    }

    const response: ApiResponse<ApiResult<T>> = await api[config.method](
      config.url,
      config.method === "get" || config.method === "delete"
        ? config.params
        : config.data
    );

    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new ApiError(
        response.data?.msg ?? response.problem ?? "An unknown error occurred",
        response.status,
        response.data
      );
    }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error(`API Error: ${error.message}`, error);
      throw error;
    } else if (error instanceof Error) {
      logger.error(`Unexpected Error: ${error.message}`, error);
      throw new ApiError(error.message);
    } else {
      logger.error(`Unknown Error`, error);
      throw new ApiError("An unknown error occurred");
    }
  }
}
