import { Suspense } from "react";
import VerifyEmailForm from "./VerifyEmailForm";
import { checkUserSession } from "../../utils/checkUserSession";
import { redirect } from "next/navigation";
import Loading from "../../loading";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyEmail({
  searchParams,
}: VerifyEmailPageProps) {
  const redirectUrl =
    typeof searchParams.redirect === "string" ? searchParams.redirect : "/";
  const email =
    typeof searchParams.email === "string" ? searchParams.email : "";
  const pendingAuthenticationToken =
    typeof searchParams.token === "string" ? searchParams.token : "";

  // Redirect to sign-in page if required parameters are missing
  if (!email || !pendingAuthenticationToken) {
    redirect(`/signin?redirect=${encodeURIComponent(redirectUrl)}`);
  }

  // Server-side session check
  await checkUserSession(redirectUrl);

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
        <h1 className="text-5xl font-extrabold mb-4">Verify email</h1>

        <p className="mb-6">
          You need to verify your email before proceeding to your account.
        </p>
        <p className="mb-6 font-bold">Email: {email}</p>

        {/* Use Suspense to handle loading state */}
        <Suspense fallback={<Loading />}>
          <VerifyEmailForm
            redirectUrl={redirectUrl}
            email={email}
            pendingAuthenticationToken={pendingAuthenticationToken}
          />
        </Suspense>
      </div>
    </div>
  );
}
