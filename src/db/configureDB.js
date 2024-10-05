import prisma from "./prismaClient";

// Create a new image
export async function createImage(imageData) {
  const { imageUrl, height, width } = imageData;

  try {
    const newImage = await prisma.configuration.create({
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
    return await prisma.configuration.findMany(); // Changed to prisma.image
  } catch (error) {
    console.error("Error fetching images:", error.message);
    throw new Error("Failed to fetch images");
  }
}

// Read a single image by ID
export async function getImageById(imageId) {
  try {
    return await prisma.configuration.findUnique({
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
    return await prisma.configuration.update({
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

// Update an Configuration by ID
export async function updateConfiguration(imageId, updateData) {
  try {
    const updatedConfig = await prisma.configuration.update({
      where: { id: imageId },
      data: {
        // Spread the updateData object to allow dynamic updates
        ...updateData,
      },
    });
    console.log("updatedConfig from db call", updatedConfig);
    return updatedConfig;
  } catch (error) {
    console.error(`Error updating image with ID ${imageId}:`, error.message);
    throw new Error("Failed to update image");
  }
}
