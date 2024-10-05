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
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendReset, resetPassword } from "./resetPasswordAction";

interface ResetPasswordState {
  error?: string | null;
  success?: boolean;
}

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [sendResetState, setSendResetState] = useState<ResetPasswordState>({
    error: null,
  });
  const [resetPasswordState, setResetPasswordState] =
    useState<ResetPasswordState>({
      error: null,
    });
  const [isLoadingSendReset, setIsLoadingSendReset] = useState(false);
  const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);
  const router = useRouter();

  const handleSendReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoadingSendReset(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await sendReset(formData);
      if (result.success) {
        setSendResetState({ success: true, error: null });
      } else {
        setSendResetState({ error: result.error });
      }
    } catch {
      setSendResetState({ error: "An unexpected error occurred." });
    } finally {
      setIsLoadingSendReset(false);
    }
  };

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoadingResetPassword(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await resetPassword(formData);
      if (result.success) {
        setResetPasswordState({ success: true, error: null });
        router.push("/signin"); // Redirect to sign-in page on successful password reset
      } else {
        setResetPasswordState({ error: result.error });
      }
    } catch {
      setResetPasswordState({ error: "An unexpected error occurred." });
    } finally {
      setIsLoadingResetPassword(false);
    }
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
        height="90vh"
        gap={8}
        direction={{ base: "column", md: "row" }}
      >
        <Box maxW="md">
          <Heading as="h1" size="2xl" mb={4}>
            Reset Password
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
                isLoading={isLoadingSendReset}
                disabled={isLoadingSendReset}
                spinner={<Spinner color="white" />}
              >
                Send Reset Instructions
              </Button>
            </VStack>
          </form>

          {sendResetState.error && (
            <Text color="red.500" mt="4">
              {sendResetState.error}
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
          Reset Password
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
              isLoading={isLoadingResetPassword}
              disabled={isLoadingResetPassword}
              spinner={<Spinner color="white" />}
            >
              Continue
            </Button>
          </VStack>
        </form>

        {resetPasswordState.error && (
          <Text color="red.500" mt="4">
            {resetPasswordState.error}
          </Text>
        )}

        {resetPasswordState.success && (
          <Text color="green.500" mt="4">
            Password reset successfully. Redirecting to sign-in page...
          </Text>
        )}
      </Box>
    </Flex>
  );
}
