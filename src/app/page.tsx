"use client";

import { useAuth } from "@/components/shared/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/feed");
  } else if (!isAuthenticated) {
    router.push("/signin");
  }
  return null;
}
