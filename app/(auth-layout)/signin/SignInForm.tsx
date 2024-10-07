"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInAction } from "./signInAction";
import Link from "next/link";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";

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
      <h1 className="text-5xl font-extrabold mb-4">Sign-in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputField
            type="email"
            name="email"
            id="email"
            label="Email"
            autoCapitalize="off"
            autoComplete="username"
            autoFocus
            required
          />
        </div>

        <div>
          <InputField
            type="password"
            name="password"
            id="password"
            label="Password"
            autoCapitalize="off"
            autoComplete="current-password"
            required
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          className="w-full bg-bgPrimary border border-primary text-primary font-semibold hover:bg-bgGray"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner className="mr-2" /> : "Sign-in"}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <p className="mt-4">
        Don’t have an account?{" "}
        <Link
          href={`/signup?redirect=${redirectUrl}`}
          className="text-blue-500"
        >
          Sign up
        </Link>
      </p>
      <div className="flex justify-start">
        <Link
          href={`/reset-password`}
          className="text-gray-600 text-sm hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </>
  );
}
