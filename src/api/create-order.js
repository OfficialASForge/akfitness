import {
  getRazorpayClient,
  MEMBERSHIP_PLANS,
} from "../lib/razorpay.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { planId } = req.body || {};

    const plan = MEMBERSHIP_PLANS[planId];

    if (!plan) {
      return res.status(400).json({
        error: "Invalid membership plan.",
      });
    }

    const razorpay = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: "INR",
      receipt: `asforge_${planId}_${Date.now()}`,
      notes: {
        planId,
        planName: plan.name,
      },
    });

    return res.status(200).json({
      success: true,
      order,
      plan: {
        id: planId,
        name: plan.name,
        amount: plan.displayAmount,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      error: "Failed to create Razorpay order.",
    });
  }
}