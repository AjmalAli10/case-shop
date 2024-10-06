import { load } from "@cashfreepayments/cashfree-js";

let cashfree;

export const initializeSDK = async function () {
  if (!cashfree) {
    console.log("Initializing Cashfree SDK...");
    cashfree = await load({
      mode: "sandbox",
    });
  } else {
    console.log("Cashfree SDK already initialized.");
  }
  return cashfree;
};

export const doPayment = async ({ paymentSessionId }) => {
  let checkoutOptions = {
    paymentSessionId: paymentSessionId,
    redirectTarget: "_modal",
  };
  if (cashfree) {
    const result = cashfree.checkout(checkoutOptions);
    if (result.error) {
      // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
      console.log(
        "User has closed the popup or there is some payment error, Check for Payment Status"
      );
      console.log(result.error);
    }
    if (result.redirect) {
      // This will be true when the payment redirection page couldnt be opened in the same window
      // This is an exceptional case only when the page is opened inside an inAppBrowser
      // In this case the customer will be redirected to return url once payment is completed
      console.log("Payment will be redirected");
    }
    if (result.paymentDetails) {
      // This will be called whenever the payment is completed irrespective of transaction status
      console.log("Payment has been completed, Check for Payment Status");
      console.log(result.paymentDetails.paymentMessage);
    }
  }
};
