"use server";

import { updateConfiguration } from "@/db/configureDB";
import { OptionValidatorSchema } from "@/validators/option-validator";

export async function saveConfig({ color, finish, material, model, configId }) {
  const validationResult = OptionValidatorSchema.safeParse({
    color,
    finish,
    material,
    model,
  });
  if (!validationResult.success) {
    // Handle validation errors
    throw new Error(
      "Invalid configuration: " +
        validationResult.error.errors.map((e) => e.message).join(", ")
    );
  }

  const updateConfig = await updateConfiguration(configId, {
    color,
    finish,
    material,
    model,
  });
  console.log("updateConfig from actions", updateConfig);
  return updateConfig;
}
