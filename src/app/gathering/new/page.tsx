"use client";
import { newGatheringInfo } from "@/atoms/gathering";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import MakingInvitation from "@/components/gathering/MakingInvitation";
import StepToInvitation from "@/components/groups/StepToInvitation";
import * as lighty from "lighty-type";
import InviteFriends from "@/components/friends/InviteFriends";
import GatheringFormContainer from "@/components/gathering/GatheringFormContainer";
import useMakeGathering from "@/components/gathering/hooks/useMakeGathering";
import { toast } from "react-toastify";
import MakingGatheringStatus from "@/components/gathering/MakeGatheringStatus";
import FullPageLoader from "@/components/shared/FullPageLoader";

export default function NewGatheringPage() {
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1);
  const reset = useResetRecoilState(newGatheringInfo);

  const [gatheringInfo, setGatheringInfo] =
    useRecoilState<lighty.CreateGatheringRequest>(newGatheringInfo);

  const { mutate: makeGathering, isPending } = useMakeGathering({
    gathering: gatheringInfo,
    onSuccess: (data: { message: string }) => {
      setStep(0);
      toast.success(data.message);
      reset();
    },
  });
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  if (isPending || step === 0) {
    return <MakingGatheringStatus isPending={isPending} />;
  }
  if (step === 1) {
    return (
      <GatheringFormContainer
        gathering={gatheringInfo}
        setGathering={setGatheringInfo}
        setStep={setStep}
      />
    );
  }

  if (step === 2) {
    return <InviteFriends setStep={setStep} />;
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
