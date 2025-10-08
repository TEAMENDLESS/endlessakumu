import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),

  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
  PRETTY_LOGS: z.coerce.boolean().default(true),

  DB_HOST: z.string().min(1, "DB_HOST is required"),
  DB_PORT: z.coerce.number().int().positive(),
  DB_USER: z.string().min(1, "DB_USER is required"),
  DB_PASSWORD: z.string().min(1, "DB_PASSWORD is required"),
  DB_NAME: z.string().min(1, "DB_NAME is required"),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = parsed.data;

export const IS_PROD = env.NODE_ENV === "production";
export const PORT = env.PORT;

export const LOG_LEVEL = env.LOG_LEVEL;
export const PRETTY_LOGS = env.PRETTY_LOGS;

export const DB = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  name: env.DB_NAME,
  user: env.DB_USER,
  pass: env.DB_PASSWORD,
} as const;

export default env;
