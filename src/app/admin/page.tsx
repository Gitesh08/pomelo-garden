"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasCookie = document.cookie.includes("pomelo_admin_session=authenticated");
      const hasLocal = localStorage.getItem("pomelo_admin_session") === "authenticated";
      if (hasCookie || hasLocal) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center font-mono text-xs text-gray-500">
      Redirecting to Admin Studio...
    </div>
  );
}
