"use client";
import React, { useState } from "react";
import ChoosingGatheringToDecorate from "@/components/cards/ChoosingGatheringToDecorate";
import SelectFrame from "@/components/cards/SelectFrame";
import HeaderReturner from "@/utils/headerReturner";

export default function Page() {
  const [step, setStep] = useState<number>(1);
  const handleGatheringChange = () => {
    setStep(step + 1);
  };

  return (
    <div className="bg-grayscale-50">
      <div className={styles.header}>{HeaderReturner()}</div>
      {step === 1 && (
        <ChoosingGatheringToDecorate onNext={handleGatheringChange} />
      )}
      {step === 2 && <SelectFrame onNext={handleGatheringChange} />}
    </div>
  );
}

const styles = {
  header: "max-w-[430px] fixed z-10 w-full",
};
