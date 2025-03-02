import { admin } from "better-auth/plugins";

export const adminPlugin = admin({ defaultRole: "user" });
