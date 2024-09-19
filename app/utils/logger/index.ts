type LogLevel = "debug" | "info" | "warn" | "error";

interface LoggerOptions {
  isDev?: boolean;
  minLevel?: LogLevel;
}

const logLevels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export function createLogger(prefix: string, options: LoggerOptions = {}) {
  const isDev = options.isDev ?? __DEV__;
  const minLevel = options.minLevel ?? "debug";

  function log(level: LogLevel, message: string, data?: any) {
    if (isDev && logLevels[level] >= logLevels[minLevel]) {
      const logMethod = level === "error" ? console.error : console.log;
      const timestamp = new Date().toISOString();
      logMethod(
        `[${timestamp}] [${prefix}] [${level.toUpperCase()}] ${message}`,
        data ? JSON.stringify(data, null, 2) : ""
      );
    }
  }

  return {
    debug: (message: string, data?: any) => log("debug", message, data),
    info: (message: string, data?: any) => log("info", message, data),
    warn: (message: string, data?: any) => log("warn", message, data),
    error: (message: string, data?: any) => log("error", message, data),
  };
}
