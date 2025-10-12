import prisma from "./prismaClient";

// Create a new image with retry logic
export async function createImage(imageData, retries = 3) {
  const { imageUrl, height, width } = imageData;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const newImage = await prisma.configuration.create({
        data: {
          imageUrl,
          height,
          width,
          croppedImageUrl: null,
        },
      });
      return newImage;
    } catch (error) {
      console.error(
        `Error creating image (attempt ${attempt}/${retries}):`,
        error.message
      );

      if (attempt === retries) {
        throw new Error(
          `Failed to create image after ${retries} attempts: ${error.message}`
        );
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
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
