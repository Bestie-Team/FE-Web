"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useMemo } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import * as lighty from "lighty-type";
import { newGatheringInfo } from "@/atoms/gathering";
import { selectedFriendsAtom } from "@/atoms/friends";
import { lightyToast } from "@/utils/toast";

import useMakeGathering from "@/components/gathering/hooks/useMakeGathering";
import FullPageLoader from "@/components/shared/FullPageLoader";
import MakingGatheringStatus from "@/components/gathering/MakeGatheringStatus";

const GatheringForm = dynamic(
  () => import("@/components/gathering/GatheringForm"),
  {
    loading: () => <FullPageLoader />,
    ssr: false,
  }
);

const InviteFriends = dynamic(
  () => import("@/components/friends/InviteFriends"),
  {
    loading: () => <FullPageLoader />,
    ssr: false,
  }
);

const StepToInvitation = dynamic(
  () => import("@/components/groups/StepToInvitation"),
  {
    loading: () => <FullPageLoader />,
    ssr: false,
  }
);

const MakingInvitation = dynamic(
  () => import("@/components/gathering/MakingInvitation"),
  {
    loading: () => <FullPageLoader />,
    ssr: false,
  }
);

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
    setIsClient(true);

    return () => {
      reset();
      resetFriends();
    };
  }, []);

  const StepComponents = useMemo(
    () => ({
      0: () => <MakingGatheringStatus isPending={isPending} />,
      1: () => (
        <GatheringForm
          type="new"
          gathering={gatheringInfo}
          setGathering={setGatheringInfo}
          setStep={setStep}
        />
      ),
      2: () => <InviteFriends setStep={setStep} type="gathering" />,
      3: () => <StepToInvitation setStep={setStep} />,
      4: () => (
        <MakingInvitation
          gathering={gatheringInfo}
          setGathering={setGatheringInfo}
          makeGathering={makeGathering}
        />
      ),
    }),
    [gatheringInfo, isPending, makeGathering]
  );

  if (!isClient) {
    return <FullPageLoader />;
  }

  const CurrentStepComponent = StepComponents[step] || StepComponents[0];
  return <CurrentStepComponent />;
}
