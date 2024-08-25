"use server";

import Razorpay from "razorpay";
import { env } from "../../env";
import { db } from "../config/db";
import { Payment, PaymentInsertModel } from "../models/payment";

export async function createRazorpayOrder(
  userId: string,
  plan: string,
  amount: number,
  currency: string = "INR",
  receipt: string
) {
  const razorpay = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID as "",
    key_secret: env.RAZORPAY_KEY_SECRET,
  });

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
