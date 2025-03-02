import { emailOTP, type EmailOTPOptions } from "better-auth/plugins";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import appAssert from "@/utils/app-assert";
import { sendEmail } from "@/utils/email-services";
import tryCatch from "@/utils/try-catch";

const sendVerificationOTP: EmailOTPOptions["sendVerificationOTP"] = async ({
  email,
  otp,
  type,
}) => {
  let sendFn;
  switch (type) {
    case "email-verification":
      sendFn = sendEmail("emailVerification", { to: email, code: otp });
      break;
    case "sign-in":
      sendFn = sendEmail("signIn", { to: email, code: otp });
      break;
    default:
      sendFn = sendEmail("passwordForgot", { to: email, code: otp });
      break;
  }

  const [error, data] = await tryCatch(sendFn);
  appAssert(
    !error,
    StatusCodes.INTERNAL_SERVER_ERROR,
    error?.message || "Failed to send email",
    ReasonPhrases.INTERNAL_SERVER_ERROR,
  );

  console.log(`Email verification OTP sent: ${data}`);
};

export const emailOTPPlugin = emailOTP({
  sendVerificationOTP,
});
