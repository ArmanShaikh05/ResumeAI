import { SubscriptionLevel } from "./subscription";

export const canCreateResume = (
  subscribtionLevel: SubscriptionLevel,
  currentResumeCount: number
) => {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 1,
    pro: 3,
    pro_plus: Infinity,
  };

  const maxResumes = maxResumeMap[subscribtionLevel];

  return currentResumeCount < maxResumes;
};

export const canUseAiTools = (subscribtionLevel: SubscriptionLevel) => {
  return subscribtionLevel !== "free";
};


