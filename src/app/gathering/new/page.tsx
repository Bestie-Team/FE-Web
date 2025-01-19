"use client";
import { newGatheringInfo } from "@/atoms/gathering";
import { useState } from "react";
import { useRecoilState } from "recoil";
import MakingInvitation from "@/components/gathering/MakingInvitation";
import StepToInvitation from "@/components/groups/StepToInvitation";
import * as lighty from "lighty-type";
import InviteFriends from "@/components/friends/InviteFriends";
import GatheringFormContainer from "@/components/gathering/GatheringFormContainer";

export default function NewGatheringPage() {
  const [step, setStep] = useState(1);

  const [gatheringInfo, setGatheringInfo] =
    useRecoilState<lighty.CreateGatheringRequest>(newGatheringInfo);

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
      />
    );
  }
  return (
    <GatheringFormContainer
      gathering={gatheringInfo}
      setGathering={setGatheringInfo}
      setStep={setStep}
    />
  );
}
