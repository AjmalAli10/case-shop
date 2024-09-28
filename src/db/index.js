import { Pool } from "pg";
import { ImageSchema, ImageInputSchema } from "@/dbSchema/schemas";

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

export async function createImage(imageData) {
  const { imageurl, height, width } = ImageInputSchema.parse(imageData);

  const query = `
    INSERT INTO images (id, imageurl, height, width, croppedimageurl)
    VALUES (gen_random_uuid(), $1, $2, $3, $4)
    RETURNING *
  `;
  const values = [imageurl, height, width, null];

  try {
    const result = await pool.query(query, values);
    return ImageSchema.parse(result.rows[0]);
  } catch (error) {
    console.error("Error creating image:", error);
    throw new Error("Failed to create image");
  }
}

export async function updateCroppedImageUrl(imageId, croppedImageUrl) {
  const query = `
          UPDATE images
          SET croppedImageUrl = $1
          WHERE id = $2
          RETURNING *
        `;
  const values = [croppedImageUrl, imageId];

  try {
    const result = await pool.query(query, values);
    return ImageSchema.parse(result.rows[0]);
  } catch (error) {
    console.error("Error updating cropped image URL:", error);
    throw new Error("Failed to update cropped image URL");
  }
}

export async function getImageById(imageId) {
  const query = "SELECT * FROM images WHERE id = $1";
  const values = [imageId];

  try {
    const result = await pool.query(query, values);
    return ImageSchema.parse(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving image information:", error);
    throw new Error("Failed to retrieve image information");
  }
}

export async function getAllImages() {
  const query = "SELECT * FROM images ORDER BY created_at DESC";

  try {
    const result = await pool.query(query);
    return ImageSchema.array().parse(result.rows);
  } catch (error) {
    console.error("Error retrieving all images:", error);
    throw new Error("Failed to retrieve all images");
  }
}

export async function deleteImageById(imageId) {
  const query = "DELETE FROM images WHERE id = $1 RETURNING *";
  const values = [imageId];

  try {
    const result = await pool.query(query, values);
    return ImageSchema.parse(result.rows[0]);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
}
