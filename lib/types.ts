import { Prisma } from "@prisma/client";
import { ResumeValueType } from "./validation";

export interface EditorFormType {
  resumeData: ResumeValueType;
  setResumeData: (data: ResumeValueType) => void;
}

export const resumeDataIclude = {
  educations: true,
  workExperiences: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataIclude;
}>;
