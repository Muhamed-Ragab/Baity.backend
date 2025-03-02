import { Hono } from "hono";

import { removeImageHandlers, uploadImageHandler } from "./files.controller";

export const filesRoute = new Hono()
  .post("/image", uploadImageHandler)
  .delete("/image", ...removeImageHandlers);
