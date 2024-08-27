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
import { PaymentButton } from "./PaymentButton"; // Import the PaymentButton component

export default async function PricingPage() {
  const pathname = "/pricing";
  const { user } = await getUser();
  const signInUrl = `/signIn?redirect=${pathname}`;
  const signUpUrl = `/signUp?redirect=${pathname}`;

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
          align="center"
          justify="center"
          width="100%"
        >
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            width="full"
            maxW="sm"
          >
            <Heading size="md" mb={4}>
              Basic Plan
            </Heading>
            <Text mb={4}>Access to basic features.</Text>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              ₹700
            </Text>
            {user ? (
              <PaymentButton
                plan="Basic Plan"
                amount={700}
                user={{
                  id: user.id as string,
                  firstName: user.firstName as string,
                  email: user.email as string,
                }}
              />
            ) : (
              <Link href={signUpUrl}>
                <Button colorScheme="teal" width="full">
                  Authenticate to Buy
                </Button>
              </Link>
            )}
          </Box>

          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            width="full"
            maxW="sm"
          >
            <Heading size="md" mb={4}>
              Pro Plan
            </Heading>
            <Text mb={4}>Access to all features.</Text>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              ₹1500
            </Text>
            {user ? (
              <PaymentButton
                plan="Pro Plan"
                amount={1500}
                user={{
                  id: user.id as string,
                  firstName: user.firstName as string,
                  email: user.email as string,
                }}
              />
            ) : (
              <Link href={signUpUrl}>
                <Button colorScheme="teal" width="full">
                  Authenticate to Buy
                </Button>
              </Link>
            )}
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
