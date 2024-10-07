import { getUser, signOut } from "@workos-inc/authkit-nextjs";
import { Suspense } from "react";
import { checkPaymentStatus, updatePaymentStatus } from "./razorpay";
import { db } from "../config/db";
import { Payment, PaymentSelectModel } from "../models/payment";
import { eq, desc } from "drizzle-orm";
import PricingClientPage from "./PricingClientPage";
import Loading from "../loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - NextJs GPT Boilerplate",
  description:
    "Explore our pricing plans and choose the one that best fits your needs.",
  openGraph: {
    title: "Pricing - NextJs GPT Boilerplate",
    description:
      "Explore our flexible pricing plans for the GPT-powered application.",
    images: [
      {
        url: "/favicon.png",
        width: 800,
        height: 600,
        alt: "Pricing Thumbnail",
      },
    ],
    url: "https://nextjs-gpt-boilerplate.vercel.app/pricing",
    siteName: "NextJs GPT Boilerplate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - NextJs GPT Boilerplate",
    description:
      "Explore our flexible pricing plans for the GPT-powered application.",
    images: ["https://nextjs-gpt-boilerplate.vercel.app/image1.png"],
  },
};

export default async function PricingPage() {
  const pathname = "/pricing";
  const { user } = await getUser();
  const signInUrl = `/signin?redirect=${pathname}`;
  const signUpUrl = `/signup?redirect=${pathname}`;

  let userPayments: PaymentSelectModel[] = [];
  let hasBasicPlan = false;
  let hasProPlan = false;
  let errorMessage = null;

  // Initialize lastFailedPayments
  const lastFailedPayments: {
    [plan: string]: PaymentSelectModel | undefined;
  } = {
    "Basic Plan": undefined,
    "Pro Plan": undefined,
  };

  if (user) {
    try {
      // Fetch user's payments
      userPayments = await db
        .select()
        .from(Payment)
        .where(eq(Payment.userId, user.id))
        .orderBy(desc(Payment.createdAt));
    } catch (error) {
      console.error("Error fetching past user payments:", error);
      errorMessage =
        "Error fetching past payments. Please refresh the page or try again later.";
    }

    if (!errorMessage) {
      // Determine if the user has purchased Basic or Pro plan
      hasBasicPlan = userPayments.some(
        (payment) =>
          payment.plan === "Basic Plan" && payment.status === "successful"
      );
      hasProPlan = userPayments.some(
        (payment) =>
          payment.plan === "Pro Plan" && payment.status === "successful"
      );

      const pendingStatuses = ["initiated", "pending"];
      const failedStatuses = ["failed", "cancelled"];

      // Update lastFailedPayments with actual values
      lastFailedPayments["Basic Plan"] = !hasBasicPlan
        ? userPayments.find(
            (payment) =>
              [...failedStatuses, ...pendingStatuses].includes(
                payment.status
              ) && payment.plan === "Basic Plan"
          )
        : undefined;

      lastFailedPayments["Pro Plan"] = !hasProPlan
        ? userPayments.find(
            (payment) =>
              [...failedStatuses, ...pendingStatuses].includes(
                payment.status
              ) && payment.plan === "Pro Plan"
          )
        : undefined;

      // Check and update payment status if necessary
      for (const plan in lastFailedPayments) {
        const payment = lastFailedPayments[plan];
        if (
          payment &&
          [...failedStatuses, ...pendingStatuses].includes(payment.status)
        ) {
          try {
            // Check the payment status from Razorpay
            const {
              status: paymentStatus,
              paymentId,
              paymentData,
            } = await checkPaymentStatus(payment.orderId);
            if (paymentStatus === "paid") {
              // Update the payment status in the database
              await updatePaymentStatus(
                payment.orderId,
                "successful",
                paymentId || "",
                JSON.stringify({
                  razorpay_payment_id: paymentData?.id,
                  razorpay_order_id: paymentData?.order_id,
                  razorpay_signature: "to be referred in razorpay dashboard",
                })
              );
              payment.status = "successful";
            } else if (paymentStatus === "failed") {
              await updatePaymentStatus(payment.orderId, "failed");
              payment.status = "failed";
            }
            // No need to handle "cancelled" or other statuses here
          } catch (error) {
            console.error("Error updating payment status:", error);
            errorMessage =
              "Error updating payment status. Please refresh the page or try again later.";
            break; // Exit the loop if there's an error
          }
        }
      }

      // Recalculate hasBasicPlan and hasProPlan after updating statuses
      hasBasicPlan = userPayments.some(
        (payment) =>
          payment.plan === "Basic Plan" && payment.status === "successful"
      );
      hasProPlan = userPayments.some(
        (payment) =>
          payment.plan === "Pro Plan" && payment.status === "successful"
      );
    }
  }

  // Prepare data to pass to client component
  const pricingData = {
    user,
    signInUrl,
    signUpUrl,
    userPayments,
    hasBasicPlan,
    hasProPlan,
    errorMessage,
    lastFailedPayments,
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 bg-primary text-text py-10 px-10 flex flex-col items-start justify-start">
          <PricingClientPage pathname={pathname} pricingData={pricingData} />
          {user && (
            <div className="flex justify-center w-full mt-8">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="text-muted hover:underline focus:outline-none"
                >
                  Log out
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
