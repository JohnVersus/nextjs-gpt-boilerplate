import { Box, Heading, Flex, Text, Link } from "@chakra-ui/react";
import SignInForm from "./SignInForm";
import { Suspense } from "react";
import { checkUserSession } from "../../utils/checkUserSession";

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
      <Box maxW="md">
        <Heading as="h1" size="2xl" mb={4}>
          Sign-in
        </Heading>

        {/* Use Suspense to show a fallback while the client component loads */}
        <Suspense fallback={<div>Loading...</div>}>
          <SignInForm redirectUrl={redirectUrl} />
        </Suspense>

        <Text mt="4">
          Don’t have an account?{" "}
          <Link href={`/signup?redirect=${redirectUrl}`} color="blue.500">
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
