import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

// Initialize Stripe
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(secretKey, { apiVersion: "2024-12-18.acacia" });
}

// Plan configuration
const PLANS = {
  day: {
    priceEnvVar: "STRIPE_PRICE_ID_DAY",
    mode: "payment" as const,
    duration: 24 * 60 * 60 * 1000, // 24 hours in ms
  },
  week: {
    priceEnvVar: "STRIPE_PRICE_ID_WEEK",
    mode: "payment" as const,
    duration: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  },
  month: {
    priceEnvVar: "STRIPE_PRICE_ID_MONTH",
    mode: "subscription" as const,
    duration: null, // Ongoing subscription
  },
};

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    // Get plan from request body
    const body = await request.json();
    const planType = body.plan as keyof typeof PLANS;

    if (!planType || !PLANS[planType]) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'day', 'week', or 'month'" },
        { status: 400 }
      );
    }

    const plan = PLANS[planType];
    const priceId = process.env[plan.priceEnvVar];

    if (!priceId) {
      return NextResponse.json(
        { error: `Missing price ID for ${planType} plan` },
        { status: 500 }
      );
    }

    // Get origin for redirect URLs
    const origin = request.headers.get("origin") || "http://localhost:3000";
    const stripe = getStripe();

    // Create checkout session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: plan.mode,
      payment_method_types: ["card"],
      customer_email: userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        planType,
      },
      success_url: `${origin}/dashboard?success=true&plan=${planType}`,
      cancel_url: `${origin}/dashboard?canceled=true`,
    };

    // Add subscription-specific config for monthly plan
    if (plan.mode === "subscription") {
      sessionConfig.subscription_data = {
        metadata: {
          userId,
          planType,
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

// GET endpoint to redirect directly to checkout
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const plan = searchParams.get("plan") || "week";

  // Redirect to POST with plan
  return NextResponse.json({
    message: "Use POST with { plan: 'day' | 'week' | 'month' }",
  });
}
