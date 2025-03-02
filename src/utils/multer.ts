import multer from "multer";

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.memoryStorage();
export const imageUploads = multer({ storage, fileFilter }).single("image");

export const config = {
  api: {
    bodyParser: false,
  },
};
