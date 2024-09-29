import { createImage, updateCroppedImageUrl } from "@/db";
import { Pool } from "pg";
import sharp from "sharp";
import { createUploadthing } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      try {
        const res = await fetch(file.url);
        const buffer = await res.arrayBuffer();

        const imageMetadata = await sharp(buffer).metadata();
        console.log("imageMetadata", imageMetadata);
        const { height, width } = imageMetadata;

        if (!configId) {
          const configuration = await createImage({
            imageUrl: file.url,
            height: height || 500,
            width: width || 500,
          });
          return { configId: configuration.id };
        } else {
          const updatedConfiguration = await updateCroppedImageUrl(
            configId,
            file.url
          );
          return { configId: updatedConfiguration.id };
        }
      } catch (error) {
        throw new Error("Failed to process uploaded image");
      }
    }),
};
