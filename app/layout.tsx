import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { fonts } from "./fonts";

export const metadata: Metadata = {
  title: "GPT Boilerplate - Jumpstart your GPT project",
  description:
    "A boilerplate to quickly start your GPT-powered application with Next.js",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "GPT Boilerplate - Jumpstart your GPT project",
    description:
      "A boilerplate to quickly start your GPT-powered application with Next.js",
    images: [
      {
        url: "https://nextjs-gpt-boilerplate.vercel.app/image1.png",
        width: 800,
        height: 600,
        alt: "GPT Boilerplate Thumbnail",
      },
    ],
    url: "https://nextjs-gpt-boilerplate.vercel.app/",
    siteName: "GPT Boilerplate",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPT Boilerplate - Jumpstart your GPT project",
    description:
      "A boilerplate to quickly start your GPT-powered application with Next.js",
    images: ["https://nextjs-gpt-boilerplate.vercel.app/image1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
