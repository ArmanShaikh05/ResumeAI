"use client";

import { createCustomerPortalSession } from "@/actions/stripeActions";
import LoadingButton from "@/components/LoadingButton";
import React, { useState } from "react";
import { toast } from "sonner";

const ManageSubscriptionButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast("Something went wrong", { description: "Please try again" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      Manage Subscription
    </LoadingButton>
  );
};

export default ManageSubscriptionButton;
