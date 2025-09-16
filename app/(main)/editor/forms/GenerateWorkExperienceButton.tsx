import { generateWorkExperience } from "@/actions/aiActions";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSubscriptionLevel } from "@/context/subscriptionLevelContext";
import usePremiumModel from "@/hooks/usePremiumModel";
import { canUseAiTools } from "@/lib/permissions";
import {
  GenerateWorkExperienceInputType,
  generateWorkExpSchema,
  WorkExperience,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface GenerateWorkExpProps {
  onWorkExperienceGenerated: (workExp: WorkExperience) => void;
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExp: WorkExperience) => void;
}

const InputDialog = ({
  onOpenChange,
  onWorkExperienceGenerated,
  open,
}: InputDialogProps) => {
  const form = useForm<GenerateWorkExperienceInputType>({
    resolver: zodResolver(generateWorkExpSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (input: GenerateWorkExperienceInputType) => {
    try {
      const response = await generateWorkExperience(input);
      onWorkExperienceGenerated(response);
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        description: "Please try again",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Work Experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "from nov 2019 to dec 2020 I worked at google as a software engineer, my tasks were: ..."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const GenerateWorkExperienceButton = ({
  onWorkExperienceGenerated,
}: GenerateWorkExpProps) => {
  const [showInputDialog, setShowInputDialog] = useState(false);

  const subscriptionLevel = useSubscriptionLevel();

  const { setOpen } = usePremiumModel();

  return (
    <>
      <Button
        variant={"outline"}
        type="button"
        onClick={() => {
          if (!canUseAiTools(subscriptionLevel)) {
            setOpen(true);
            return;
          }
          setShowInputDialog(true);
        }}
      >
        <WandSparklesIcon className="size-4" />
        Smart fill (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowInputDialog(false);
        }}
      />
    </>
  );
};

export default GenerateWorkExperienceButton;
