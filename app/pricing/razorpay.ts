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
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in the smallest currency unit (e.g., paise)
      currency: currency,
      receipt: receipt,
      // method: "card",
    });

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

    return { success: true, order };
  } catch (error: any) {
    console.error("Razorpay order creation failed:", error);
    return {
      success: false,
      error: error.message || "Failed to create Razorpay order",
    };
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
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update payment status:", error);
    return {
      success: false,
      error: error.message || "Failed to update payment status",
    };
  }
}

export async function checkPaymentStatus(orderId: string) {
  try {
    const payments = await razorpay.orders.fetchPayments(orderId);

    if (payments.items.length > 0) {
      const payment = payments.items[payments.items.length - 1]; // Get the latest payment attempt
      const paymentData = payment; // The full payment object

      let status: "paid" | "failed" | "pending" | "cancelled";

      if (payment.status === "captured") {
        status = "paid";
      } else if (payment.status === "failed") {
        status = "failed";
      } else if (payment.status === "authorized") {
        status = "pending";
      } else {
        status = "pending"; // Other statuses can be mapped to 'pending' if appropriate
      }
      return {
        success: true,
        status,
        paymentId: payment.id,
        paymentData: paymentData, // The full payment object
      };
    } else {
      // No payment attempts found for this order
      return {
        success: true,
        status: "cancelled",
        paymentId: null,
        paymentData: null,
      };
    }
  } catch (error: any) {
    console.error("Error fetching payment status from Razorpay:", error);
    return {
      success: false,
      error: error.message || "Error fetching payment status from Razorpay",
      status: "cancelled",
      paymentId: null,
      paymentData: null,
    };
  }
}
