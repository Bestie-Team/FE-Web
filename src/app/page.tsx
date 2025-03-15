"use client";

import { useAuth } from "@/components/shared/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/feed");
      return;
    } else if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
  }, [pathname, isAuthenticated]);

  return <></>;
}
