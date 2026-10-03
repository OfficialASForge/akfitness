import Razorpay from "razorpay";

/* global process */

export const MEMBERSHIP_PLANS = Object.freeze ({


  basic: {
    name: "Basic",
    amount: 9900,
    displayAmount: 99,
  },

  premium: {
    name: "Premium",
    amount: 14900,
    displayAmount: 149,
  },

  elite: {
    name: "Elite",
    amount: 19900,
    displayAmount: 199,
  },
});

export function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay environment variables are missing."
    );
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}