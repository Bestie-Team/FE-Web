"use client";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
interface Props {
  children?: React.ReactNode;
}

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <SessionProvider>{children}</SessionProvider>
    </RecoilRoot>
  );
};

export const NextLayout = ({ children }: Props) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="max-w-[430px] mx-auto flex flex-col h-screen bg-grayscale-50 overflow-scroll no-scrollbar">
      {children}
    </div>
  );
};
