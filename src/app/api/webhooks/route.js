import { updateOrder } from "@/db/orderDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    if (event.type === "checkout.session.completed") {
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

      await updateOrder(orderId, session, shippingAddress, billingAddress);

      return NextResponse.json({ result: event, ok: true });
    }
  } catch (error) {
    console.error(err);

    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
  //   try {
  //     const rawBody = await request.text();
  //     const ts = request.headers.get("x-webhook-timestamp");
  //     const signature = request.headers.get("x-webhook-signature");

  //     console.log("rawBody:", rawBody);
  //     console.log("ts:", ts);
  //     console.log("expected signature:", signature);

  //     const genSignature = verify(ts, rawBody);
  //     console.log("genSignature:", genSignature);
  //     if (signature === genSignature) {
  //       return new NextResponse("OK", { status: 200 });
  //     } else {
  //       return new NextResponse("Failed", { status: 400 });
  //     }
  //   } catch (error) {
  //     console.error("Error processing webhook:", error);
  //     return new NextResponse("Internal Server Error", { status: 500 });
  //   }
}
