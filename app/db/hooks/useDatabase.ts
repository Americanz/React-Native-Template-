import { useState, useEffect } from "react";
import { initDatabase, getDatabase } from "../dataManager";

export function useDatabase() {
  const [db, setDb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initDb() {
      try {
        await initDatabase();
        setDb(getDatabase());
        setIsLoading(false);
      } catch (e) {
        console.error("Failed to initialize database:", e);
        setError(e);
        setIsLoading(false);
      }
    }

    initDb();

    return () => {
      // Тут можна додати логіку для закриття бази даних, якщо потрібно
    };
  }, []);

  return { db, isLoading, error };
}
