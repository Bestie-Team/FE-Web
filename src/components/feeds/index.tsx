"use client";
import React, { useEffect, useState } from "react";
import ChoosingGatheringToRecord from "./ChoosingGatheringToRecord";
import { Gathering } from "@/models/gathering";
import useGatherings from "../gathering/hooks/useGatherings";
import { sortGatherings } from "@/utils/sortGatherings";
import { minDate, maxDate } from "@/constants/time";
import ChoosingKindOfMemory from "./ChoosingKindOfMemory";
import CreatingFeed from "./CreatingFeed";

export default function Record() {
  const [step, setStep] = useState(1);
  const [add, setAdd] = useState<number>(0);
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const { data: gathering_data } = useGatherings({
    cursor: minDate,
    limit: 50,
    minDate: minDate,
    maxDate: maxDate,
  });

  //일단 무한스크롤 구현 전짜기 이렇게 저장
  useEffect(() => {
    if (
      gatherings[0] &&
      gathering_data?.gatherings &&
      gathering_data?.gatherings[0].id === gatherings[0].id
    ) {
      return;
    }
    if (gathering_data) {
      setGatherings(gathering_data?.gatherings);
    }
    console.log(gathering_data?.gatherings);
  }, [gathering_data]);

  const sortedGathering = sortGatherings(gatherings);

  const handleSelectGathering = () => {
    setStep((prev) => prev + 1);
  };

  const handleCreateFeed = () => {};

  return (
    <>
      {step === 1 ? (
        <ChoosingKindOfMemory add={add} setAdd={setAdd} setStep={setStep} />
      ) : null}
      {step === 2.5 ? <CreatingFeed onNext={handleCreateFeed} /> : null}
      {step === 2 ? (
        <ChoosingGatheringToRecord
          onNext={handleSelectGathering}
          gathering={sortedGathering?.passed}
        />
      ) : null}
      {step === 3 ? <CreatingFeed onNext={handleCreateFeed} /> : null}
    </>
  );
}
