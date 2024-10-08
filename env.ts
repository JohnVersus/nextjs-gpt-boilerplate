import { z } from "zod";

// Define your schema
const serverSchema = z.object({
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_HOST: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  WORKOS_CLIENT_ID: z.string().min(1),
  WORKOS_API_KEY: z.string().min(1),
  WORKOS_REDIRECT_URI: z.string().url(),
  WORKOS_COOKIE_PASSWORD: z.string().min(32),
  RAZORPAY_KEY_ID: z.string().min(1),
  RAZORPAY_KEY_SECRET: z.string().min(1),
});

const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

const runtimeEnvSchema = serverSchema.merge(clientSchema.partial());

// Validate environment variables
const serverEnv = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  NODE_ENV: process.env.NODE_ENV,
  WORKOS_CLIENT_ID: process.env.WORKOS_CLIENT_ID,
  WORKOS_API_KEY: process.env.WORKOS_API_KEY,
  WORKOS_REDIRECT_URI: process.env.WORKOS_REDIRECT_URI,
  SSO_ENABLED_ORGANIZATION_ID: process.env.SSO_ENABLED_ORGANIZATION_ID,
  WORKOS_COOKIE_PASSWORD: process.env.WORKOS_COOKIE_PASSWORD,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
};

const runtimeEnv = {
  ...serverEnv,
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};

const skipValidation = !!process.env.SKIP_ENV_VALIDATION;

if (!skipValidation) {
  serverSchema.parse(serverEnv);
  runtimeEnvSchema.parse(runtimeEnv);
}

// Construct the DATABASE_URL
const DATABASE_URL = `mysql://${serverEnv.DB_USER}:${serverEnv.DB_PASSWORD}@${serverEnv.DB_HOST}/${serverEnv.DB_NAME}`;

// Export validated environment variables
export const env = {
  DATABASE_URL,
  NODE_ENV: (serverEnv.NODE_ENV || "development") as
    | "development"
    | "test"
    | "production",
  WORKOS_CLIENT_ID: serverEnv.WORKOS_CLIENT_ID,
  WORKOS_API_KEY: serverEnv.WORKOS_API_KEY,
  WORKOS_REDIRECT_URI: serverEnv.WORKOS_REDIRECT_URI,
  SSO_ENABLED_ORGANIZATION_ID: serverEnv.SSO_ENABLED_ORGANIZATION_ID,
  WORKOS_COOKIE_PASSWORD: serverEnv.WORKOS_COOKIE_PASSWORD,
  RAZORPAY_KEY_ID: serverEnv.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: serverEnv.RAZORPAY_KEY_SECRET,
  // NEXT_PUBLIC_CLIENTVAR: runtimeEnv.NEXT_PUBLIC_CLIENTVAR,
};
