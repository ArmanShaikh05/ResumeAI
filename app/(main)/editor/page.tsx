import { Metadata } from "next";
import React from "react";
import ResumeEditor from "./ResumeEditor";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataIclude } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design Your Resume",
};

const Page = async ({ searchParams }: PageProps) => {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) return null;

  const resumeToEdit = resumeId
    ? await db.resume.findUnique({
        where: {
          id: resumeId,
          userId,
        },
        include: resumeDataIclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
};

export default Page;
