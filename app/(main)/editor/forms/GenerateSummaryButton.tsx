import { generateSummary } from "@/actions/aiActions";
import LoadingButton from "@/components/LoadingButton";
import { useSubscriptionLevel } from "@/context/subscriptionLevelContext";
import usePremiumModel from "@/hooks/usePremiumModel";
import { canUseAiTools } from "@/lib/permissions";
import { ResumeValueType } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValueType;
  onSummaryGenerated: (summary: string) => void;
}

const GenerateSummaryButton = ({
  onSummaryGenerated,
  resumeData,
}: GenerateSummaryButtonProps) => {
  const [loading, setLoading] = useState(false);

  const subscriptionLevel = useSubscriptionLevel();

  const { setOpen } = usePremiumModel();

  const handleClick = async () => {
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      if (aiResponse) onSummaryGenerated(aiResponse);
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
    <LoadingButton
      loading={loading}
      onClick={() => {
        if (!canUseAiTools(subscriptionLevel)) {
          setOpen(true);
          return;
        }
        handleClick();
      }}
      type="button"
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
};

export default GenerateSummaryButton;
