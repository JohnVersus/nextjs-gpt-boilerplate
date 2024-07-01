import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const Book = mysqlTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  author: varchar("author", { length: 255 }),
  publishedYear: int("published_year"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type BookInsertModel = InferInsertModel<typeof Book>;
export type BookSelectModel = InferSelectModel<typeof Book>;
