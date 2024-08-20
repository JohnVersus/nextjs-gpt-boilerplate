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
import { sendReset, resetPassword } from "./reset-password";

type APIError = {
  status: number;
  name: string;
  message: string;
  requestID: string;
  code: string;
  errors: { code: string; message: string }[];
};

type ResetPasswordState = {
  error?: APIError | null;
  success?: boolean;
};

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { token?: string; email?: string };
}) {
  const { token, email } = searchParams;
  const [sendResetState, setSendResetState] = useState<ResetPasswordState>({
    error: null,
  });
  const [resetPasswordState, setResetPasswordState] =
    useState<ResetPasswordState>({
      error: null,
    });
  const router = useRouter();

  const handleSendReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = (await sendReset(null, formData)) as { error?: any } | void;
    if (result && "error" in result) {
      setSendResetState({ error: result.error });
    } else {
      setSendResetState({ success: true, error: null });
    }
  };

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = (await resetPassword(null, formData)) as {
      error?: any;
    } | void;
    if (result && "error" in result) {
      setResetPasswordState({ error: result.error });
    } else {
      setResetPasswordState({ success: true, error: null });
      router.push("/signIn"); // Redirect to signIn page on successful password reset
    }
  };

  const getErrorMessage = (error: APIError) => {
    if (error.errors && error.errors.length > 0) {
      return error.errors.map((err) => err.message).join(", ");
    }
    return error.message;
  };

  if (!token) {
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
            Reset password
          </Heading>

          <form onSubmit={handleSendReset}>
            <VStack spacing="4">
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  autoCapitalize="off"
                  autoComplete="username"
                  autoFocus
                />
              </FormControl>

              <Button
                type="submit"
                background={"bgPrimary"}
                variant="outline"
                width="full"
              >
                Send reset instructions
              </Button>
            </VStack>
          </form>

          {sendResetState.error && (
            <Text color="red.500" mt="4">
              {getErrorMessage(sendResetState.error)}
            </Text>
          )}

          {sendResetState.success && (
            <Text color="green.500" mt="4">
              Reset instructions sent to your email.
            </Text>
          )}
        </Box>
      </Flex>
    );
  }

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
          Reset password
        </Heading>

        <form onSubmit={handleResetPassword}>
          <VStack spacing="4">
            <FormControl id="newPassword" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="newPassword"
                autoCapitalize="off"
                autoComplete="new-password"
                autoFocus
              />
            </FormControl>

            <Input type="hidden" name="token" value={token} />

            {email && (
              <Input
                type="hidden"
                name="email"
                value={email}
                autoComplete="username"
              />
            )}

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

        {resetPasswordState.error && (
          <Text color="red.500" mt="4">
            {getErrorMessage(resetPasswordState.error)}
          </Text>
        )}

        {resetPasswordState.success && (
          <Text color="green.500" mt="4">
            Password reset successfully. Redirecting to signIn page...
          </Text>
        )}
      </Box>
    </Flex>
  );
}
