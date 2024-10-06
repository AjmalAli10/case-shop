import prisma from "./prismaClient";

export async function createOrder(orderData) {
  const { amount, userId, configurationId } = orderData;

  try {
    const newOrder = await prisma.order.create({
      data: {
        amount,
        userId,
        configurationId,
      },
    });
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw new Error("Failed to create order");
  }
}

export async function updateOrder(
  orderId,
  session,
  shippingAddress,
  billingAddress
) {
  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      isPaid: true,
      shippingAddress: {
        create: {
          name: session.customer_details.name,
          city: shippingAddress.city,
          country: shippingAddress.country,
          postalCode: shippingAddress.postal_code,
          street: shippingAddress.line1 ?? shippingAddress.line2,
          state: shippingAddress.state,
        },
      },
      billingAddress: {
        create: {
          name: session.customer_details.name,
          city: billingAddress.city,
          country: billingAddress.country,
          postalCode: billingAddress.postal_code,
          street: billingAddress.line1 ?? billingAddress.line2,
          state: billingAddress.state,
        },
      },
    },
  });
}
export async function getExistingOrder(userId, configurationId) {
  try {
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: userId,
        configurationId: configurationId,
      },
    });

    return existingOrder;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error("Failed to fetch orders");
  }
}

export async function getOrdersByUserAndOrderId(userId, orderId) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
        id: orderId,
      },
      include: {
        billingAddress: true,
        configuration: true,
        shippingAddress: true,
        user: true,
      },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error("Failed to fetch orders");
  }
}
