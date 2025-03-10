"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import { friendToRecordAtom, recordStepAtom } from "@/atoms/record";
import getHeader from "@/utils/getHeader";
import ChoosingKindOfMemory from "./ChoosingKindOfMemory";
import DotSpinner from "../shared/Spinner/DotSpinner";

const ChoosingGatheringToRecord = dynamic(
  () => import("./ChoosingGatheringToRecord"),
  {
    loading: () => <DotSpinner />,
    ssr: false,
  }
);

const ChooseFriendToShare = dynamic(() => import("./ChooseFriendToShare"), {
  loading: () => <DotSpinner />,
  ssr: false,
});

const CreatingFeed = dynamic(() => import("./CreatingFeed"), {
  loading: () => <DotSpinner />,
  ssr: false,
});

const CreatingFeedNoGathering = dynamic(
  () => import("./CreatingFeedNoGathering"),
  {
    loading: () => <DotSpinner />,
    ssr: false,
  }
);

const DynamicComponents = {
  1: ChoosingKindOfMemory,
  2: ChoosingGatheringToRecord,
  2.5: ChooseFriendToShare,
  3: CreatingFeed,
  3.5: CreatingFeedNoGathering,
};

export default function Record() {
  const header = getHeader("/record");
  const [step, setStep] = useRecoilState(recordStepAtom);
  const [add, setAdd] = React.useState<number>(0);
  const search = useRecoilValue(friendToRecordAtom);
  const debouncedSearch = useDebounce(search);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  if (step === 0 || !isClient) {
    return <DotSpinner />;
  }

  const CurrentStepComponent = DynamicComponents[step] || DynamicComponents[1];

  return (
    <>
      <div className={styles.headerWrapper}>{header}</div>
      <CurrentStepComponent
        add={add}
        setAdd={setAdd}
        setStep={setStep}
        onNext={() => setStep((prev) => prev + 1)}
        debouncedSearch={debouncedSearch}
      />
    </>
  );
}

const styles = {
  headerWrapper: "max-w-[430px] w-full fixed z-10",
};
