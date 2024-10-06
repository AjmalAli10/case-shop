import { Cashfree } from "cashfree-pg";
Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const cashfreeCreateOrder = async (requestPayload) => {
  try {
    const response = await Cashfree.PGCreateOrder("2023-08-01", requestPayload);
    console.log("response", response);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error setting up order request:", error.response.data);
  }
};

const cashfreeGetOrder = async (orderId) => {
  try {
    const response = await Cashfree.PGFetchOrder("2023-08-01", orderId);
    console.log("Order fetched successfully:", response.data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error:", error.response.data.message);
  }
};

export { cashfreeCreateOrder, cashfreeGetOrder };
