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
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendCode, verifyEmail } from "./verify-email";

type APIError = {
  status: number;
  name: string;
  message: string;
  requestID: string;
  code: string;
  errors: { code: string; message: string }[];
};

type SendCodeState = {
  error?: APIError | null;
  user?: any;
};

type VerifyEmailState = {
  error?: APIError | null;
  user?: any;
};

export default function VerifyEmail() {
  const [sendCodeState, setSendCodeState] = useState<SendCodeState>({
    error: null,
  });
  const [verifyEmailState, setVerifyEmailState] = useState<VerifyEmailState>({
    error: null,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleSendCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await sendCode(null, formData);
    if ("error" in result) {
      setSendCodeState({ error: result.error });
    } else {
      setSendCodeState({ user: result.user, error: null });
    }
  };

  const handleVerifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
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
    return error.message;
  };

  if (!sendCodeState.user) {
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

          <form onSubmit={handleSendCode}>
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
                Send code
              </Button>
            </VStack>
          </form>

          {sendCodeState.error && (
            <Text color="red.500" mt="4">
              {getErrorMessage(sendCodeState.error)}
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
          Verify email
        </Heading>

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
                autoFocus
              />
            </FormControl>

            <Input type="hidden" name="userId" value={sendCodeState.user.id} />

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
