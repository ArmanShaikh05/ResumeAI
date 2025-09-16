import db from "@/lib/prisma";
import { resumeDataIclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CreateResumeButton from "./CreateResumeButton";
import ResumeItem from "./ResumeItem";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Your Resumes",
};

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    db.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataIclude,
    }),
    db.resume.count({
      where: {
        userId,
      },
    }),
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <main className="container mx-auto w-full px-3 py-6 space-y-6">
      <div className="space-y-1 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Your resumes{" "}
          <span className="text-lg font-normal">( {totalCount} )</span>
        </h1>
        <CreateResumeButton
          canCreate={canCreateResume(subscriptionLevel, totalCount)}
        />
      </div>

      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
};

export default Page;
