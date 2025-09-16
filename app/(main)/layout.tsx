import React from "react";
import Navber from "@/app/(main)/Navbar";
import PremiumModal from "@/components/PremiumModal";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "@/context/subscriptionLevelContext";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) return null;

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="min-h-screen flex flex-col">
        <Navber />
        {children}
        <PremiumModal />
      </div>
    </SubscriptionLevelProvider>
  );
};

export default Layout;
