import { env } from "@/env";
import db from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Signature is missing", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`Recieved event: ${event.type},`, event.data.object);

    switch (event.type) {
      case "checkout.session.completed":
        await hanndleSessionCompleted(event.data.object);
        break;
      case "customer.subscription.created":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
      default:
        console.log("Unhandled event recieved", event.type);
        break;
    }

    return new Response("Event Recieved", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

const hanndleSessionCompleted = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;

  if (!userId) {
    throw new Error("UserId is missing in session metadata");
  }
  (await clerkClient()).users.updateUserMetadata(userId, {
    privateMetadata: {
      stripeCustomerId: session.customer as string,
    },
  });
};

const handleSubscriptionCreatedOrUpdated = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due"
  ) {
    await db.userSubscription.upsert({
      where: {
        userId: subscription.metadata.userId,
      },
      create: {
        userId: subscription.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } else {
    await db.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  }
};

const handleSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
  await db.userSubscription.deleteMany({
    where: {
      stripeCustomerId: subscription.customer as string,
      stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
};
