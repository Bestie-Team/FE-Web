"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./shared/providers/AuthProvider";
import DotSpinner from "./shared/Spinner/DotSpinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasCheckedAuth(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (hasCheckedAuth && isAuthenticated && pathname === "/") {
      router.replace("/feed");
    }
  }, [isAuthenticated, pathname, hasCheckedAuth, router]);

  useEffect(() => {
    if (
      hasCheckedAuth &&
      !isAuthenticated &&
      pathname !== "/" &&
      !pathname.includes("kakao") &&
      !pathname.includes("google") &&
      !pathname.includes("apple") &&
      !pathname.includes("/signup")
    ) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, pathname, hasCheckedAuth, router]);

  if (isLoading) {
    return <DotSpinner />;
  }

  return <>{children}</>;
}
