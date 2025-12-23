import Stripe from "stripe";

// Initialize Stripe client
export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }

  return new Stripe(secretKey, {
    apiVersion: "2024-12-18.acacia",
    typescript: true,
  });
}

// Create a checkout session for subscription
export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  successUrl: string,
  cancelUrl: string
): Promise<string | null> {
  const stripe = getStripeClient();
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!priceId) {
    throw new Error("Missing STRIPE_PRICE_ID environment variable");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          userId,
        },
      },
      metadata: {
        userId,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return null;
  }
}

// Get subscription status for a user
export async function getSubscriptionStatus(
  customerId: string
): Promise<"active" | "trialing" | "canceled" | "none"> {
  const stripe = getStripeClient();

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 1,
    });

    const subscription = subscriptions.data[0];

    if (!subscription) {
      return "none";
    }

    if (subscription.status === "active") {
      return "active";
    }

    if (subscription.status === "trialing") {
      return "trialing";
    }

    return "canceled";
  } catch (error) {
    console.error("Error getting subscription status:", error);
    return "none";
  }
}

// Verify Stripe webhook signature
export function verifyWebhookSignature(
  payload: string,
  signature: string
): Stripe.Event | null {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable");
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return null;
  }
}

