"use server";

import Razorpay from "razorpay";
import { eq } from "drizzle-orm";
import { env } from "../../env";
import { db } from "../config/db";
import { Payment, PaymentInsertModel } from "../models/payment";

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID as string,
  key_secret: env.RAZORPAY_KEY_SECRET as string,
});

export async function createRazorpayOrder(
  userId: string,
  plan: string,
  amount: number,
  currency: string = "INR",
  receipt: string
) {
  const options = {
    amount: amount * 100, // Amount in the smallest currency unit (e.g., paise)
    currency: currency,
    receipt: receipt,
  };

  try {
    const order = await razorpay.orders.create(options);

    // Store the payment details in the database
    const paymentData: PaymentInsertModel = {
      userId,
      orderId: order.id,
      plan,
      amount,
      currency,
      status: "initiated",
      receipt,
    };

    await db.insert(Payment).values(paymentData);

    return order;
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    throw new Error("Failed to create Razorpay order");
  }
}

export async function updatePaymentStatus(
  orderId: string,
  status: "successful" | "failed" | "pending" | "refunded" | "cancelled",
  paymentId?: string,
  paymentData?: string
) {
  try {
    await db
      .update(Payment)
      .set({
        status,
        paymentId: paymentId ?? null,
        paymentData: paymentData ?? null,
      })
      .where(eq(Payment.orderId, orderId));

    console.log(`Payment status updated to ${status} for order ${orderId}`);
  } catch (error) {
    console.error("Failed to update payment status:", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

// New function to check payment status
export async function checkPaymentStatus(orderId: string) {
  try {
    const payments = await razorpay.orders.fetchPayments(orderId);
    if (payments.items.length > 0) {
      const payment = payments.items[payments.items.length - 1]; // Get the last payment attempt

      if (payment.status === "captured") {
        return "paid";
      } else if (payment.status === "failed") {
        return "failed";
      } else {
        return "pending";
      }
    } else {
      return "cancelled";
    }
  } catch (error) {
    console.error("Error fetching payment status from Razorpay:", error);
    return "cancelled";
  }
}
