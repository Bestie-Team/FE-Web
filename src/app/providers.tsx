"use client";
import { RecoilRoot } from "recoil";
interface Props {
  children?: React.ReactNode;
}

export const NextLayout = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <div className="max-w-[430px] mx-auto flex flex-col h-screen bg-grayscale-50 no-scrollbar">
        {children}
      </div>
    </RecoilRoot>
  );
};
