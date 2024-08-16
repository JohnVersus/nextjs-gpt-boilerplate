"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "./verify-email";
import { checkUserSession } from "../utils/checkUserSession";

type APIError = {
  status: number;
  name: string;
  message: string;
  requestID: string;
  code: string;
  errors: { code: string; message: string }[];
};

type VerifyEmailState = {
  error?: APIError | null;
  user?: any;
};

export default function VerifyEmail() {
  const [verifyEmailState, setVerifyEmailState] = useState<VerifyEmailState>({
    error: null,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const email = searchParams.get("email");
  const pendingAuthenticationToken = searchParams.get("token");

  const handleVerifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append(
      "pendingAuthenticationToken",
      pendingAuthenticationToken || ""
    );

    const result = await verifyEmail(null, formData);
    if ("error" in result) {
      setVerifyEmailState({ error: result.error });
    } else {
      setVerifyEmailState({ user: result.user, error: null });
      router.push(redirectUrl); // Redirect to the specified URL or root on successful verification
    }
  };

  const getErrorMessage = (error: APIError) => {
    if (error.errors && error.errors.length > 0) {
      return error.errors.map((err) => err.message).join(", ");
    }
    return error.message || "Error in sending the verification code.";
  };

  return (
    <Flex
      bg="primary"
      color="text"
      py={20}
      px={10}
      textAlign="left"
      align="center"
      justify="center"
      height="80vh"
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

        <form onSubmit={handleVerifyEmail}>
          <VStack spacing="4">
            <FormControl id="code" isRequired>
              <FormLabel>Enter code from the email</FormLabel>
              <Input
                type="text"
                name="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="^\d{6}$"
                maxLength={6}
                minLength={6}
                autoFocus
              />
            </FormControl>

            <Input
              type="hidden"
              name="pendingAuthenticationToken"
              value={pendingAuthenticationToken || ""}
            />

            <Button
              type="submit"
              background={"bgPrimary"}
              variant="outline"
              width="full"
            >
              Continue
            </Button>
          </VStack>
        </form>

        {verifyEmailState.error && (
          <Text color="red.500" mt="4">
            {getErrorMessage(verifyEmailState.error)}
          </Text>
        )}
      </Box>
    </Flex>
  );
}
