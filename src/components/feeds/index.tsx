"use client";
import React, { useEffect, useState } from "react";
import ChoosingGatheringToRecord from "./ChoosingGatheringToRecord";
import { Gathering } from "@/models/gathering";
import useGatherings from "../gathering/hooks/useGatherings";
import { sortGatherings } from "@/utils/sortGatherings";
import { minDate, maxDate } from "@/constants/time";
import ChoosingKindOfMemory from "./ChoosingKindOfMemory";
import CreatingFeed from "./CreatingFeed";
import CreatingFeedNoGathering from "./CreatingFeedNoGathering";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import { friendToRecordAtom, recordStepAtom } from "@/atoms/record";
import ChooseFriendToShare from "./ChooseFriendToShare";

export default function Record() {
  const [step, setStep] = useRecoilState(recordStepAtom);
  const [add, setAdd] = useState<number>(0);
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const { data: gathering_data } = useGatherings({
    cursor: minDate,
    limit: 50,
    minDate: minDate,
    maxDate: maxDate,
  });

  const search = useRecoilValue(friendToRecordAtom);
  const debouncedSearch = useDebounce(search);

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

  return (
    <>
      {step === 1 ? (
        <ChoosingKindOfMemory add={add} setAdd={setAdd} setStep={setStep} />
      ) : null}
      {step === 2.5 ? (
        <ChooseFriendToShare debouncedSearch={debouncedSearch} />
      ) : null}
      {step === 3.5 ? <CreatingFeedNoGathering /> : null}
      {step === 2 ? (
        <ChoosingGatheringToRecord
          onNext={handleSelectGathering}
          gathering={sortedGathering?.passed}
        />
      ) : null}
      {step === 3 ? <CreatingFeed /> : null}
    </>
  );
}
