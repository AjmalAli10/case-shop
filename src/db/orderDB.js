const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function createOrder(orderData) {
  const { amount, userId, configurationId, status } = orderData;
  try {
    const newOrder = await prisma.order.create({
      data: {
        amount,
        userId,
        configurationId,
        status,
      },
    });
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw new Error("Failed to create order");
  }
}

export async function existingOrder(userId, configurationId) {
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
