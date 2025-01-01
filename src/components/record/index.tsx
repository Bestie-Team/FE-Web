import React, { useEffect, useState } from "react";
import ChoosingGroupToRecord from "./ChoosingGroupToRecord";
import CreatingPostToRecord from "./CreatingPostToRecord";
import { RecordValues } from "@/models/record";

export default function Record({
  onSubmit,
}: {
  onSubmit: (recordValues: RecordValues) => void;
}) {
  const [step, setStep] = useState(1);

  const [recordValues, setRecordValues] = useState<Partial<RecordValues>>();

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...recordValues,
        appliedAt: new Date(),
      } as RecordValues);
    } else {
      console.log("저장", recordValues);
    }
  }, [recordValues, onSubmit]);

  const handleGroupChange = (gatheringId: string) => {
    setRecordValues((prevValues) => ({
      ...prevValues,
      groupId: gatheringId,
    }));
    setStep(step + 1);
  };

  const handlePostInfoChange = (postInfoValues: {
    imageUrl: string[];
    recordContent: string;
  }) => {
    setRecordValues((prevValues) => ({
      ...prevValues,
      ...postInfoValues,
    }));
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && <ChoosingGroupToRecord onNext={handleGroupChange} />}
      {step === 2 && <CreatingPostToRecord onNext={handlePostInfoChange} />}
    </>
  );
}
