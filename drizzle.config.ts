import { defineConfig } from "drizzle-kit";
import { env } from "./env";

export default defineConfig({
  schema: ["./app/models/schema.ts", "./app/api/models/schema.ts"],
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  // Remove tablesFilter for now
});
