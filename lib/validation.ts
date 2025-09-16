import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generateInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GenerateInfoValueType = z.infer<typeof generateInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file"
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB"
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalValueTypes = z.infer<typeof personalInfoSchema>;

export const workExpSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
    )
    .optional(),
});

export type WorkExpType = z.infer<typeof workExpSchema>;

export type WorkExperience = NonNullable<
  z.infer<typeof workExpSchema>["workExperiences"]
>[number];

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      })
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type SkillsValues = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

export const fullResumeSchema = z.object({
  ...generateInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExpSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export type ResumeValueType = Omit<
  z.infer<typeof fullResumeSchema>,
  "photo"
> & {
  id?: string;
  photo?: File | string | null;
};

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExpSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;

export const generateWorkExpSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be atleast 20 characters"),
});

export type GenerateWorkExperienceInputType = z.infer<
  typeof generateWorkExpSchema
>;
