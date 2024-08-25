"use client";

import { Button } from "@chakra-ui/react";
import { createRazorpayOrder } from "./razorpay";

type PaymentButtonProps = {
  plan: string;
  amount: number;
  user: { id: string; firstName: string; email: string };
};

export function PaymentButton({ plan, amount, user }: PaymentButtonProps) {
  const handlePayment = async () => {
    const receipt = `${plan}_${Date.now()}`;

    try {
      // Create an order using the server action
      const order = await createRazorpayOrder(
        user.id,
        plan,
        amount,
        "INR",
        receipt
      );

      if (order && order.id) {
        // Trigger Razorpay payment
        const razorpayOptions = {
          key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
          amount: order.amount,
          currency: order.currency,
          name: "GPT Boilerplate",
          description: `Payment for ${plan}`,
          image: "/icon_black.svg", // Add your logo here
          order_id: order.id,
          handler: function (response: any) {
            alert(
              "Payment Successful! Payment ID: " + response.razorpay_payment_id
            );
            // You can handle post-payment actions here (e.g., storing payment info)
          },
          prefill: {
            name: user.firstName,
            email: user.email,
          },
        };

        const razorpay = new (window as any).Razorpay(razorpayOptions);
        razorpay.open();
      }
    } catch (error) {
      console.error("Error in payment:", error);
      alert("There was an issue processing your payment.");
    }
  };

  return (
    <Button colorScheme="teal" width="full" onClick={handlePayment}>
      Buy Now
    </Button>
  );
}
