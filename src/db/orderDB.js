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
