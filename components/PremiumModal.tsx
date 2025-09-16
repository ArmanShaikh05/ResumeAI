"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import usePremiumModel from "@/hooks/usePremiumModel";
import { toast } from "sonner";
import { createCheckoutSession } from "@/actions/stripeActions";
import { env } from "@/env";

const premiumFeatures = ["AI tools", "Up to 3 resumes"];
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"];

const PremiumModal = () => {
  const { open, setOpen } = usePremiumModel();

  const [loading, setLoading] = useState(false);

  const handlePremiumClick = async (priceId: string) => {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>ResumeAI Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to unlock more features</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                disabled={loading}
                onClick={() =>
                  handlePremiumClick(env.NEXT_PUBLIC_PRO_PRICE_ID)
                }
              >
                Get Premium
              </Button>
            </div>
            <div className="border-l mx-6" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold bg-gradient-to-br from-ai-emerald to-ai-teal bg-clip-text text-transparent">
                Premium Plus
              </h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="bg-gradient-to-br from-ai-emerald to-ai-teal"
                disabled={loading}
                onClick={() =>
                  handlePremiumClick(env.NEXT_PUBLIC_PRO_PLUS_PRICE_ID)
                }
              >
                Get Premium Plus
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
