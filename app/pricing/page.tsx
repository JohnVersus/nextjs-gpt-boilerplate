import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  Link,
  Stack,
  Button,
} from "@chakra-ui/react";
import { getUser, signOut } from "@workos-inc/authkit-nextjs";
import { PaymentButton } from "./PaymentButton";
import { db } from "../config/db";
import { Payment } from "../models/payment";
import { eq, and } from "drizzle-orm";

export default async function PricingPage() {
  const pathname = "/pricing";
  const { user } = await getUser();
  const signInUrl = `/signIn?redirect=${pathname}`;
  const signUpUrl = `/signUp?redirect=${pathname}`;

  let userPayments = [];
  let hasBasicPlan = false;
  let hasProPlan = false;

  if (user) {
    // Fetch user's payments
    userPayments = await db
      .select()
      .from(Payment)
      .where(
        and(eq(Payment.userId, user.id), eq(Payment.status, "successful"))
      );

    // Determine if the user has purchased Basic or Pro plan
    hasBasicPlan = userPayments.some(
      (payment) => payment.plan === "Basic Plan"
    );
    hasProPlan = userPayments.some((payment) => payment.plan === "Pro Plan");
  }

  // Calculate upgrade amount
  const basicPlanPrice = 700;
  const proPlanPrice = 1500;
  const upgradeAmount = proPlanPrice - basicPlanPrice;

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
