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
      await signUpAction(formData, redirectUrl);
      // If signUpAction doesn't redirect, you can manually redirect here
      // router.push(redirectUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
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
