"use client";

import { Button, useToast } from "@chakra-ui/react";
import { createRazorpayOrder, updatePaymentStatus } from "./razorpay";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PaymentButtonProps = {
  plan: string;
  amount: number;
  user: { id: string; firstName: string; email: string };
};

export function PaymentButton({ plan, amount, user }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter(); // Import and initialize the router

  const handlePayment = async () => {
    setIsLoading(true);
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
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "GPT Boilerplate",
          description: `Payment for ${plan}`,
          image: "/icon_black.svg",
          order_id: order.id,
          handler: function (response: any) {
            // Handle successful payment here
            updatePaymentStatus(
              order.id,
              "successful",
              response.razorpay_payment_id,
              JSON.stringify(response)
            );

            toast({
              title: "Payment Successful",
              description: "Your payment was successful!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });

            // Use router.refresh() instead of window.location.reload()
            router.refresh();
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

              toast({
                title: "Payment Cancelled",
                description: "You have cancelled the payment.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });

              setIsLoading(false);
            },
          },
        };

        const razorpay = new (window as any).Razorpay(razorpayOptions);
        razorpay.on("payment.failed", async function (response: any) {
          console.error("Payment failed:", response.error);

          await updatePaymentStatus(order.id, "failed");

          toast({
            title: "Payment Failed",
            description: "There was an issue processing your payment.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });

          setIsLoading(false);
        });

        razorpay.open();
      }
    } catch (error) {
      console.error("Error in payment:", error);
      toast({
        title: "Payment Error",
        description: "There was an issue initiating your payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      // Update the payment status to "failed" if the orderId is available
      if (orderId) {
        await updatePaymentStatus(orderId, "failed");
      }

      setIsLoading(false);
    }
  };

  return (
    <Button
      colorScheme="teal"
      width="full"
      onClick={handlePayment}
      isLoading={isLoading}
    >
      Buy Now
    </Button>
  );
}
