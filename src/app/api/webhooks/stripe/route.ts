import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

// Initialize Stripe
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(secretKey, { apiVersion: "2024-12-18.acacia" });
}

// Verify webhook signature
function verifyWebhook(payload: string, signature: string): Stripe.Event | null {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return null;
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return null;
  }
}

// Calculate expiration based on plan type
function calculateExpiration(planType: string): string {
  const now = new Date();

  switch (planType) {
    case "day":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    case "week":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    default:
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    const event = verifyWebhook(payload, signature);

    if (!event) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const client = await clerkClient();

    switch (event.type) {
      // Handle one-time payment completion (day/week passes)
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const planType = session.metadata?.planType;

        if (!userId) {
          console.error("No userId in session metadata");
          break;
        }

        // One-time payment (day or week pass)
        if (session.mode === "payment") {
          const expiresAt = calculateExpiration(planType || "day");

          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              planType,
              accessExpiresAt: expiresAt,
              lastPurchase: new Date().toISOString(),
            },
          });

          console.log(`Day/Week pass activated for user ${userId}, expires ${expiresAt}`);
        }

        // Subscription payment (monthly)
        if (session.mode === "subscription") {
          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              subscriptionStatus: "active",
              planType: "month",
              stripeCustomerId: session.customer as string,
              subscriptionId: session.subscription as string,
            },
          });

          console.log(`Monthly subscription activated for user ${userId}`);
        }
        break;
      }

      // Handle subscription updates
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error("No userId in subscription metadata");
          break;
        }

        const status =
          subscription.status === "active"
            ? "active"
            : subscription.status === "trialing"
            ? "trialing"
            : "canceled";

        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            subscriptionStatus: status,
          },
        });

        console.log(`Subscription updated for user ${userId}: ${status}`);
        break;
      }

      // Handle subscription cancellation
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error("No userId in subscription metadata");
          break;
        }

        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            subscriptionStatus: "canceled",
          },
        });

        console.log(`Subscription canceled for user ${userId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing Stripe webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
