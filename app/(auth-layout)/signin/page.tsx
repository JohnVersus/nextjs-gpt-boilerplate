import { Suspense } from "react";
import SignInForm from "./SignInForm";
import { checkUserSession } from "../../utils/checkUserSession";
import Loading from "../../loading";

interface SignInPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SignInWithEmailPassword({
  searchParams,
}: SignInPageProps) {
  const redirectUrl =
    typeof searchParams.redirect === "string" ? searchParams.redirect : "/";

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
      <div className="max-w-md min-w-[25vw] relative">
        {/* Use Suspense to show a fallback while the client component loads */}
        <Suspense fallback={<Loading />}>
          <SignInForm redirectUrl={redirectUrl} />
        </Suspense>
      </div>
    </div>
  );
}
