"use client";

import { SubscriptionLevel } from "@/lib/subscription";
import { createContext, ReactNode, useContext } from "react";

const SubscriptionContext = createContext<SubscriptionLevel | undefined>(
  undefined
);

interface SubscriptionLevelProps {
  children: ReactNode;
  userSubscriptionLevel: SubscriptionLevel;
}

export const SubscriptionLevelProvider = ({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProps) => {
  return (
    <SubscriptionContext.Provider value={userSubscriptionLevel}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptionLevel = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscriptionLevel should be only used within its provider"
    );
  }

  return context;
};

export default SubscriptionLevelProvider;
