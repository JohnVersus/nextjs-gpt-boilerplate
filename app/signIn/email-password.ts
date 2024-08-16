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
import { env } from "../../env";
import { cookies } from "next/headers";

const workos = new WorkOS(env.WORKOS_API_KEY);

export async function signIn(prevState: any, formData: FormData) {
  try {
    // For the sake of simplicity, we directly return the user here.
    // In a real application, you would probably store the user in a token (JWT)
    // and store that token in your DB or use cookies.
    const user = await workos.userManagement.authenticateWithPassword({
      clientId: process.env.WORKOS_CLIENT_ID || "",
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      session: {
        sealSession: true,
        cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
      },
    });

    const { user: authenticatedUser, sealedSession } = user;
    // Store the session in a cookie using Next.js cookies API
    cookies().set("wos-session", sealedSession, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return { user: authenticatedUser };
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
