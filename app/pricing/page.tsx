import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Link,
  HStack,
  Stack,
} from "@chakra-ui/react";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";

export default async function PricingPage() {
  // Get the user session
  const { user } = await getUser();

  // Get the URL to redirect the user to AuthKit to sign in if not authenticated
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();

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
            Choose the plan that best fits your needs.
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
              $10/month
            </Text>
            {user ? (
              <Link href="/subscribe">
                <Button colorScheme="teal" width="full">
                  Subscribe Now
                </Button>
              </Link>
            ) : (
              <Link href={signInUrl}>
                <Button colorScheme="teal" width="full">
                  Authenticate to Subscribe
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
              $30/month
            </Text>
            {user ? (
              <Link href="/subscribe">
                <Button colorScheme="teal" width="full">
                  Subscribe Now
                </Button>
              </Link>
            ) : (
              <Link href={signInUrl}>
                <Button colorScheme="teal" width="full">
                  Authenticate to Subscribe
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
