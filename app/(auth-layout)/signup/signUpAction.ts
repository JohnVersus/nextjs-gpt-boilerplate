"use server";

import { WorkOS } from "@workos-inc/node";
import { env } from "../../../env";
import { cookies } from "next/headers";

const workos = new WorkOS(env.WORKOS_API_KEY);

export async function signUpAction(formData: FormData, redirectUrl: string) {
  try {
    // Create the user
    await workos.userManagement.createUser({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      firstName: String(formData.get("firstName")),
      lastName: String(formData.get("lastName")),
    });
  } catch (error: any) {
    // Return error object instead of throwing
    return {
      success: false,
      error: error.message || "An error occurred during sign-up.",
    };
  }

  // After successful sign-up, attempt to sign in
  let authResponse;

  try {
    authResponse = await workos.userManagement.authenticateWithPassword({
      clientId: env.WORKOS_CLIENT_ID || "",
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      session: {
        sealSession: true,
        cookiePassword: env.WORKOS_COOKIE_PASSWORD,
      },
    });
  } catch (error: any) {
    // Handle specific errors like email verification required
    if (error.rawData && error.rawData.code === "email_verification_required") {
      const pendingAuthToken = error.rawData.pending_authentication_token;
      const email = String(formData.get("email"));
      // Return an object indicating that email verification is required
      return {
        emailVerificationRequired: true,
        email,
        pendingAuthenticationToken: pendingAuthToken,
      };
    } else {
      // Return error object instead of throwing
      return {
        success: false,
        error: error.message || "An error occurred during sign-in.",
      };
    }
  }

  const { sealedSession } = authResponse;
  if (sealedSession) {
    // Store the session in a cookie using Next.js cookies API
    cookies().set("wos-session", sealedSession, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  // Return success status and redirect URL
  return { success: true };
}
