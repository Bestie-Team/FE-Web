"use client";

import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./shared/providers/AuthProvider";
import DotSpinner from "./shared/Spinner/DotSpinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, token, userInfo, userDeleted } = useAuth();
  const isAuthenticated = useMemo(
    () => !!token && !!userInfo,
    [token, userInfo]
  );

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated && pathname === "/") {
      router.replace("/feed");
    }
  }, [pathname, router, isAuthenticated]);

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      pathname !== "/" &&
      !pathname.includes("kakao") &&
      !pathname.includes("oauth") &&
      !pathname.includes("google") &&
      !pathname.includes("apple") &&
      !pathname.includes("/signup")
    ) {
      router.replace("/");
    } else if (
      userDeleted &&
      !isAuthenticated &&
      pathname !== "/" &&
      !pathname.includes("kakao") &&
      !pathname.includes("oauth") &&
      !pathname.includes("google") &&
      !pathname.includes("apple") &&
      !pathname.includes("/signup")
    ) {
      router.replace("/");
    }
  }, [isAuthenticated, router, isLoading, pathname, userDeleted]);

  if (isLoading) {
    return <DotSpinner />;
  }

  return <>{children}</>;
}
