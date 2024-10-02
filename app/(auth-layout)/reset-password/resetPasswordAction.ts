"use server";

import { WorkOS } from "@workos-inc/node";
import { env } from "../../../env";

const workos = new WorkOS(env.WORKOS_API_KEY);

export async function sendReset(formData: FormData) {
  try {
    const email = String(formData.get("email"));
    await workos.userManagement.sendPasswordResetEmail({
      email,
      passwordResetUrl: `http://localhost:3000/reset-password?email=${encodeURIComponent(
        email
      )}`,
    });
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.message || "An error occurred while sending reset instructions.",
    };
  }
}

export async function resetPassword(formData: FormData) {
  try {
    await workos.userManagement.resetPassword({
      newPassword: String(formData.get("newPassword")),
      token: String(formData.get("token")),
    });
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An error occurred while resetting the password.",
    };
  }
}
