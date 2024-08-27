"use client";

import { Button } from "@chakra-ui/react";
import { createRazorpayOrder, updatePaymentStatus } from "./razorpay";

type PaymentButtonProps = {
  plan: string;
  amount: number;
  user: { id: string; firstName: string; email: string };
};

export function PaymentButton({ plan, amount, user }: PaymentButtonProps) {
  const handlePayment = async () => {
    const receipt = `${plan}_${Date.now()}`;
    let orderId: string | undefined;

    try {
      // Create an order using the server action
      const order = await createRazorpayOrder(
        user.id,
        plan,
        amount,
        "INR",
        receipt
      );

      // Assign orderId if the order is created successfully
      if (order && order.id) {
        orderId = order.id;

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
            // Handle successful payment here
            updatePaymentStatus(
              order.id,
              "successful",
              response.razorpay_payment_id,
              JSON.stringify(response)
            );
          },
          prefill: {
            name: user.firstName,
            email: user.email,
          },
          modal: {
            ondismiss: async function () {
              // Handle the case when the user closes the payment modal
              console.log("Payment modal closed by the user");
              await updatePaymentStatus(order.id, "cancelled");
            },
          },
        };

        const razorpay = new (window as any).Razorpay(razorpayOptions);
        razorpay.open();
      }
    } catch (error) {
      console.error("Error in payment:", error);
      alert("There was an issue processing your payment.");

      // Update the payment status to "failed" if the orderId is available
      if (orderId) {
        await updatePaymentStatus(orderId, "failed");
      }
    }
  };

  return (
    <Button colorScheme="teal" width="full" onClick={handlePayment}>
      Buy Now
    </Button>
  );
}
