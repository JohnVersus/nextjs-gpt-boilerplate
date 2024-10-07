"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendReset, resetPassword } from "./resetPasswordAction";
import { InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ResetPasswordState {
  error?: string | null;
  success?: boolean;
}

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [sendResetState, setSendResetState] = useState<ResetPasswordState>({
    error: null,
  });
  const [resetPasswordState, setResetPasswordState] =
    useState<ResetPasswordState>({
      error: null,
    });
  const [isLoadingSendReset, setIsLoadingSendReset] = useState(false);
  const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);
  const router = useRouter();

  const handleSendReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoadingSendReset(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await sendReset(formData);
      if (result.success) {
        setSendResetState({ success: true, error: null });
      } else {
        setSendResetState({ error: result.error });
      }
    } catch {
      setSendResetState({ error: "An unexpected error occurred." });
    } finally {
      setIsLoadingSendReset(false);
    }
  };

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoadingResetPassword(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await resetPassword(formData);
      if (result.success) {
        setResetPasswordState({ success: true, error: null });
        router.push("/signin"); // Redirect to sign-in page on successful password reset
      } else {
        setResetPasswordState({ error: result.error });
      }
    } catch {
      setResetPasswordState({ error: "An unexpected error occurred." });
    } finally {
      setIsLoadingResetPassword(false);
    }
  };

  if (!token) {
    return (
      <div
        className="
          bg-primary text-text
          py-20 px-10
          text-left
          flex items-center justify-center
          h-[90vh]
          gap-8
          flex-col md:flex-row
        "
      >
        <div className="max-w-md">
          <h1 className="text-5xl font-extrabold mb-4">Reset Password</h1>

          <form onSubmit={handleSendReset} className="space-y-4">
            <div>
              <InputField
                type="email"
                name="email"
                id="email"
                required
                autoCapitalize="off"
                autoComplete="username"
                autoFocus
                label={"Email"}
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              className="w-full bg-bgPrimary border border-primary text-primary font-semibold hover:bg-bgGray"
              disabled={isLoadingSendReset}
            >
              {isLoadingSendReset && <LoadingSpinner className="mr-2" />}
              Send Reset Instructions
            </Button>
          </form>

          {sendResetState.error && (
            <p className="text-red-500 mt-4">{sendResetState.error}</p>
          )}

          {sendResetState.success && (
            <p className="text-green-500 mt-4">
              Reset instructions sent to your email.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        bg-primary text-text
        py-20 px-10
        text-left
        flex items-center justify-center
        h-[80vh]
        gap-8
        flex-col md:flex-row
      "
    >
      <div className="max-w-md">
        <h1 className="text-5xl font-extrabold mb-4">Reset Password</h1>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <InputField
              type="password"
              name="newPassword"
              id="newPassword"
              label="New Password"
              autoCapitalize="off"
              autoComplete="new-password"
              autoFocus
            />
          </div>

          <InputField type="hidden" name="token" value={token} label={""} />
          <InputField type="hidden" name="token" value={token} label={""} />

          <InputField type="hidden" name="token" value={token} label={""} />

          {email && (
            <InputField
              type="hidden"
              name="email"
              value={email}
              autoComplete="username"
              label={""}
            />
          )}

          <Button
            type="submit"
            variant="outline"
            className="w-full bg-bgPrimary border border-primary text-primary font-semibold hover:bg-bgGray"
            disabled={isLoadingResetPassword}
          >
            {isLoadingResetPassword && <LoadingSpinner className="mr-2" />}
            Continue
          </Button>
        </form>

        {resetPasswordState.error && (
          <p className="text-red-500 mt-4">{resetPasswordState.error}</p>
        )}

        {resetPasswordState.success && (
          <p className="text-green-500 mt-4">
            Password reset successfully. Redirecting to sign-in page...
          </p>
        )}
      </div>
    </div>
  );
}
