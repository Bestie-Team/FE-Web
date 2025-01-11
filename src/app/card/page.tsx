"use client";
import React from "react";
import ChoosingGatheringToDecorate from "@/components/cards/ChoosingGatheringToDecorate";
import { cardStepAtom } from "@/atoms/card";
import { useRecoilState } from "recoil";
import ChooseFrame from "@/components/cards/ChooseFrame";
import DecorateWithStickers from "@/components/cards/DecorateWithStickers";

export default function Page() {
  const [step, setStep] = useRecoilState<number>(cardStepAtom);

  const handleGatheringChange = () => {
    setStep(step + 1);
  };

  return (
    <div className="bg-grayscale-50">
      {step === 1 && (
        <ChoosingGatheringToDecorate onNext={handleGatheringChange} />
      )}
      {step === 2 && <ChooseFrame onNext={handleGatheringChange} />}
      {step === 3 && <DecorateWithStickers onNext={handleGatheringChange} />}
    </div>
  );
}
