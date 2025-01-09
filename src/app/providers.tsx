"use client";
import { RecoilRoot } from "recoil";

interface Props {
  children?: React.ReactNode;
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import NavBar from "@/components/shared/NavBar";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider clientId="819938529870-7ng56emjnvtfds459lrb7h1a9g04r4q5.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>{children}</RecoilRoot>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

const NextLayout = ({ children }: Props) => {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  {
    return (
      <div
        style={{
          position: "relative",
          maxWidth: "430px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <>{children}</>
        {pathname.startsWith("/card") ? null : <NavBar />}
      </div>
    );
  }
};

export default NextLayout;
