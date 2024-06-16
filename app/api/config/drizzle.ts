import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bookstore",
});

export const db = drizzle(pool);
