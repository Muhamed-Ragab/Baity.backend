import { createFactory } from "hono/factory";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { uploadImageService } from "./files.service";

import { cloudinary } from "@/config/cloudinary";
import appAssert from "@/utils/app-assert";
import { extractPublicId } from "@/utils/cloudnary";
import { zValidator } from "@hono/zod-validator";
import type { Handler } from "hono";
import { removeImageSchema } from "./files.validation";

export const uploadImageHandler: Handler = async (c) => {
  const body = await c.req.parseBody();
  const file = body["file"];
  appAssert(
    file instanceof File,
    StatusCodes.BAD_REQUEST,
    "Image is required",
    ReasonPhrases.BAD_REQUEST,
  );

  const uploadedResponse = await uploadImageService(file);

  c.json(
    {
      message: "Image uploaded successfully",
      data: {
        url: uploadedResponse.secure_url,
        publicId: uploadedResponse.public_id,
        width: uploadedResponse.width,
        height: uploadedResponse.height,
        created_at: uploadedResponse.created_at,
      },
    },
    StatusCodes.CREATED,
  );
};

const removeImageFactory = createFactory();

export const removeImageHandlers = removeImageFactory.createHandlers(
  zValidator("json", removeImageSchema),
  async (c) => {
    const { url } = c.req.valid("json");
    const user = c.get("user");
    appAssert(
      user.image === url,
      StatusCodes.NOT_FOUND,
      "Image not found",
      ReasonPhrases.NOT_FOUND,
    );

    const publicId = extractPublicId(url);
    appAssert(
      publicId,
      StatusCodes.BAD_REQUEST,
      "Public ID is required",
      ReasonPhrases.BAD_REQUEST,
    );

    await cloudinary.uploader.destroy(publicId);

    c.json({ message: "Image removed successfully" }, StatusCodes.OK);
  },
);
