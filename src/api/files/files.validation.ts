import { z } from "zod";

export const removeImageSchema = z.object({
  url: z.string().url(),
});
