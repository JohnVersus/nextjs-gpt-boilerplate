"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpAction } from "./signUpAction";
import { InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
        router.push(
          `/verify-email?redirect=${encodeURIComponent(
            redirectUrl
          )}&email=${encodeURIComponent(
            result.email
          )}&token=${encodeURIComponent(result.pendingAuthenticationToken)}`
        );
      } else if (result.success) {
        router.push(redirectUrl);
      } else if (result.error) {
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="First Name"
          id="firstName"
          type="text"
          name="firstName"
          autoComplete="given-name"
          required
          autoFocus
        />
        <InputField
          label="Last Name"
          id="lastName"
          type="text"
          name="lastName"
          autoComplete="family-name"
          required
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          name="email"
          autoCapitalize="off"
          autoComplete="username"
          required
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          name="password"
          autoCapitalize="off"
          autoComplete="new-password"
          required
        />

        <Button
          type="submit"
          variant="outline"
          className="w-full bg-bgPrimary border border-primary text-primary font-semibold hover:bg-bgGray"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner className="mr-2" /> : "Sign-up"}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
}
