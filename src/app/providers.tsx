"use client";
import { RecoilRoot } from "recoil";

interface Props {
  children?: React.ReactNode;
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { LayoutTransition } from "@/components/LayoutTransition";
import NavBar from "@/components/shared/NavBar";

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  );
};

const NextLayout = ({ children }: Props) => {
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
        <LayoutTransition>{children}</LayoutTransition>
        <NavBar />
      </div>
    );
  }
};

export default NextLayout;
