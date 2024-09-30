// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950
// bg-zinc-950 border-zinc-950

import { PRODUCT_PRICES } from "@/config/products";
import { z } from "zod";

export const COLORS = [
  { label: "Black", value: "black", tw: "zinc-900" },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  { label: "Rose", value: "rose", tw: "rose-950" },
];
// Define Zod schema for validation
export const ColorSchema = z.object({
  color: z.enum(COLORS.map((c) => c.value)),
});
export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhone X",
      value: "iphonex",
    },
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone 12",
      value: "iphone12",
    },
    {
      label: "iPhone 13",
      value: "iphone13",
    },
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
  ],
};

// Define Zod schema for models
export const ModelSchema = z.object({
  model: z.enum(MODELS.options.map((m) => m.value)),
});

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
};

export const MaterialSchema = z.object({
  material: z.enum(MATERIALS.options.map((m) => m.value)),
});
export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
};

export const FinishSchema = z.object({
  finish: z.enum(FINISHES.options.map((f) => f.value)),
});

// Combine all schemas for full validation

export const OptionValidatorSchema = z.object({
  color: ColorSchema.shape.color,
  model: ModelSchema.shape.model,
  material: MaterialSchema.shape.material,
  finish: FinishSchema.shape.finish,
});
