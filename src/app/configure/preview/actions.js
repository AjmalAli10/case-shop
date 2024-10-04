"use server";

import { BASE_PRICE } from "@/config/products";
import { existingOrder } from "@/db/orderDB";

export const createCheckoutSession = async ({ configId }) => {
  const configuration = await getImageById(configId);

  if (!configuration) {
    throw new Error("No such configuration found");
  }
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("No user found");
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;

  if (material === "polycarbonate") {
    price += PRODUCT_PRICES.material.polycarbonate;
  }

  if (finish === "textured") {
    price += PRODUCT_PRICES.finish.textured;
  }

  let order;

  const existingOrder = await existingOrder(user.id, configId);
  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await createOrder({
      price,
      userId: user.id,
      configurationId: configId,
      status: "paid",
    });
  }
};
