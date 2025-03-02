import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string(),
  APP_ORIGIN: z.string(),
  API_ORIGIN: z.string(),
  SMTP_URL: z.string(),
  SMTP_FROM: z.string(),
  CLOUDINARY_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

const { error, data } = EnvSchema.safeParse(process.env);

if (error) {
  const errors = error.issues.map((err) => `${err.path} ${err.message}`);

  console.error(`Config validation error: ${JSON.stringify(errors, null, 2)}`);
  process.exit(1);
}

export const env = data;
