import { currentUser } from "@clerk/nextjs/server";

export type PlanType = "day" | "week" | "month";
export type AccessStatus = "active" | "expired" | "none";

interface UserAccess {
  status: AccessStatus;
  planType: PlanType | null;
  expiresAt: Date | null;
  isSubscription: boolean;
}

// Get access status from user metadata
export async function getUserAccess(): Promise<UserAccess> {
  const user = await currentUser();

  if (!user) {
    return {
      status: "none",
      planType: null,
      expiresAt: null,
      isSubscription: false,
    };
  }

  const metadata = user.publicMetadata as {
    subscriptionStatus?: string;
    planType?: PlanType;
    accessExpiresAt?: string;
  };

  // Check for active subscription (monthly)
  if (
    metadata.subscriptionStatus === "active" ||
    metadata.subscriptionStatus === "trialing"
  ) {
    return {
      status: "active",
      planType: "month",
      expiresAt: null,
      isSubscription: true,
    };
  }

  // Check for day/week pass
  if (metadata.accessExpiresAt) {
    const expiresAt = new Date(metadata.accessExpiresAt);
    const now = new Date();

    if (expiresAt > now) {
      return {
        status: "active",
        planType: metadata.planType || null,
        expiresAt,
        isSubscription: false,
      };
    } else {
      return {
        status: "expired",
        planType: metadata.planType || null,
        expiresAt,
        isSubscription: false,
      };
    }
  }

  return {
    status: "none",
    planType: null,
    expiresAt: null,
    isSubscription: false,
  };
}

// Check if user has active access (for use in components)
export async function hasActiveAccess(): Promise<boolean> {
  const access = await getUserAccess();
  return access.status === "active";
}

// Get time remaining for pass (for UI display)
export function getTimeRemaining(expiresAt: Date): string {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();

  if (diff <= 0) return "Expired";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} remaining`;
  }

  return `${hours} hour${hours > 1 ? "s" : ""} remaining`;
}

// Calculate expiration date based on plan type
export function calculateExpiration(planType: PlanType): Date {
  const now = new Date();

  switch (planType) {
    case "day":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
    case "week":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
    case "month":
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days (fallback)
    default:
      return now;
  }
}

