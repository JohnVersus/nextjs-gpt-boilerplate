import { Suspense } from "react";
import SignUpForm from "./SignUpForm";
import { checkUserSession } from "../../utils/checkUserSession";
import Loading from "../../loading";
import { Metadata } from "next";
import Link from "next/link";

interface SignUpPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Sign Up - NextJs GPT Boilerplate",
  description: "Create your account and start using the GPT Boilerplate app.",
  openGraph: {
    title: "Sign Up - NextJs GPT Boilerplate",
    description:
      "Create your account and start using the GPT-powered application.",
    images: [
      {
        url: "/favicon.png",
        width: 800,
        height: 600,
        alt: "Sign Up Thumbnail",
      },
    ],
    url: "https://nextjs-gpt-boilerplate.vercel.app/signup",
    siteName: "NextJs GPT Boilerplate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up - NextJs GPT Boilerplate",
    description:
      "Create your account and start using the GPT-powered application.",
    images: ["https://nextjs-gpt-boilerplate.vercel.app/signup-image.png"],
  },
};

export default async function SignUpWithEmailPassword({
  searchParams,
}: SignUpPageProps) {
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
        <h1 className="text-5xl font-extrabold mb-4">Sign-up</h1>

        {/* Use Suspense to show a fallback while the client component loads */}
        <Suspense fallback={<Loading />}>
          <SignUpForm redirectUrl={redirectUrl} />
        </Suspense>

        <p className="mt-4">
          Already have an account?{" "}
          <Link
            href={`/signin?redirect=${redirectUrl}`}
            className="text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
