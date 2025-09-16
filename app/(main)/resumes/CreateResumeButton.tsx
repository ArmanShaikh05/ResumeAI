"use client";

import { Button } from "@/components/ui/button";
import usePremiumModel from "@/hooks/usePremiumModel";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

const CreateResumeButton = ({ canCreate }: CreateResumeButtonProps) => {
  const { setOpen } = usePremiumModel();

  if (canCreate) {
    return (
      <Button
        asChild
        // onClick={() => premiumModal.setOpen(true)}
        className=" flex w-fit gap-2 bg-gradient-to-br from-ai-emerald to-ai-teal"
      >
        <Link href={"/editor"}>
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setOpen(true)}
      className=" flex w-fit gap-2 bg-gradient-to-br from-ai-emerald to-ai-teal"
    >
      <PlusSquare className="size-5" />
      New resume
    </Button>
  );
};

export default CreateResumeButton;
