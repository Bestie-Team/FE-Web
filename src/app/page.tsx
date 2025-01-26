"use client";
import HomePage from "@/components/HomePage";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import Splash from "@/components/Splash";
import { useEffect, useState } from "react";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return isAuthenticated ? <HomePage /> : <Splash />;
}
