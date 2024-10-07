import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRAPE_SECRET_KEY ?? "", {
  apiVersion: "2024-09-30.acacia",
  typescript: false,
});
