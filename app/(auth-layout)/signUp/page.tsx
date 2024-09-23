import { Box, Heading, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import SignUpForm from "./SignUpForm";
import { Suspense } from "react";
import { checkUserSession } from "../../utils/checkUserSession";
import NextLink from "next/link";
import Loading from "../../loading";

interface SignUpPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SignUpWithEmailPassword({
  searchParams,
}: SignUpPageProps) {
  const redirectUrl =
    typeof searchParams.redirect === "string" ? searchParams.redirect : "/";

  // Server-side session check
  await checkUserSession(redirectUrl);

  return (
    <Flex
      bg="primary"
      color="text"
      py={20}
      px={10}
      textAlign="left"
      align="center"
      justify="center"
      height="90vh"
      gap={8}
      direction={{ base: "column", md: "row" }}
    >
      <Box maxW="md" minW="25vw" position="relative">
        <Heading as="h1" size="2xl" mb={4}>
          Sign-up
        </Heading>

        {/* Use Suspense to show a fallback while the client component loads */}
        <Suspense fallback={<Loading />}>
          <SignUpForm redirectUrl={redirectUrl} />
        </Suspense>

        <Text mt="4">
          Already have an account?{" "}
          <ChakraLink
            as={NextLink}
            href={`/signin?redirect=${redirectUrl}`}
            color="blue.500"
          >
            Sign in
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}
