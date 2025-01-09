"use client";
import React from "react";
import ChoosingGatheringToDecorate from "@/components/cards/ChoosingGatheringToDecorate";
import SelectFrame from "@/components/cards/DecorateWithStickers";
import HeaderReturner from "@/utils/headerReturner";
import { cardStepAtom } from "@/atoms/card";
import { useRecoilState } from "recoil";
import ChooseFrame from "@/components/cards/ChooseFrame";
import { toPng } from "html-to-image";

export default function Page() {
  const [step, setStep] = useRecoilState<number>(cardStepAtom);
  const handleGatheringChange = () => {
    setStep(step + 1);
  };

  return (
    <div className="bg-grayscale-50">
      <div className={styles.header}>{HeaderReturner()}</div>
      {step === 1 && (
        <ChoosingGatheringToDecorate onNext={handleGatheringChange} />
      )}
      {step === 2 && <ChooseFrame onNext={handleGatheringChange} />}
      {step === 3 && <SelectFrame onNext={handleGatheringChange} />}
    </div>
  );
}

const styles = {
  header: "max-w-[430px] fixed z-10 w-full",
};
