"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import * as lighty from "lighty-type";
import { newGatheringInfo } from "@/atoms/gathering";
import { selectedFriendsAtom } from "@/atoms/friends";
import { lightyToast } from "@/utils/toast";

import useMakeGathering from "@/components/gathering/hooks/useMakeGathering";
import FullPageLoader from "@/components/shared/FullPageLoader";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

const DynamicComponents: { [key: number]: React.ComponentType<any> } = {
  0: dynamic(() => import("@/components/gathering/MakeGatheringStatus"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  1: dynamic(() => import("@/components/gathering/GatheringForm"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  2: dynamic(() => import("@/components/friends/InviteFriends"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  3: dynamic(() => import("@/components/groups/StepToInvitation"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  4: dynamic(() => import("@/components/gathering/MakingInvitation"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
};

export default function NewGatheringPage() {
  const [isClient, setIsClient] = useState(false);
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
    if (!isClient) {
      setIsClient(true);
    }

    return () => {
      reset();
      resetFriends();
    };
  }, [isClient]);

  if (!isClient) {
    return <FullPageLoader />;
  }
  if (isPending) {
    return <DotSpinner />;
  }

  const CurrentStepComponent = DynamicComponents[step] || DynamicComponents[0];
  return (
    <CurrentStepComponent
      isPending={isPending}
      formType="new"
      gathering={gatheringInfo}
      setGathering={setGatheringInfo}
      setStep={setStep}
      makeGathering={makeGathering}
      type="gathering"
    />
  );
}
