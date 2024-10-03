"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Spinner,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInAction } from "./signInAction";
import NextLink from "next/link";

interface SignInFormProps {
  redirectUrl: string;
}

export default function SignInForm({ redirectUrl }: SignInFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await signInAction(formData);

      if (result.emailVerificationRequired) {
        // Redirect to verify email page
        router.push(
          `/verify-email?redirect=${encodeURIComponent(
            redirectUrl
          )}&email=${encodeURIComponent(
            result.email
          )}&token=${encodeURIComponent(result.pendingAuthenticationToken)}`
        );
      } else if (result.success) {
        // Successful sign-in
        router.push(redirectUrl);
      } else if (result.error) {
        // Display the error message
        setError(result.error);
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4" align="stretch">
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
            isLoading={isLoading}
            disabled={isLoading}
            spinner={<Spinner color="white" />}
          >
            Sign-in
          </Button>
        </VStack>
      </form>

      {error && (
        <Text color="red.500" mt="4">
          {error}
        </Text>
      )}

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
      <Flex justify="flex-start">
        <ChakraLink
          as={NextLink}
          href={`/reset-password`}
          color="gray.600"
          fontSize="sm"
        >
          Forgot your password?
        </ChakraLink>
      </Flex>
    </>
  );
}
