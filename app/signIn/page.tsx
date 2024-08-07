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
import { signIn } from "./email-password";

type APIError = {
  status: number;
  name: string;
  message: string;
  requestID: string;
  code: string;
  errors: { code: string; message: string }[];
};

type SignInState = {
  error?: APIError | null;
  user?: any;
};

export default function SignInWithEmailPassword() {
  const [signInState, setSignInState] = useState<SignInState>({ error: null });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signIn(null, formData);
    if ("error" in result) {
      setSignInState({ error: result.error });
    } else {
      setSignInState({ user: result.user, error: null });
      router.push(redirectUrl); // Redirect to the specified URL or root on successful signIn
    }
  };

  const getErrorMessage = (error: APIError) => {
    if (error.errors && error.errors.length > 0) {
      return error.errors.map((err) => err.message).join(", ");
    }
    return error.message;
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
          Sign-in
        </Heading>

        <form onSubmit={handleSignIn}>
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

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                autoCapitalize="off"
                autoComplete="current-password"
              />
            </FormControl>

            <Button
              type="submit"
              background={"bgPrimary"}
              variant="outline"
              width="full"
            >
              Sign-in
            </Button>
          </VStack>
        </form>

        {signInState.error && (
          <Text color="red.500" mt="4">
            {getErrorMessage(signInState.error)}
          </Text>
        )}

        <Text mt="4">
          Don’t have an account?{" "}
          <Link href={`/signUp?redirect=${redirectUrl}`} color="blue.500">
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
