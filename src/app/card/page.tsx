"use client";
import React, { useEffect, useState } from "react";
import ChoosingGatheringToDecorate from "@/components/cards/ChoosingGatheringToDecorate";
import ChooseFrame from "@/components/cards/ChooseFrame";
import DecorateWithStickers from "@/components/cards/DecorateWithStickers";
import ArrowLeftIcon from "@/components/shared/Icon/ArrowLeftIcon";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import FullPageLoader from "@/components/shared/FullPageLoader";

export default function Page() {
  const [step, setStep] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <div className="bg-grayscale-50 h-full overflow-hidden">
      <header
        className={clsx(
          styles.header,
          step === 1 ? "bg-base-white" : "bg-grayscale-50"
        )}
      >
        <div
          className="py-[10px] pl-[17px] pr-[3px] cursor-pointer"
          onClick={() => {
            if (step === 1) {
              router.back();
            }
            setStep(step - 1);
          }}
        >
          <ArrowLeftIcon />
        </div>
        <span className="text-T3">{getHeaderName()}</span>
      </header>
      {step === 1 && (
        <ChoosingGatheringToDecorate onNext={handleGatheringChange} />
      )}
      {step === 2 && <ChooseFrame onNext={handleGatheringChange} />}
      {step === 3 && <DecorateWithStickers />}
    </div>
  );
}

const styles = {
  header: "flex w-full max-w-[430px] z-10 fixed items-center gap-[6px] h-12 ",
};
