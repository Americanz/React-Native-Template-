import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("User", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username"),
  email: text("email"),
  authToken: text("authToken"),
  refreshToken: text("refreshToken"),
  lastLogin: text("lastLogin"),
});

type Unified<T> = T extends { id: { autoIncrement: true } }
  ? Omit<typeof T.$inferSelect, "id"> & { id?: number }
  : typeof T.$inferSelect;

export type User = Unified<typeof user>;
