"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { recordStepAtom } from "@/atoms/record";
import ChoosingKindOfMemory from "../../components/feeds/ChoosingKindOfMemory";
import ChoosingGatheringToRecord from "@/components/feeds/ChoosingGatheringToRecord";
import CreatingFeed from "@/components/feeds/CreatingFeed";
import CreatingFeedNoGathering from "@/components/feeds/CreatingFeedNoGathering";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import { useRouter, useSearchParams } from "next/navigation";
import Spacing from "@/components/shared/Spacing";
import clsx from "clsx";
import FriendToShareSkeleton from "@/components/shared/Skeleton/FriendToShareSkeleton";

const ChooseFriendToShare = dynamic(
  () => import("@/components/feeds/ChooseFriendToShare"),
  {
    loading: () => <FriendToShareSkeleton />,
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
  const [add, setAdd] = useState<number>(1);
  const searchParams = useSearchParams();
  const from = searchParams?.get("ref");

  const clickBackBtnHandler = () => {
    if (step === 1) {
      router.back();
    }
    if (step === 2.5) {
      setStep(step - 1.5);
    } else if (step > 1) {
      if (from === "gathering") {
        setStep(1);
        router.back();
        return;
      }
      setStep(step - 1);
    }
  };

  const CurrentStepComponent = DynamicComponents[step] || DynamicComponents[1];

  return (
    <div
      className={clsx(
        "min-h-dvh pt-safe-top",
        step === 2.5 ? "bg-grayscale-50" : "bg-base-white"
      )}
    >
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
      />
    </div>
  );
}
