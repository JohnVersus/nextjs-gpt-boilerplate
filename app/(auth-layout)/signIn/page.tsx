import { Box, Heading, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Suspense } from "react";
import SignInForm from "../signin/SignInForm";
import { checkUserSession } from "../../utils/checkUserSession";
import NextLink from "next/link";
import Loading from "../../loading";

interface SignInPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SignInWithEmailPassword({
  searchParams,
}: SignInPageProps) {
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
          Sign-in
        </Heading>

        {/* Use Suspense to show a fallback while the client component loads */}
        <Suspense fallback={<Loading />}>
          <SignInForm redirectUrl={redirectUrl} />
        </Suspense>

        <Text mt="4">
          Don’t have an account?{" "}
          <ChakraLink
            as={NextLink}
            href={`/signup?redirect=${redirectUrl}`}
            color="blue.500"
          >
            Sign up
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}
