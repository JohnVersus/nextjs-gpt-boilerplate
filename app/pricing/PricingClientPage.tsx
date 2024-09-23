"use client";

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
import { PaymentButton } from "./PaymentButton";
import { PaymentSelectModel } from "../models/payment";

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

  // Date formatter using Intl (safe to use in client component)
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <>
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
                  {userPayments.map((payment: PaymentSelectModel) => (
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
    </>
  );
}
