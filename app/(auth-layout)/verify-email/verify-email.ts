"use server";

// These are Next.js server actions.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle each request
// - adapt the code below in each of those endpoints
//
// Please also note that for the sake of simplicity, we return all errors here.
// In a real application, you should pay attention to which errors make it
// to the client for security reasons.

import { WorkOS } from "@workos-inc/node";
import { cookies, headers } from "next/headers";
import { env } from "../../../env";

const workos = new WorkOS(env.WORKOS_API_KEY);
function IP() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}
export async function sendCode(prevState: any, formData: FormData) {
  try {
    const users = await workos.userManagement.listUsers({
      email: String(formData.get("email")),
    });
    const user = users.data[0];
    return await workos.userManagement.sendVerificationEmail({
      userId: user.id,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function verifyEmail(prevState: any, formData: FormData) {
  try {
    const response =
      await workos.userManagement.authenticateWithEmailVerification({
        clientId: env.WORKOS_CLIENT_ID as string,
        code: String(formData.get("code")),
        session: {
          sealSession: true,
          cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
        },
        pendingAuthenticationToken: String(
          formData.get("pendingAuthenticationToken")
        ),
        ipAddress: IP(),
        userAgent: headers().get("User-Agent") || "",
      });
    const { user, sealedSession } = response;

    if (sealedSession) {
      // Store the session in a cookie using Next.js cookies API
      cookies().set("wos-session", sealedSession, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    }

    return { user };
  } catch (error) {
    cookies().delete("wos-session");
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
