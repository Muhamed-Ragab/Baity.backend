import { cloudinary } from "@/config/cloudinary";

export const uploadImageService = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const uploadedResponse = await cloudinary.uploader.upload(dataUri, {
    resource_type: "auto",
    format: "jpg",
    folder: "frontline",
    transformation: {
      fetch_format: "auto",
      quality: "auto",
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    },
  });

  return uploadedResponse;
};
