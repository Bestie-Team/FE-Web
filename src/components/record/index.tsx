"use client";
import React from "react";
import ChoosingGroupToRecord from "./ChoosingGroupToRecord";
import { RecordValues } from "@/models/record";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { recordGatheringFormValues } from "@/atoms/record";

export default function Record() {
  const router = useRouter();
  const [recordValues, setRecordValues] = useRecoilState<RecordValues>(
    recordGatheringFormValues
  );

  const handleGroupChange = (gatheringId: string) => {
    setRecordValues((prevValues) => ({
      ...prevValues,
      gatheringId: gatheringId,
    }));
    router.push(`/record/${gatheringId}`);
  };

  console.log(recordValues);

  return <ChoosingGroupToRecord onNext={handleGroupChange} />;
}
