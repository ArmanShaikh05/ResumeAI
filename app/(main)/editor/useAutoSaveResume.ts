import { saveResume } from "@/actions/saveResume";
import useDebounce from "@/hooks/useDebounce";
import { fileReplacer } from "@/lib/utils";
import { ResumeValueType } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useAutoSaveResume = (resumeData: ResumeValueType) => {
  const serachParams = useSearchParams();

  const deboundedData = useDebounce<ResumeValueType>(resumeData, 1500);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData)
  );

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [isError, setIsError] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [deboundedData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);
        const newData = structuredClone(deboundedData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (serachParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(serachParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        toast("Something went wrong", {
          description: "Could not save changes...",
          dismissible: true,
          action: {
            label: "Retry",
            type: "destructive",
            onClick: () => save(),
          },
        });
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(deboundedData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && deboundedData && !isSaving && !isError) save();
  }, [deboundedData, isError, isSaving, lastSavedData, resumeId, serachParams]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
};

export default useAutoSaveResume;
