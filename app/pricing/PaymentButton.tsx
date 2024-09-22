"use client";

import { Button, useToast } from "@chakra-ui/react";
import {
  createRazorpayOrder,
  updatePaymentStatus,
  checkPaymentStatus,
} from "./razorpay";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PaymentButtonProps = {
  plan: string;
  amount: number;
  user: { id: string; firstName: string; email: string };
  orderId?: string; // Add optional orderId for retries
  isRetry?: boolean; // Flag to indicate retry
};

export function PaymentButton({
  plan,
  amount,
  user,
  orderId: existingOrderId,
  isRetry = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    const receipt = `${plan}_${Date.now()}`;
    let orderId: string | undefined = existingOrderId;

    try {
      // Create a new order if not retrying
      if (!isRetry || !existingOrderId) {
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
        } else {
          throw new Error("Failed to create order");
        }
      }

      if (orderId) {
        // Trigger Razorpay payment
        const razorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100, // Amount in paise
          currency: "INR",
          name: "GPT SaaS Boilerplate",
          description: `Payment for ${plan}`,
          image: "/icon_black.svg",
          order_id: orderId,
          handler: async function (response: any) {
            try {
              // Payment was successful
              await updatePaymentStatus(
                orderId!,
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

              router.refresh();
            } catch (error) {
              console.error("Failed to update payment status:", error);

              toast({
                title: "Database Error",
                description:
                  "Your payment was successful, but we encountered an error updating your account. Please refresh the page.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
            }
          },
          prefill: {
            name: user.firstName,
            email: user.email,
          },
          modal: {
            async ondismiss() {
              // When the modal is dismissed, check the payment status
              console.log("Payment modal closed by the user");

              // Fetch the payment status from Razorpay
              const paymentStatus = await checkPaymentStatus(orderId!);

              if (paymentStatus === "paid") {
                try {
                  // Payment was successful
                  await updatePaymentStatus(orderId!, "successful");

                  toast({
                    title: "Payment Successful",
                    description: "Your payment was successful!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });

                  router.refresh();
                } catch (error) {
                  console.error("Failed to update payment status:", error);

                  toast({
                    title: "Database Error",
                    description:
                      "Your payment was successful, but we encountered an error updating your account. Please refresh the page.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });
                }
              } else if (paymentStatus === "failed") {
                // Payment failed
                await updatePaymentStatus(orderId!, "failed");

                toast({
                  title: "Payment Failed",
                  description: "Your payment was not successful.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "top-right",
                });

                setIsLoading(false);
                router.refresh();
              } else {
                // Payment was cancelled or pending
                await updatePaymentStatus(orderId!, "cancelled");

                toast({
                  title: "Payment Cancelled",
                  description: "You have cancelled the payment.",
                  status: "warning",
                  duration: 5000,
                  isClosable: true,
                  position: "top-right",
                });

                setIsLoading(false);
              }
            },
          },
        };

        const razorpay = new (window as any).Razorpay(razorpayOptions);

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
      colorScheme={isRetry ? "orange" : "teal"}
      width="full"
      onClick={handlePayment}
      isLoading={isLoading}
    >
      {isRetry ? "Retry Payment" : "Buy Now"}
    </Button>
  );
}
