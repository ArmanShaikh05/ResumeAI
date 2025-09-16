import ResumePreview from "@/components/ResumePreview";
import { ResumeValueType } from "@/lib/validation";
import React from "react";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeData: ResumeValueType;
  setResumeData: (data: ResumeValueType) => void;
  classname?: string;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
  classname,
}: ResumePreviewSectionProps) => {
  return (
    <div
      className={cn("group relative hidden md:w-1/2 md:flex w-full", classname)}
    >
      <div className="absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3 opacity-50 xl:opacity-100 group-hover:opacity-100 transition-opacity">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle: borderStyle })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary">
        <ResumePreview
          resumeData={resumeData}
          classname="max-w-2xl shadow-md m-4"
        />
      </div>
    </div>
  );
};

export default ResumePreviewSection;
