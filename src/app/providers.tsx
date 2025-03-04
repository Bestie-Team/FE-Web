"use client";
import { RecoilRoot } from "recoil";
import React from "react";
interface Props {
  children?: React.ReactNode;
}
declare global {
  interface Window {
    mazeUniversalSnippetApiKey?: string;
  }
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import NavBar from "@/components/shared/NavBar";
import { usePathname } from "next/navigation";
import {
  AuthProvider,
  useAuth,
} from "@/components/shared/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import useMaze from "@/hooks/useMaze";
import useScrollToTop from "@/hooks/useScrollToTop";

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  useMaze();

  return (
    <GoogleOAuthProvider clientId="819938529870-7ng56emjnvtfds459lrb7h1a9g04r4q5.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AuthProvider>{children}</AuthProvider>
          <ToastContainer
            position="top-center"
            hideProgressBar
            autoClose={2500}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
        </RecoilRoot>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

const DARK_BACKGROUND_PATHS = [
  "/record",
  "/groups",
  "/friends",
  "/friends/search",
] as const;
const PUBLIC_PATHS = ["/signup", "/auth"] as const;
const NAVBAR_PATHS = ["/gathering", "/feed", "/schedule", "/my"] as const;

const isPathIncluded = (path: string, pathList: readonly string[]) =>
  pathList.some((item) => path.startsWith(item));

const isPathEqual = (path: string, pathList: readonly string[]) =>
  pathList.some((item) => path === item);

const NextLayout = ({ children }: Props) => {
  const router = useRouter();
  useScrollToTop();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const isPublicPath = isPathIncluded(pathname, PUBLIC_PATHS);
    if (!isAuthenticated && !isPublicPath) {
      router.replace("/");
    }
  }, [isAuthenticated, pathname, router]);

  const showNavBar =
    isPathEqual(pathname, NAVBAR_PATHS) ||
    (pathname === "/" && isAuthenticated);

  {
    return (
      <div
        className={clsx(
          "flex flex-col relative max-w-[430px] mx-auto my-0 min-h-dvh",
          isPathIncluded(pathname, DARK_BACKGROUND_PATHS)
            ? "bg-grayscale-50"
            : "bg-base-white "
        )}
      >
        {children}
        {showNavBar && <NavBar />}
      </div>
    );
  }
};

export default NextLayout;
