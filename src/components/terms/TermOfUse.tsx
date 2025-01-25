"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import CloseIcon2 from "../shared/Icon/CloseIcon2";

interface TermOfUseProps {
  label: string;
  onClick: () => void;
}

export default function TermOfUse({ label, onClick }: TermOfUseProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const $portalRoot = document.getElementById("root-portal");
  if ($portalRoot == null) return null;

  return createPortal(
    <div className={containerStyle}>
      <Flex align="center" className="h-12">
        <div
          onClick={onClick}
          className="pl-[17px] py-[10px] pr-[3px] cursor-pointer"
        >
          <CloseIcon2 color="#0A0A0A" />
        </div>
        <Spacing direction="horizontal" size={6} />
        <span className="text-T3">{label}</span>
      </Flex>
    </div>,
    $portalRoot
  );
}

const containerStyle = `z-20 bg-base-white animate-slide-up w-full max-w-[430px] min-w-[350px] h-screen`;
