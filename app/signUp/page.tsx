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
import { signUp } from "./email-password";

type APIError = {
  status: number;
  name: string;
  message: string;
  requestID: string;
  code: string;
  errors: { code: string; message: string }[];
};

type SignUpState = {
  error?: APIError | null;
  user?: any;
};

export default function SignUpWithEmailPassword() {
  const [signUpState, setSignUpState] = useState<SignUpState>({ error: null });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signUp(null, formData);
    if ("error" in result) {
      setSignUpState({ error: result.error });
    } else {
      setSignUpState({ user: result, error: null });
      router.push(`/verify-email?redirect=${redirectUrl}`);
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
          Sign-up
        </Heading>
        <Heading as="h2" size="md" mb={8}>
          Email + Password
        </Heading>

        <form onSubmit={handleSignUp}>
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
                autoComplete="new-password"
              />
            </FormControl>

            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input type="text" name="firstName" autoComplete="given-name" />
            </FormControl>

            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input type="text" name="lastName" autoComplete="family-name" />
            </FormControl>

            <Button
              type="submit"
              background={"bgPrimary"}
              variant="outline"
              width="full"
            >
              Sign-up
            </Button>
          </VStack>
        </form>

        {signUpState.error && (
          <Text color="red.500" mt="4">
            {getErrorMessage(signUpState.error)}
          </Text>
        )}

        <Text mt="4">
          Already have an account?{" "}
          <Link href={`/signIn?redirect=${redirectUrl}`} color="blue.500">
            Sign In
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
