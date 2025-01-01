"use client";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
interface Props {
  children?: React.ReactNode;
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useChangeHeaderStyle from "@/hooks/useChangeHeaderStyle";
import { useEffect } from "react";

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SessionProvider>{children}</SessionProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const NextLayout = ({ children }: Props) => {
  useChangeHeaderStyle();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      id="scrollable-container"
      className="max-w-[430px] mx-auto flex flex-col h-screen bg-grayscale-50"
    >
      {children}
    </div>
  );
};

export default NextLayout;
