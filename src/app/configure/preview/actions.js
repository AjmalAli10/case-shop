"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { getImageById } from "@/db/configureDB";
import { createOrder, getExistingOrder } from "@/db/orderDB";
import { cashfreeGetOrder } from "@/lib/cashfree";
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
  const existingOrder = await getExistingOrder(user.id, configId);
  if (existingOrder) {
    order = existingOrder;
    // const cashfreeResponse = await cashfreeGetOrder(order.id);
    // console.log("cashfreeResponse", cashfreeResponse);
    // return {
    //   paymentSessionId: cashfreeResponse.payment_session_id,
    //   orderId: order.id,
    // };
  } else {
    order = await createOrder({
      amount: price,
      userId: user.id,
      configurationId: configId,
    });
    // const requestPayload = {
    //   order_amount: order.amount,
    //   order_currency: "INR",
    //   order_id: order.id,
    //   customer_details: {
    //     customer_id: user.id,
    //     customer_email: user.email,
    //     customer_phone: "9999999999",
    //     customer_name: user.given_name,
    //   },
    //   order_meta: {
    //     return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    //   },
    // };

    // const cashfreeResponse = await cashfreeCreateOrder(requestPayload);
    // return {
    //   paymentSessionId: cashfreeResponse.payment_session_id,
    //   orderId: order.id,
    // };
  }

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
