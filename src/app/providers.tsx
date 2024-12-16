"use client";
import { RecoilRoot } from "recoil";
interface Props {
  children?: React.ReactNode;
}

export const NextLayout = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <div
        style={{ scrollbarWidth: "none" }}
        className="max-w-[430px] mx-auto flex flex-col h-screen bg-grayscale-50"
      >
        {children}
      </div>
    </RecoilRoot>
  );
};
