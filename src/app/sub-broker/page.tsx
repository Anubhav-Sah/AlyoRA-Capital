"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubBrokerRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/business-consulting");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0D1F3C] text-white flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-sm text-[#27A84E] font-medium">Redirecting to Business Consulting & Advisory...</p>
      </div>
    </div>
  );
}
