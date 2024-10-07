"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  createRazorpayOrder,
  updatePaymentStatus,
  checkPaymentStatus,
} from "./razorpay";

type PaymentButtonProps = {
  plan: string;
  amount: number;
  user: { id: string; firstName: string; email: string };
  orderId?: string;
  isRetry?: boolean;
};

export function PaymentButton({
  plan,
  amount,
  user,
  orderId: existingOrderId,
  isRetry = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    const receipt = `${plan}_${Date.now()}`;
    let orderId: string | undefined = existingOrderId;

    try {
      // Create a new order if not retrying
      if (!isRetry || !existingOrderId) {
        const result = await createRazorpayOrder(
          user.id,
          plan,
          amount,
          "INR",
          receipt
        );

        if (result.success) {
          orderId = result.order?.id;
        } else {
          throw new Error(result.error);
        }
      }

      if (orderId) {
        // Prepare Razorpay options
        const razorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100, // Amount in paise
          currency: "INR",
          name: "NextJs GPT Boilerplate",
          description: `Payment for ${plan}`,
          image: "/icon_black.svg",
          order_id: orderId,
          handler: async function (response: any) {
            try {
              // Payment was successful
              const updateResult = await updatePaymentStatus(
                orderId!,
                "successful",
                response.razorpay_payment_id,
                JSON.stringify(response)
              );

              if (updateResult.success) {
                toast({
                  title: "Payment Successful",
                  description: "Your payment was successful!",
                  variant: "default",
                });

                router.refresh();
              } else {
                throw new Error(updateResult.error);
              }
            } catch (error: any) {
              console.error("Failed to update payment status:", error);

              toast({
                title: "Database Error",
                description:
                  "Your payment was successful, but we encountered an error updating your account. Please refresh the page.",
                variant: "destructive",
              });
            }
          },
          prefill: {
            email: user.email,
          },
          modal: {
            async ondismiss() {
              // When the modal is dismissed, check the payment status
              console.log("Payment modal closed by the user");

              // Fetch the payment status from Razorpay
              const statusResult = await checkPaymentStatus(orderId!);

              if (statusResult.success) {
                const { status: paymentStatus } = statusResult;

                if (paymentStatus === "paid") {
                  try {
                    // Payment was successful
                    const updateResult = await updatePaymentStatus(
                      orderId!,
                      "successful"
                    );

                    if (updateResult.success) {
                      toast({
                        title: "Payment Successful",
                        description: "Your payment was successful!",
                        variant: "default",
                      });

                      router.refresh();
                    } else {
                      throw new Error(updateResult.error);
                    }
                  } catch (error: any) {
                    console.error("Failed to update payment status:", error);

                    toast({
                      title: "Database Error",
                      description:
                        "Your payment was successful, but we encountered an error updating your account. Please refresh the page.",
                      variant: "destructive",
                    });
                  }
                } else if (paymentStatus === "failed") {
                  // Payment failed
                  await updatePaymentStatus(orderId!, "failed");

                  toast({
                    title: "Payment Failed",
                    description: "Your payment was not successful.",
                    variant: "destructive",
                  });

                  setIsLoading(false);
                  router.refresh();
                } else {
                  // Payment was cancelled or pending
                  await updatePaymentStatus(orderId!, "cancelled");

                  toast({
                    title: "Payment Cancelled",
                    description: "You have cancelled the payment.",
                    variant: "destructive",
                  });

                  setIsLoading(false);
                  router.refresh();
                }
              } else {
                // Failed to fetch payment status
                toast({
                  title: "Error",
                  description: statusResult.error,
                  variant: "destructive",
                });
                setIsLoading(false);
              }
            },
          },
        };

        const razorpay = new (window as any).Razorpay(razorpayOptions);

        razorpay.open();
      }
    } catch (error: any) {
      console.error("Error in payment:", error);
      toast({
        title: "Payment Error",
        description:
          error.message || "There was an issue initiating your payment.",
        variant: "destructive",
      });

      // Update the payment status to "failed" if the orderId is available
      if (orderId) {
        await updatePaymentStatus(orderId, "failed");
      }

      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${
        isRetry ? "bg-orange-800" : "bg-teal-500"
      } text-white font-semibold py-2 px-4 w-full rounded ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isRetry ? "Retry Payment" : "Buy Now"}
    </button>
  );
}
