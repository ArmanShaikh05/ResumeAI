"use server";

import { canCreateResume } from "@/lib/permissions";
import db from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { fullResumeSchema, ResumeValueType } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export const saveResume = async (values: ResumeValueType) => {
  const { id } = values;


  const { photo, educations, workExperiences, ...resumeValues } =
    fullResumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("user not authenticated");
  }

  const subscribtionLevel = await getUserSubscriptionLevel(userId);

  if (!id) {
    const resumeCount = await db.resume.count({
      where: {
        userId,
      },
    });

    if (!canCreateResume(subscribtionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription account!"
      );
    }
  }

  const existingReusme = id
    ? await db.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingReusme) {
    throw new Error("resume not found");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingReusme?.photoUrl) {
      await del(existingReusme.photoUrl);
    }

    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingReusme?.photoUrl) {
      await del(existingReusme.photoUrl);
    }

    newPhotoUrl = null;
  }

  if (id) {
    return await db.resume.update({
      where: {
        id,
      },

      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  } else {
    return await db.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
};
