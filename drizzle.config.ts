import { type Config } from "drizzle-kit";
import { env } from "./env";

export default {
  schema: "./app/api/models/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["bookStoreGPT_*"],
} satisfies Config;
