"use client";
import React, { useEffect, useState } from "react";
import ChoosingGatheringToRecord from "./ChoosingGatheringToRecord";
import ChoosingKindOfMemory from "./ChoosingKindOfMemory";
import CreatingFeed from "./CreatingFeed";
import CreatingFeedNoGathering from "./CreatingFeedNoGathering";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import { friendToRecordAtom, recordStepAtom } from "@/atoms/record";
import ChooseFriendToShare from "./ChooseFriendToShare";
import FullPageLoader from "../shared/FullPageLoader";
import useGatheringNoFeeds from "../gathering/hooks/useGatheringNoFeed";

export default function Record() {
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useRecoilState(recordStepAtom);
  const [add, setAdd] = useState<number>(0);
  const search = useRecoilValue(friendToRecordAtom);
  const debouncedSearch = useDebounce(search);
  const { data: gathering_noFeed } = useGatheringNoFeeds();
  const handleSelectGathering = () => {
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

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
          gathering={gathering_noFeed}
        />
      ) : null}
      {step === 3 ? <CreatingFeed /> : null}
    </>
  );
}
