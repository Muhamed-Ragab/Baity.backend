import { Hono } from "hono";

import { authRoute } from "./auth/auth.route";
import { filesRoute } from "./files/files.route";

export const apiRoute = new Hono()
  .route("/auth", authRoute)
  .route("/files", filesRoute);
