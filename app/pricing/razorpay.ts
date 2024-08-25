"use server";

import Razorpay from "razorpay";
import { env } from "../../env";

export async function createRazorpayOrder(
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
    return order;
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    throw new Error("Failed to create Razorpay order");
  }
}
