import { Hono } from "hono";

import { auth } from "@/utils/auth";

export const authRoute = new Hono();

authRoute.on(["POST", "GET"], "/**", (c) => auth.handler(c.req.raw));
