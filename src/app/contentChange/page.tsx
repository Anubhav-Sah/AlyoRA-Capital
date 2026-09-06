"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/content-client";

export default function ContentChangePage() {
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then((profile) => {
      if (profile) {
        router.replace("/contentChange/dashboard");
      } else {
        router.replace("/contentChange/login");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0D1F3C] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-[#27A84E] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/60 text-sm">Initializing...</p>
      </div>
    </div>
  );
}
