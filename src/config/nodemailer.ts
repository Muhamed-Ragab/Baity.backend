import nodemailer from "nodemailer";

import { env } from "@/constants/env";

export const transporter = nodemailer.createTransport({
  url: env.SMTP_URL,
  secure: true,
});
