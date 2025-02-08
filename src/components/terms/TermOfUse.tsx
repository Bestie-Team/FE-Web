"use client";
import Flex from "../shared/Flex";
import CloseIcon2 from "../shared/Icon/CloseIcon2";

interface TermOfUseProps {
  label: string;
  onClick: () => void;
}

export default function TermOfUse({ label, onClick }: TermOfUseProps) {
  return (
    <div
      style={{
        zIndex: 20,
        inset: 0,
        position: "fixed",
      }}
      className={containerStyle}
    >
      <Flex align="center" className="h-12 gap-[6px]">
        <div
          onClick={onClick}
          className="pl-[17px] py-[10px] pr-[3px] cursor-pointer"
        >
          <CloseIcon2 color="#0A0A0A" />
        </div>
        <span className="text-T3">{label}</span>
      </Flex>
    </div>
  );
}

const containerStyle = `bg-base-white animate-slide-up w-full max-w-[430px] min-w-[350px] h-screen`;
