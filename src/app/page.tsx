"use client";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import Splash from "@/components/Splash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient, isAuthenticated]);

  if (!isClient) {
    return <DotSpinner />;
  }
  if (isAuthenticated) {
    router.replace("/feed");
  }

  return <Splash />;
}
