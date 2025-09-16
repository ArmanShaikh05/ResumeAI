"use client";

import { Button } from "@/components/ui/button";
import usePremiumModel from "@/hooks/usePremiumModel";

export default function GetSubscriptionButton() {
  const { setOpen } = usePremiumModel();

  return (
    <Button onClick={() => setOpen(true)}>Get Premium subscription</Button>
  );
}
