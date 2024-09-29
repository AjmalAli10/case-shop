const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new image
export async function createImage(imageData) {
  const { imageUrl, height, width } = imageData;

  try {
    const newImage = await await prisma.image.create({
      // Changed to prisma.image
      data: {
        imageUrl,
        height,
        width,
        croppedImageUrl: null, // or provide a value if needed
      },
    });
    return newImage;
  } catch (error) {
    console.error("Error creating image:", error.message);
    throw new Error("Failed to create image");
  }
}

// Read all image
export async function getAllImages() {
  try {
    return await prisma.image.findMany(); // Changed to prisma.image
  } catch (error) {
    console.error("Error fetching images:", error.message);
    throw new Error("Failed to fetch images");
  }
}

// Read a single image by ID
export async function getImageById(imageId) {
  try {
    return await prisma.image.findUnique({
      // Changed to prisma.image
      where: { id: imageId },
    });
  } catch (error) {
    console.error(`Error fetching image with ID ${imageId}:`, error.message);
    throw new Error("Failed to fetch image");
  }
}

// Update croppedimageurl by ID
export async function updateCroppedImageUrl(imageId, croppedImageUrl) {
  try {
    return await prisma.image.update({
      // Changed to prisma.image
      where: { id: imageId },
      data: {
        croppedImageUrl,
      },
    });
  } catch (error) {
    console.error(
      `Error updating cropped image URL for image with ID ${imageId}:`,
      error.message
    );
    throw new Error("Failed to update cropped image URL");
  }
}

// Update an image by ID
export async function updateImage(imageId, updateData) {
  const { imageUrl, height, width, croppedImageUrl } = updateData;

  try {
    return await prisma.image.update({
      // Changed to prisma.image
      where: { id: imageId },
      data: {
        imageUrl,
        height,
        width,
        croppedImageUrl,
      },
    });
  } catch (error) {
    console.error(`Error updating image with ID ${imageId}:`, error.message);
    throw new Error("Failed to update image");
  }
}

// import { Pool } from "pg";
// import { ImageSchema, ImageInputSchema } from "@/dbSchema/schemas";

// const pool = new Pool({
//   user: process.env.DATABASE_USERNAME,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
// });

// export async function createImage(imageData) {
//   const { imageurl, height, width } = ImageInputSchema.parse(imageData);

//   const query = `
//     INSERT INTO images (id, imageurl, height, width, croppedimageurl)
//     VALUES (gen_random_uuid(), $1, $2, $3, $4)
//     RETURNING *
//   `;
//   const values = [imageurl, height, width, null];

//   try {
//     const result = await pool.query(query, values);
//     return ImageSchema.parse(result.rows[0]);
//   } catch (error) {
//     console.error("Error creating image:", error);
//     throw new Error("Failed to create image");
//   }
// }

// export async function updateCroppedImageUrl(imageId, croppedImageUrl) {
//   const query = `
//           UPDATE images
//           SET croppedImageUrl = $1
//           WHERE id = $2
//           RETURNING *
//         `;
//   const values = [croppedImageUrl, imageId];

//   try {
//     const result = await pool.query(query, values);
//     return ImageSchema.parse(result.rows[0]);
//   } catch (error) {
//     console.error("Error updating cropped image URL:", error);
//     throw new Error("Failed to update cropped image URL");
//   }
// }

// export async function getImageById(imageId) {
//   const query = "SELECT * FROM images WHERE id = $1";
//   const values = [imageId];

//   try {
//     const result = await pool.query(query, values);
//     return ImageSchema.parse(result.rows[0]);
//   } catch (error) {
//     console.error("Error retrieving image information:", error);
//     throw new Error("Failed to retrieve image information");
//   }
// }

// export async function getAllImages() {
//   const query = "SELECT * FROM images ORDER BY created_at DESC";

//   try {
//     const result = await pool.query(query);
//     return ImageSchema.array().parse(result.rows);
//   } catch (error) {
//     console.error("Error retrieving all images:", error);
//     throw new Error("Failed to retrieve all images");
//   }
// }

// export async function deleteImageById(imageId) {
//   const query = "DELETE FROM images WHERE id = $1 RETURNING *";
//   const values = [imageId];

//   try {
//     const result = await pool.query(query, values);
//     return ImageSchema.parse(result.rows[0]);
//   } catch (error) {
//     console.error("Error deleting image:", error);
//     throw new Error("Failed to delete image");
//   }
// }
