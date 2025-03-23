"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./shared/providers/AuthProvider";
import DotSpinner from "./shared/Spinner/DotSpinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated && pathname === "/") {
      router.replace("/feed");
    }
  }, [pathname, router]);

  useEffect(() => {
    if (
      !isAuthenticated &&
      pathname !== "/" &&
      !pathname.includes("oauth") &&
      !pathname.includes("google") &&
      !pathname.includes("apple") &&
      !pathname.includes("/signup")
    ) {
      router.replace("/");
    }
  }, [isAuthenticated, pathname, router]);

  if (isLoading) {
    return <DotSpinner />;
  }

  return <>{children}</>;
}
