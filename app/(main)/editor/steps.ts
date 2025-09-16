import { EditorFormType } from "@/lib/types";
import GenerateInfoForm from "./forms/GenerateInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForn from "./forms/SummaryForn";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormType>;
  key: string;
}[] = [
  {
    title: "General Info",
    component: GenerateInfoForm,
    key: "general-info",
  },
  {
    title: "Personal Info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  { title: "Summary", component: SummaryForn, key: "summary" },
];
