"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { getImageById } from "@/db/configureDB";
import { createOrder, getExistingOrder } from "@/db/orderDB";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const createCheckoutSession = async ({ configId }) => {
  const configuration = await getImageById(configId);

  if (!configuration) {
    throw new Error("No such configuration found");
  }
  const { getUser } = getKindeServerSession();
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
  console.log("userID", user.id);
  const existingOrder = await getExistingOrder(user.id, configId);
  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await createOrder({
      amount: price / 100,
      userId: user.id,
      configurationId: configId,
    });
  }
  // const data = await stripe;
  // console.log("data", data);
  const product = await stripe?.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "INR",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["UA", "IN", "US"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: `${product.default_price}`, quantity: 1 }],
  });

  return { url: stripeSession.url };
};
