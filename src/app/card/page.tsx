"use client";
import React, { useState } from "react";
import ChoosingGatheringToDecorate from "@/components/cards/ChoosingGatheringToDecorate";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import FramePageSkeleton from "@/components/shared/Skeleton/FramePageSkeleton";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

const ChooseFrame = dynamic(() => import("@/components/cards/ChooseFrame"), {
  ssr: false,
  loading: () => <FramePageSkeleton />,
});

const DecorateWithStickers = dynamic(
  () => import("@/components/cards/DecorateWithStickers"),
  {
    ssr: false,
    loading: () => <DotSpinner />,
  }
);

export default function Page() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const handleGatheringChange = () => {
    setStep(step + 1);
  };

  const getHeaderName = () => {
    if (step === 1) {
      return "포토 카드";
    } else if (step === 2) {
      return "프레임 선택";
    } else return "포토 카드";
  };

  const clickBackBtnHandler = () => {
    if (step === 1) {
      router.back();
    }
    setStep(step - 1);
  };

  return (
    <div className="h-dvh">
      <HeaderWithBtn
        headerLabel={getHeaderName()}
        onClickBackBtn={clickBackBtnHandler}
        bgColor="white"
      />
      {step === 1 && (
        <ChoosingGatheringToDecorate onNext={handleGatheringChange} />
      )}
      {step === 2 && <ChooseFrame onNext={handleGatheringChange} />}
      {step === 3 && <DecorateWithStickers />}
    </div>
  );
}
