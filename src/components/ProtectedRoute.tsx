"use client";
import { useEffect } from "react";
import type React from "react";

import { useRouter, usePathname } from "next/navigation";
import DotSpinner from "./shared/Spinner/DotSpinner";
import { useAuth } from "./shared/providers/AuthProvider";
import { clearAuthStorage } from "@/utils/authStorage";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, userInfo, updateUserInfo, isAuthenticated } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && isAuthenticated && pathname === "/") {
      router.replace("/feed");
    }
  }, [pathname, router, isAuthenticated, isLoading]);

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
      clearAuthStorage();
      router.replace("/");
    }
  }, [isAuthenticated, router, pathname, isLoading]);

  useEffect(() => {
    if (!userInfo || Object.keys(userInfo).length === 0) {
      updateUserInfo();
    }
  }, []);

  if (isLoading && pathname !== "/") {
    return <DotSpinner />;
  }

  return <>{children}</>;
}
