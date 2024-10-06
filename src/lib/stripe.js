import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRAPE_SECRET_KEY ?? "", {
  apiVersion: "2024-04-10",
  typescript: false,
});
