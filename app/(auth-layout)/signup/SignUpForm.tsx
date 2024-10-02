"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpAction } from "./signUpAction";

interface SignUpFormProps {
  redirectUrl: string;
}

export default function SignUpForm({ redirectUrl }: SignUpFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await signUpAction(formData, redirectUrl);

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
        // Successful sign-up
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
        <VStack spacing="4">
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="firstName" autoComplete="given-name" />
          </FormControl>

          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="lastName" autoComplete="family-name" />
          </FormControl>

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

          <Button
            type="submit"
            background={"bgPrimary"}
            variant="outline"
            width="full"
            isLoading={isLoading}
            disabled={isLoading}
            spinner={<Spinner color="white" />}
          >
            Sign-up
          </Button>
        </VStack>
      </form>

      {error && (
        <Text color="red.500" mt="4">
          {error}
        </Text>
      )}
    </>
  );
}
