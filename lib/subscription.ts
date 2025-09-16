import { cache } from "react";
import db from "./prisma";
import { env } from "@/env";

export type SubscriptionLevel = "free" | "pro" | "pro_plus";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await db.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (!subscription) {
      return "free";
    }

    if (subscription.stripePriceId === env.NEXT_PUBLIC_PRO_PRICE_ID) {
      return "pro";
    }

    if (subscription.stripePriceId === env.NEXT_PUBLIC_PRO_PLUS_PRICE_ID) {
      return "pro_plus";
    }

    throw new Error("Invalid Subscription");
  }
);
