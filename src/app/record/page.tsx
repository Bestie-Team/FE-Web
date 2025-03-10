"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import { friendToRecordAtom, recordStepAtom } from "@/atoms/record";
import getHeader from "@/utils/getHeader";
import ChoosingKindOfMemory from "../../components/feeds/ChoosingKindOfMemory";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import ChoosingGatheringToRecord from "@/components/feeds/ChoosingGatheringToRecord";

const ChooseFriendToShare = dynamic(
  () => import("@/components/feeds/ChooseFriendToShare"),
  {
    loading: () => <DotSpinner />,
    ssr: false,
  }
);

const CreatingFeed = dynamic(() => import("@/components/feeds/CreatingFeed"), {
  loading: () => <DotSpinner />,
  ssr: false,
});

const CreatingFeedNoGathering = dynamic(
  () => import("@/components/feeds/CreatingFeedNoGathering"),
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
  const [add, setAdd] = useState<number>(0);
  const search = useRecoilValue(friendToRecordAtom);
  const debouncedSearch = useDebounce(search);

  if (step === 0) {
    return <DotSpinner />;
  }

  const CurrentStepComponent = DynamicComponents[step] || DynamicComponents[1];

  return (
    <div className="relative pt-12 min-h-dvh">
      <div className={styles.headerWrapper}>{header}</div>
      <CurrentStepComponent
        add={add}
        setAdd={setAdd}
        setStep={setStep}
        onNext={() => setStep((prev) => prev + 1)}
        debouncedSearch={debouncedSearch}
      />
    </div>
  );
}

const styles = {
  headerWrapper: "max-w-[430px] w-full fixed z-10",
};
