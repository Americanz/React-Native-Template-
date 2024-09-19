import { useState, useEffect } from "react";
import { initDatabase } from "../dataManager";

export const useDatabase = () => {
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        const db = await initDatabase();
        setIsDatabaseReady(true);
        console.log("Database initialized successfully:", db);
      } catch (err) {
        console.error("Failed to initialize database:", err);
        setError(err.message || "Unknown error");
      }
    };

    initializeDB();
  }, []);

  return { isDatabaseReady, error };
};
