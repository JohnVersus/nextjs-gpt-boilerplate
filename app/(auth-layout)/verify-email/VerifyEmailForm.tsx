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
import { verifyEmailAction, sendCodeAction } from "./verifyEmailAction";

interface VerifyEmailFormProps {
  redirectUrl: string;
  email: string;
  pendingAuthenticationToken: string;
}

export default function VerifyEmailForm({
  redirectUrl,
  email,
  pendingAuthenticationToken,
}: VerifyEmailFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [codeSentMessage, setCodeSentMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleVerifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.append(
      "pendingAuthenticationToken",
      pendingAuthenticationToken || ""
    );
    try {
      await verifyEmailAction(formData);
      // Redirect after successful verification
      router.push(redirectUrl);
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

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    setCodeSentMessage(null);
    try {
      await sendCodeAction(email);
      setCodeSentMessage(
        "A new verification code has been sent to your email."
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while sending the code.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
            isLoading={isLoading}
            disabled={isLoading}
            spinner={<Spinner color="white" />}
          >
            Continue
          </Button>
        </VStack>
      </form>

      <Button
        mt={4}
        variant="link"
        color="blue.500"
        onClick={handleResendCode}
        isDisabled={isLoading}
      >
        Resend Code
      </Button>

      {codeSentMessage && (
        <Text color="green.500" mt="4">
          {codeSentMessage}
        </Text>
      )}

      {error && (
        <Text color="red.500" mt="4">
          {error}
        </Text>
      )}
    </>
  );
}
