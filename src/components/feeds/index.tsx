"use client";
import React, { useEffect, useState } from "react";
import ChoosingGatheringToRecord from "./ChoosingGatheringToRecord";
import { Gathering } from "@/models/gathering";
import useGatherings from "../gathering/hooks/useGatherings";
import { sortGatherings } from "@/utils/sortGatherings";
import CreatingPostToRecord from "./CreatingPostToRecord";

export default function Record() {
  const [step, setStep] = useState(1);
  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();
  const [gatheringCursor, setGatheringCursor] = useState<string | null>(
    minDate
  );

  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const { data: gathering_data } = useGatherings({
    cursor: gatheringCursor,
    limit: 50,
    minDate: minDate,
    maxDate: maxDate,
  });

  // const { mutate: createFeed } = usec
  //일단 무한스크롤 구현 전짜기 이렇게 저장
  useEffect(() => {
    if (
      gatherings[0] &&
      gathering_data?.gatherings &&
      gathering_data?.gatherings[0].id === gatherings[0].id
    )
      return;
    gathering_data && setGatherings(gathering_data?.gatherings);
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
        <ChoosingGatheringToRecord
          onNext={handleSelectGathering}
          gathering={sortedGathering?.passed}
        />
      ) : null}
      {step === 2 ? <CreatingPostToRecord onNext={handleCreateFeed} /> : null}
    </>
  );
}
