"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./shared/providers/AuthProvider";
import DotSpinner from "./shared/Spinner/DotSpinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [hasCheckedAuth, setHasCheckedAuth] = useState<null | boolean>(null);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      setHasCheckedAuth(isAuthenticated);
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (hasCheckedAuth === null) return;

    if (hasCheckedAuth && isAuthenticated && pathname === "/") {
      router.replace("/feed");
    }
  }, [pathname, hasCheckedAuth, router]);

  useEffect(() => {
    if (hasCheckedAuth === null) return;

    if (
      hasCheckedAuth &&
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

  if (isLoading || hasCheckedAuth === null) {
    return <DotSpinner />;
  }

  return <>{children}</>;
}
