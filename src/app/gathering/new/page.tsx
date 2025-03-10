"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import * as lighty from "lighty-type";
import { newGatheringInfo } from "@/atoms/gathering";
import { selectedFriendsAtom } from "@/atoms/friends";
import { lightyToast } from "@/utils/toast";

import useMakeGathering from "@/components/gathering/hooks/useMakeGathering";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import GatheringForm from "@/components/gathering/GatheringForm";

const components = [
  dynamic(() => import("@/components/gathering/MakeGatheringStatus"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  () => <></>,
  dynamic(() => import("@/components/friends/InviteFriends"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  dynamic(() => import("@/components/groups/StepToInvitation"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  dynamic(() => import("@/components/gathering/MakingInvitation"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
];

export default function NewGatheringPage() {
  const [step, setStep] = useState(1);
  const reset = useResetRecoilState(newGatheringInfo);
  const resetFriends = useResetRecoilState(selectedFriendsAtom);
  const [gatheringInfo, setGatheringInfo] =
    useRecoilState<lighty.CreateGatheringRequest>(newGatheringInfo);

  const { mutate: makeGathering, isPending } = useMakeGathering({
    gathering: gatheringInfo,
    onSuccess: (data: { message: string }) => {
      setStep(0);
      lightyToast.success(data.message);
      reset();
    },
  });

  useEffect(() => {
    return () => {
      reset();
      resetFriends();
    };
  }, []);

  if (isPending) {
    return <DotSpinner />;
  }

  const CurrentStepComponent = components[step] || components[0];

  if (step === 1) {
    return (
      <GatheringForm
        formType="new"
        setStep={setStep}
        gathering={gatheringInfo}
        setGathering={setGatheringInfo}
      />
    );
  }

  return (
    <CurrentStepComponent
      isPending={isPending}
      gathering={gatheringInfo}
      setGathering={setGatheringInfo}
      setStep={setStep}
      makeGathering={makeGathering}
      type="gathering"
    />
  );
}
