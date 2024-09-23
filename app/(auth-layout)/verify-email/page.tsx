import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import VerifyEmailForm from "./VerifyEmailForm";
import { checkUserSession } from "../../utils/checkUserSession";

import { redirect } from "next/navigation";
import Loading from "../../loading";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyEmail({
  searchParams,
}: VerifyEmailPageProps) {
  const redirectUrl =
    typeof searchParams.redirect === "string" ? searchParams.redirect : "/";
  const email =
    typeof searchParams.email === "string" ? searchParams.email : "";
  const pendingAuthenticationToken =
    typeof searchParams.token === "string" ? searchParams.token : "";

  // Redirect to sign-in page if required parameters are missing
  if (!email || !pendingAuthenticationToken) {
    redirect(`/signin?redirect=${encodeURIComponent(redirectUrl)}`);
  }

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
          Verify email
        </Heading>

        <Text mb={6}>
          You need to verify your email before proceeding to your account.
        </Text>
        <Text mb={6} fontWeight="bold">
          Email: {email}
        </Text>

        {/* Use Suspense to handle loading state */}
        <Suspense fallback={<Loading />}>
          <VerifyEmailForm
            redirectUrl={redirectUrl}
            email={email}
            pendingAuthenticationToken={pendingAuthenticationToken}
          />
        </Suspense>
      </Box>
    </Flex>
  );
}
