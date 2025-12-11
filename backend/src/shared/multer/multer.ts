import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "pet-adoption",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      resource_type: "image",
    };
  },
});

export const upload = multer({ storage });
