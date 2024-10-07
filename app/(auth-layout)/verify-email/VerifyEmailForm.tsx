"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyEmailAction, sendCodeAction } from "./verifyEmailAction";
import { InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
      const result = await verifyEmailAction(formData);

      if (result.success) {
        // Redirect after successful verification
        router.push(redirectUrl);
      } else if (result.error) {
        // Display the error message
        setError(result.error);
      } else {
        setError("An unexpected error occurred.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    setCodeSentMessage(null);
    try {
      const result = await sendCodeAction(email);

      if (result.success) {
        setCodeSentMessage(
          "A new verification code has been sent to your email."
        );
      } else if (result.error) {
        // Display the error message
        setError(result.error);
      } else {
        setError("An unexpected error occurred while sending the code.");
      }
    } catch {
      setError("An unexpected error occurred while sending the code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleVerifyEmail} className="space-y-4">
        <div>
          <InputField
            type="text"
            name="code"
            id="code"
            label="Enter code from the email"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="^\d{6}$"
            maxLength={6}
            minLength={6}
            autoFocus
            required
          />
        </div>

        <InputField
          type="hidden"
          name="pendingAuthenticationToken"
          value={pendingAuthenticationToken || ""}
          label={""}
        />

        <Button
          type="submit"
          variant="outline"
          className="w-full bg-bgPrimary border border-primary text-primary font-semibold hover:bg-bgGray"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner className="mr-2" /> : "Continue"}
        </Button>
      </form>

      <Button
        variant="link"
        className="mt-4 text-blue-500"
        onClick={handleResendCode}
        disabled={isLoading}
      >
        Resend Code
      </Button>

      {codeSentMessage && (
        <p className="text-green-500 mt-4">{codeSentMessage}</p>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
}
