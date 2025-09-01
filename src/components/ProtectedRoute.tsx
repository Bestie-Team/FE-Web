"use client";
import { useEffect, useMemo } from "react";
import type React from "react";

import { useRouter, usePathname } from "next/navigation";
import DotSpinner from "./shared/Spinner/DotSpinner";
import { useAuth } from "./shared/providers/AuthProvider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, token, userInfo } = useAuth();
  const isAuthenticated = useMemo(
    () => !!token && !!userInfo,
    [token, userInfo]
  );

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && isAuthenticated && pathname === "/") {
      router.replace("/feed");
    }
  }, [pathname, router, isAuthenticated]);

  // ✅ 인증 실패 시 "/"로 보냄
  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      pathname !== "/" &&
      !pathname.includes("kakao") &&
      !pathname.includes("oauth") &&
      !pathname.includes("google") &&
      !pathname.includes("apple") &&
      !pathname.includes("/signup") &&
      !pathname.includes("/onboard")
    ) {
      router.replace("/");
    }
  }, [isAuthenticated, router, pathname, isLoading]);

  if (isLoading && pathname !== "/") {
    return <DotSpinner />;
  }

  return <>{children}</>;
}
