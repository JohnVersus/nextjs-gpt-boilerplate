import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { getUser, signOut } from "@workos-inc/authkit-nextjs";
import { PaymentButton } from "./PaymentButton";
import { db } from "../config/db";
import { Payment, PaymentSelectModel } from "../models/payment";
import { eq, desc } from "drizzle-orm";
import { checkPaymentStatus, updatePaymentStatus } from "./razorpay";

export default async function PricingPage() {
  const pathname = "/pricing";
  const { user } = await getUser();
  const signInUrl = `/signIn?redirect=${pathname}`;
  const signUpUrl = `/signUp?redirect=${pathname}`;

  let userPayments: PaymentSelectModel[] = [];
  let hasBasicPlan = false;
  let hasProPlan = false;
  let errorMessage = null;

  // Initialize lastFailedPayments
  const lastFailedPayments: { [plan: string]: PaymentSelectModel | undefined } =
    {
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
      console.error("Error fetching user payments:", error);
      errorMessage = "Error fetching user payments. Please try again later.";
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
              "Error updating payment status. Please try again later.";
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

  // Date formatter using Intl
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Flex
        flex="1"
        bg="primary"
        color="text"
        py={10}
        px={10}
        textAlign="left"
        align="center"
        justify="flex-start"
        direction="column"
      >
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="2xl" mb={4}>
            Pricing
          </Heading>
          <Text
            fontSize="xl"
            mb={6}
            fontWeight="medium"
            textColor="muted"
            lineHeight="xl"
          >
            This is only a demo page. Do not process any payments.
          </Text>
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          align="stretch"
          justify="center"
          width="100%"
        >
          {/* Basic Plan Card */}
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            width="full"
            maxW="sm"
            flex="1"
            display="flex"
            flexDirection="column"
          >
            <Heading size="md" mb={4}>
              Basic Plan
            </Heading>
            <Text mb={4}>Access to basic features.</Text>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              ₹700
            </Text>
            <Box mt="auto">
              {user ? (
                hasBasicPlan ? (
                  <Button colorScheme="green" width="full" isDisabled>
                    Purchased
                  </Button>
                ) : hasProPlan ? (
                  <Button colorScheme="gray" width="full" isDisabled>
                    Already have Pro Plan
                  </Button>
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
                  <Button colorScheme="teal" width="full">
                    Authenticate to Buy
                  </Button>
                </Link>
              )}
            </Box>
          </Box>

          {/* Pro Plan Card */}
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            width="full"
            maxW="sm"
            flex="1"
            display="flex"
            flexDirection="column"
          >
            <Heading size="md" mb={4}>
              Pro Plan
            </Heading>
            <Text mb={4}>Access to all features.</Text>
            {hasBasicPlan ? (
              <>
                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                  Upgrade Price: ₹{upgradeAmount}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  (Original Price: ₹{proPlanPrice})
                </Text>
              </>
            ) : (
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                ₹{proPlanPrice}
              </Text>
            )}
            <Box mt="auto">
              {user ? (
                hasProPlan ? (
                  <Button colorScheme="green" width="full" isDisabled>
                    Purchased
                  </Button>
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
                  <Button colorScheme="teal" width="full">
                    Authenticate to Buy
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Stack>
        {errorMessage && (
          <Box mb={8}>
            <Text color="red.500" fontSize="lg">
              {errorMessage}
            </Text>
          </Box>
        )}
        {!errorMessage && userPayments.length > 0 && (
          <>
            {/* Transaction History Section */}
            <Box width="full" maxW="800px" mt={10}>
              <Heading size="lg" mb={4}>
                Transaction History
              </Heading>
              {userPayments.length > 0 ? (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Plan</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userPayments.map((payment) => (
                      <Tr key={payment.orderId}>
                        <Td>{payment.plan}</Td>
                        <Td>₹{payment.amount}</Td>
                        <Td textTransform="capitalize">{payment.status}</Td>
                        <Td>
                          {dateFormatter.format(new Date(payment.createdAt))}
                        </Td>
                        <Td>
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
                              orderId={payment.orderId} // Pass existing orderId for retry
                              isRetry={true}
                            />
                          ) : (
                            "-"
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Text>No transactions found.</Text>
              )}
            </Box>
          </>
        )}

        {user && (
          <Flex justify="flex-end" width="auto" mt={8}>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button variant="link" color="muted" type="submit">
                Log out
              </Button>
            </form>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
