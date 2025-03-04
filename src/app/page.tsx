"use client";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import Splash from "@/components/Splash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) {
    return <DotSpinner />;
  }
  if (isAuthenticated) {
    router.replace("/feed");
  }

  return <Splash />;
}
