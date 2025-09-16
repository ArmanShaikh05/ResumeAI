"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();

  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignIn
        appearance={{
          theme: theme === "dark" ? dark : undefined,
          elements: {
            formButtonPrimary:
              "bg-gradient-to-br from-ai-emerald to-ai-teal text-white border-0 outline-0",
          },
        }}
      />
    </main>
  );
}
