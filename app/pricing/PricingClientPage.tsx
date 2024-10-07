"use client";

import Link from "next/link";
import { PaymentButton } from "./PaymentButton";
import { PaymentSelectModel } from "../models/payment";
import { dateFormatter } from "@/lib/utils";

interface PricingClientPageProps {
  pathname: string;
  pricingData: any;
}

export default function PricingClientPage({
  pathname,
  pricingData,
}: PricingClientPageProps) {
  const {
    user,
    signInUrl,
    signUpUrl,
    userPayments,
    hasBasicPlan,
    hasProPlan,
    errorMessage,
    lastFailedPayments,
  } = pricingData;

  // Calculate upgrade amount
  const basicPlanPrice = 700;
  const proPlanPrice = 1500;
  const upgradeAmount = proPlanPrice - basicPlanPrice;

  // Helper function to determine if the user has a specific plan
  const hasPlan = (plan: string): boolean => {
    if (plan === "Basic Plan") return hasBasicPlan;
    if (plan === "Pro Plan") return hasProPlan;
    return false;
  };

  return (
    <>
      <div className="text-center mb-8 w-full">
        <h1 className="text-5xl font-extrabold mb-4">Pricing</h1>
        <p className="text-xl mb-6 font-medium text-muted leading-tight">
          This is only a demo page. Do not process any payments.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full">
        {/* Basic Plan Card */}
        <div className="p-5 shadow-md border border-gray-200 rounded-md w-full max-w-sm flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Basic Plan</h2>
          <p className="mb-4">Access to basic features.</p>
          <p className="text-3xl font-bold mb-4">₹700</p>
          <div className="mt-auto">
            {user ? (
              hasBasicPlan ? (
                <button
                  className="bg-green-900 text-white font-semibold py-2 px-4 w-full rounded"
                  disabled
                >
                  Purchased
                </button>
              ) : hasProPlan ? (
                <button
                  className="bg-gray-500 text-white font-semibold py-2 px-4 w-full rounded"
                  disabled
                >
                  Already have Pro Plan
                </button>
              ) : (
                <PaymentButton
                  plan="Basic Plan"
                  amount={700}
                  user={{
                    id: user.id as string,
                    firstName: user.firstName as string,
                    email: user.email as string,
                  }}
                />
              )
            ) : (
              <Link href={signUpUrl}>
                <button className="bg-teal-800 text-white font-semibold py-2 px-4 w-full rounded">
                  Authenticate to Buy
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Pro Plan Card */}
        <div className="p-5 shadow-md border border-gray-200 rounded-md w-full max-w-sm flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
          <p className="mb-4">Access to all features.</p>
          {hasBasicPlan ? (
            <>
              <p className="text-3xl font-bold mb-2">
                Upgrade Price: ₹{upgradeAmount}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                (Original Price: ₹{proPlanPrice})
              </p>
            </>
          ) : (
            <p className="text-3xl font-bold mb-4">₹{proPlanPrice}</p>
          )}
          <div className="mt-auto">
            {user ? (
              hasProPlan ? (
                <button
                  className="bg-green-900 text-white font-semibold py-2 px-4 w-full rounded"
                  disabled
                >
                  Purchased
                </button>
              ) : (
                <PaymentButton
                  plan="Pro Plan"
                  amount={hasBasicPlan ? upgradeAmount : proPlanPrice}
                  user={{
                    id: user.id as string,
                    firstName: user.firstName as string,
                    email: user.email as string,
                  }}
                />
              )
            ) : (
              <Link href={signUpUrl}>
                <button className="bg-teal-800 text-white font-semibold py-2 px-4 w-full rounded">
                  Authenticate to Buy
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-8">
          <p className="text-red-500 text-lg">{errorMessage}</p>
        </div>
      )}

      {!errorMessage && userPayments.length > 0 && (
        <div className="flex flex-col w-full max-w-4xl mt-10 mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-left">
            Transaction History
          </h2>
          {userPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Plan</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userPayments.map((payment: PaymentSelectModel) => (
                    <tr key={payment.orderId} className="text-center">
                      <td className="border px-4 py-2">{payment.plan}</td>
                      <td className="border px-4 py-2">₹{payment.amount}</td>
                      <td className="border px-4 py-2 capitalize">
                        {payment.status}
                      </td>
                      <td className="border px-4 py-2">
                        {dateFormatter.format(new Date(payment.createdAt))}
                      </td>
                      <td className="border px-4 py-2">
                        {["failed", "cancelled"].includes(payment.status) &&
                        !hasPlan(payment.plan) &&
                        payment.orderId ===
                          lastFailedPayments[payment.plan]?.orderId ? (
                          <PaymentButton
                            plan={payment.plan}
                            amount={payment.amount}
                            user={{
                              id: user?.id as string,
                              firstName: user?.firstName as string,
                              email: user?.email as string,
                            }}
                            orderId={payment.orderId}
                            isRetry={true}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      )}
    </>
  );
}
