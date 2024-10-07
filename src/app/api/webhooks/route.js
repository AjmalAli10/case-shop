import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { updateOrder } from "@/db/orderDB";

let stripe;
try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-09-30.acacia",
  });
} catch (err) {
  console.error("Failed to initialize Stripe:", err.message);
}

const relevantEvents = new Set([
  "checkout.session.completed",
  // Add other relevant event types here
]);

export async function POST(req) {
  if (!stripe) {
    console.error("Stripe is not initialized");
    return new Response("Stripe configuration error", { status: 500 });
  }

  const body = await req.text();
  const headersList = headers();
  const sig = headersList.get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error("Webhook Secret or Signature missing");
    return new Response("Webhook Secret or Signature missing", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          if (!event.data.object.customer_details?.email) {
            throw new Error("Missing user email");
          }
          const session = event.data.object;

          const { userId, orderId } = session.metadata || {
            userId: null,
            orderId: null,
          };
          if (!userId || !orderId) {
            throw new Error("Invalid request metadata");
          }
          const billingAddress = session.customer_details.address;
          const shippingAddress = session.shipping_details.address;

          const updatedOrder = await updateOrder(
            orderId,
            session,
            shippingAddress,
            billingAddress
          );
          console.log("Checkout completed:", session.id);
          // Add your business logic here
          break;

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
