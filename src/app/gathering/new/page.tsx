"use client";
import { newGatheringInfo } from "@/atoms/gathering";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import MakingInvitation from "@/components/gathering/MakingInvitation";
import StepToInvitation from "@/components/groups/StepToInvitation";
import * as lighty from "lighty-type";
import InviteFriends from "@/components/friends/InviteFriends";
import useMakeGathering from "@/components/gathering/hooks/useMakeGathering";
import MakingGatheringStatus from "@/components/gathering/MakeGatheringStatus";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { lightyToast } from "@/utils/toast";
import { selectedFriendsAtom } from "@/atoms/friends";
import GatheringForm from "@/components/gathering/GatheringForm";

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

  if (!isClient) {
    return <FullPageLoader />;
  }

  if (isPending || step === 0) {
    return <MakingGatheringStatus isPending={isPending} />;
  }
  if (step === 1) {
    return (
      <GatheringForm
        type="new"
        gathering={gatheringInfo}
        setGathering={setGatheringInfo}
        setStep={setStep}
      />
    );
  }

  if (step === 2) {
    return <InviteFriends setStep={setStep} type="gathering" />;
  }
  if (step === 3) {
    return <StepToInvitation setStep={setStep} />;
  }
  if (step === 4) {
    return (
      <MakingInvitation
        gathering={gatheringInfo}
        setGathering={setGatheringInfo}
        makeGathering={makeGathering}
      />
    );
  }

  return null;
}
