import { env } from "@/constants/env";
import { oneTap } from "better-auth/plugins";

export const oneTapPlugin = oneTap({
  clientId: env.GOOGLE_CLIENT_ID,
});
