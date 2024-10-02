"use server";

import { WorkOS } from "@workos-inc/node";
import { cookies, headers } from "next/headers";
import { env } from "../../../env";

const workos = new WorkOS(env.WORKOS_API_KEY);

function getIP() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}

export async function sendCodeAction(email: string) {
  try {
    const users = await workos.userManagement.listUsers({
      email: email,
    });
    const user = users.data[0];

    if (!user) {
      // Return error object instead of throwing
      return { success: false, error: "User not found." };
    }

    await workos.userManagement.sendVerificationEmail({
      userId: user.id,
    });
    return { success: true };
  } catch (error: any) {
    // Return error object instead of throwing
    return {
      success: false,
      error: error.message || "An error occurred while sending the code.",
    };
  }
}

export async function verifyEmailAction(formData: FormData) {
  try {
    const response =
      await workos.userManagement.authenticateWithEmailVerification({
        clientId: env.WORKOS_CLIENT_ID || "",
        code: String(formData.get("code")),
        session: {
          sealSession: true,
          cookiePassword: env.WORKOS_COOKIE_PASSWORD,
        },
        pendingAuthenticationToken: String(
          formData.get("pendingAuthenticationToken")
        ),
        ipAddress: getIP(),
        userAgent: headers().get("user-agent") || "",
      });

    const { sealedSession } = response;

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

    // Return success
    return { success: true };
  } catch (error: any) {
    // Delete the session cookie
    cookies().delete("wos-session");
    // Return error object instead of throwing
    return {
      success: false,
      error: error.message || "An error occurred during verification.",
    };
  }
}
