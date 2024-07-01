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
  // NEXT_PUBLIC_CLIENTVAR: runtimeEnv.NEXT_PUBLIC_CLIENTVAR,
};
