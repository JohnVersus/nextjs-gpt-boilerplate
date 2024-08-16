"use server";

import { getUser } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export async function checkUserSession(redirectUrl: string = "/") {
  const { user } = await getUser();
  if (user) {
    // Redirect the user if a session already exists
    redirect(redirectUrl);
  }

  return null;
}
