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
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "./email-password";
import { checkUserSession } from "../utils/checkUserSession";
import { signIn } from "../signIn/email-password";

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

  useEffect(() => {
    (async () => {
      await checkUserSession(redirectUrl);
    })();
  }, []);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const signUpResult = await signUp(null, formData);

    if ("error" in signUpResult) {
      setSignUpState({ error: signUpResult.error });
    } else {
      setSignUpState({ user: signUpResult, error: null });

      // After successful sign-up, attempt to sign in
      const signInResult = await signIn(null, formData);

      if ("error" in signInResult) {
        if (signInResult.error.rawData.code === "email_verification_required") {
          router.push(
            `/verify-email?redirect=${redirectUrl}&email=${formData.get(
              "email"
            )}&token=${signInResult.error.rawData.pending_authentication_token}`
          );
        } else {
          setSignUpState({ error: signInResult.error });
        }
      } else {
        router.push(redirectUrl); // Redirect to the specified URL or root on successful sign-in
      }
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

        <form onSubmit={handleSignUp}>
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
