import { env } from "@/constants/env";
import type { SendMailOptions } from "nodemailer";

import { transporter } from "@/config/nodemailer";
import { emailTemplates } from "./email-templates";

export const sendEmail = async <T extends keyof typeof emailTemplates>(
  templateName: T,
  templateParams: Parameters<(typeof emailTemplates)[T]>[0],
  options?: Omit<SendMailOptions, "from">,
) => {
  const template = emailTemplates[templateName](templateParams as any);
  const info = await transporter.sendMail({
    from: env.SMTP_FROM,
    ...template,
    ...options,
  });

  return info;
};
