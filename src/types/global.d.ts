import type { Session, User } from "@/utils/auth.types";

declare module "hono" {
  interface ContextVariableMap {
    user: User;
    session: Session;
  }
}
