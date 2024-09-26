import type { Config } from 'drizzle-kit';
export default {
  schema: './app/db/schema',
  out: './app/db/drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
