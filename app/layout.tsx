import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "./components";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NextJs GPT Boilerplate - Jumpstart your GPT project",
  description:
    "A boilerplate to quickly start your GPT-powered application with Next.js",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "NextJs GPT Boilerplate - Jumpstart your GPT project",
    description:
      "A boilerplate to quickly start your GPT-powered application with Next.js",
    images: [
      {
        url: "https://nextjs-gpt-boilerplate.vercel.app/image1.png",
        width: 800,
        height: 600,
        alt: "NextJs GPT Boilerplate Thumbnail",
      },
    ],
    url: "https://nextjs-gpt-boilerplate.vercel.app/",
    siteName: "NextJs GPT Boilerplate",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextJs GPT Boilerplate - Jumpstart your GPT project",
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
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
