import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
  text,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const PaymentStatus = mysqlEnum("status", [
  "initiated",
  "pending",
  "successful",
  "failed",
  "refunded",
  "cancelled",
]);

export const Payment = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  orderId: varchar("order_id", { length: 255 }).notNull(),
  paymentId: varchar("payment_id", { length: 255 }).default(""),
  plan: varchar("plan", { length: 255 }).notNull(),
  amount: int("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  status: PaymentStatus.notNull().default("initiated"),
  receipt: varchar("receipt", { length: 255 }).notNull(),
  paymentData: text("payment_data").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type PaymentInsertModel = InferInsertModel<typeof Payment>;
export type PaymentSelectModel = InferSelectModel<typeof Payment>;
