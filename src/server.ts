import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";
import { trimTrailingSlash } from "hono/trailing-slash";

import { apiRoute } from "./api/api.route";
import { authorizeMiddleware } from "./api/auth/authorize.middleware";
import { env } from "./constants/env";
import { errorHandler } from "./middlewares/error-handler";

const app = new Hono();

// Parsing
app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 })); // 50MB
app.use(trimTrailingSlash());
app.use(prettyJSON());

// Powered by
app.use(poweredBy({ serverName: "Baity" }));

// Monitoring
app.use(timing());
app.use(logger());

// Security
app.use(
  cors({
    origin:
      env.NODE_ENV === "development"
        ? [env.APP_ORIGIN, "http://localhost:*"]
        : env.APP_ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Health check
app.get("/", async (c) => {
  return c.json({
    status: "healthy",
    apiVersion: "v1",
    environment: env.NODE_ENV,
    uptime: `${Math.floor(process.uptime())} sec`,
    memory: `${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
  });
});

// Auth Middleware
app.use(authorizeMiddleware);

// API routes
app.route("/api", apiRoute);

// Error Handling
app.onError(errorHandler);

// Dev
showRoutes(app);

export default app;
