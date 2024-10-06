"use server";
import { getOrdersByUserAndOrderId } from "@/db/orderDB";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async ({ orderId }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user.email) {
    throw new Error("You need to be logged in to view this page.");
  }

  const order = await getOrdersByUserAndOrderId(user.id, orderId);

  if (!order) throw new Error("This order does not exist.");
  console.log(order);
  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
