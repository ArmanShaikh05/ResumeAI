import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import { FileUser, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showResumePreview: boolean;
  setShowResumePreview: (show: boolean) => void;
  isSaving: boolean;
}

const Footer = ({
  currentStep,
  setCurrentStep,
  setShowResumePreview,
  showResumePreview,
  isSaving,
}: FooterProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3 ">
          <Button
            variant={"secondary"}
            disabled={!previousStep}
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
          >
            Previous step
          </Button>
          <Button
            disabled={!nextStep}
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
          >
            Next step
          </Button>
        </div>

        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setShowResumePreview(!showResumePreview)}
          className="md:hidden"
          title={showResumePreview ? "Show input form" : "Show resume preview"}
        >
          {showResumePreview ? <PenLine /> : <FileUser />}
        </Button>

        <div className="flex items-center gap-3 ">
          <Button variant={"secondary"} asChild>
            <Link href={"/resumes"}>Close</Link>
          </Button>
          <p className={cn("text-muted-foreground text-sm md:text-lg opacity-0", isSaving && "opacity-100")}>
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
