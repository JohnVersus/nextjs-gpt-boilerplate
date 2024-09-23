"use server";

import { WorkOS } from "@workos-inc/node";
import { env } from "../../../env";
import { cookies } from "next/headers";

const workos = new WorkOS(env.WORKOS_API_KEY);

export async function signInAction(formData: FormData) {
  let authenticatedUser;
  let sealedSession;

  try {
    const user = await workos.userManagement.authenticateWithPassword({
      clientId: env.WORKOS_CLIENT_ID || "",
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      session: {
        sealSession: true,
        cookiePassword: env.WORKOS_COOKIE_PASSWORD,
      },
    });

    authenticatedUser = user.user;
    sealedSession = user.sealedSession;
  } catch (error: any) {
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
      // Throw an error to be caught in the client component
      throw new Error(error.message || "An error occurred during sign-in.");
    }
  }

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

  // Return success status
  return { success: true };
}
