import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import appAssert from "./app-assert";

import { env } from "@/constants/env";
import { db } from "@/db/drizzle";
import * as plugins from "@/plugins";
import { sendEmail } from "./email-services";
import tryCatch from "./try-catch";

export const auth = betterAuth({
  appName: "Baity",
  database: drizzleAdapter(db, { provider: "pg", usePlural: true }),
  trustedOrigins: [env.APP_ORIGIN, "http://localhost:*"],
  user: { additionalFields: { phone: { type: "string", unique: true } } },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: { enabled: true, maxAge: 60 * 60 * 24 * 7 },
  },
  advanced: {
    cookies: { session_token: { name: "baity_session" } },
    crossSubDomainCookies: { enabled: true },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    async sendResetPassword({ token, user, url }) {
      const [error, data] = await tryCatch(
        sendEmail("passwordReset", { to: user.email, url, token }),
      );

      appAssert(
        !error,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error?.message || "Failed to send email",
        ReasonPhrases.INTERNAL_SERVER_ERROR,
      );

      console.log(`Email verification OTP sent: ${data}`);
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: Object.values(plugins),
});
