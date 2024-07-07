/** @type {import('next').NextConfig} */
const { VERCEL_ENV, VERCEL_BRANCH_URL, VERCEL_PROJECT_PRODUCTION_URL } =
  process.env;
const isProduction = VERCEL_ENV === "production";

const localhostUrl = "http://localhost:3000/";

const serverUrl = isProduction
  ? `https://${VERCEL_PROJECT_PRODUCTION_URL}`
  : VERCEL_BRANCH_URL
  ? `https://${VERCEL_BRANCH_URL}`
  : localhostUrl;

const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_URL: serverUrl,
  },
};

export default nextConfig;
