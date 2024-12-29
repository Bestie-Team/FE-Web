"use client";
import useChangeHeaderStyle from "@/hooks/useChangeHeaderStyle";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

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
      className="max-w-[430px] mx-auto flex flex-col h-screen bg-grayscale-50 overflow-scroll no-scrollbar"
    >
      {children}
    </div>
  );
};

export default NextLayout;
