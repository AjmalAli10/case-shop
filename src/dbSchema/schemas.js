import { z } from "zod";

export const ImageSchema = z
  .object({
    id: z.string().uuid(),
    imageurl: z.string().url(),
    height: z.number().int().positive(),
    width: z.number().int().positive(),
    croppedimageurl: z.string().url().nullable(),
    createdat: z.date(),
  })
  .transform((data) => ({
    id: data.id,
    imageUrl: data.imageurl,
    height: data.height,
    width: data.width,
    croppedImageUrl: data.croppedimageurl,
    createdAt: data.createdat,
  }));

export const ImageInputSchema = z.object({
  imageurl: z.string().url(),
  height: z.number().int().positive(),
  width: z.number().int().positive(),
});
