"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import { friendToRecordAtom, recordStepAtom } from "@/atoms/record";
import ChoosingKindOfMemory from "../../components/feeds/ChoosingKindOfMemory";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import ChoosingGatheringToRecord from "@/components/feeds/ChoosingGatheringToRecord";
import CreatingFeed from "@/components/feeds/CreatingFeed";
import CreatingFeedNoGathering from "@/components/feeds/CreatingFeedNoGathering";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import { useRouter } from "next/navigation";
import Spacing from "@/components/shared/Spacing";

const ChooseFriendToShare = dynamic(
  () => import("@/components/feeds/ChooseFriendToShare"),
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
  const router = useRouter();
  const [step, setStep] = useRecoilState(recordStepAtom);
  const [add, setAdd] = useState<number>(0);
  const search = useRecoilValue(friendToRecordAtom);
  const debouncedSearch = useDebounce(search);

  const clickBackBtnHandler = () => {
    if (step === 1) {
      router.back();
    }
    if (step === 2.5) {
      setStep(step - 1.5);
    } else setStep(step - 1);
  };

  const CurrentStepComponent = DynamicComponents[step] || DynamicComponents[1];

  return (
    <div className="min-h-dvh pt-safe-top">
      <HeaderWithBtn
        headerLabel="기록하기"
        onClickBackBtn={clickBackBtnHandler}
        bgColor={step === 2.5 ? "#F4F4F4" : "white"}
      />
      <Spacing size={48} />
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
