import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-09-30.acacia",
  typescript: false,
});

const relevantEvents = new Set([
  "checkout.session.completed",
  // Add other relevant event types here
]);

export async function POST(req) {
  const body = await req.text();
  const headersList = headers();
  const sig = headersList.get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    if (!sig || !webhookSecret) {
      return new Response("Webhook Secret or Signature missing", {
        status: 400,
      });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;
          // Handle the checkout.session.completed event
          console.log("Checkout completed:", session.id);
          // Add your business logic here
          break;

        // Add cases for other event types as needed

        default:
          console.warn(`Unhandled relevant event: ${event.type}`);
      }
    } catch (error) {
      console.error("Webhook handler failed:", error.message);
      return new Response(`Webhook handler failed: ${error.message}`, {
        status: 400,
      });
    }
  }

  return NextResponse.json({ received: true });
}
