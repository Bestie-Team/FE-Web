"use client";
import { Suspense, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import useEditGathering from "@/components/gathering/hooks/useEditGathering";
import { lightyToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { selectedGatheringInfoAtom } from "@/atoms/gathering";
import GatheringEditForm from "@/components/gathering/GatheringEditForm";
import EditGatheringStatus from "@/components/gathering/EditGatheringStatus";
import { useQueryClient } from "@tanstack/react-query";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";

export default function GatheringEditPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const originalGatheringValue = useRecoilValue(selectedGatheringInfoAtom);
  const selectedGatheringId = originalGatheringValue?.id;

  const INITIAL_FORM_STATE: Partial<lighty.CreateGatheringRequest> = {
    name: originalGatheringValue?.name || "",
    description: originalGatheringValue?.description || "",
    gatheringDate: originalGatheringValue?.gatheringDate || "",
    address: originalGatheringValue?.address || "",
  };

  useEffect(() => {
    if (!originalGatheringValue) {
      router.replace("/gathering");
      lightyToast.error("약속 정보를 찾을 수 없습니다.");
    }
  }, [originalGatheringValue, router]);

  const [gatheringInfo, setGatheringInfo] =
    useState<Partial<lighty.CreateGatheringRequest>>(INITIAL_FORM_STATE);

  const { mutate: editingFeed, isPending } = useEditGathering({
    gathering: gatheringInfo,
    gatheringId: selectedGatheringId || "",
    onSuccess: async (data) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["gatherings/all"],
        }),
        await queryClient.invalidateQueries({
          queryKey: ["gathering/detail", selectedGatheringId],
        }),
      ]);
      router.replace("/gathering");
      lightyToast.success(data.message);
    },
    onError: (error) => {
      lightyToast.error(error.message);
    },
  });

  if (!originalGatheringValue || originalGatheringValue == null) return null;

  if (isPending || step === 0) {
    return <EditGatheringStatus isPending={isPending} setStep={setStep} />;
  }
  if (step === 1) {
    return (
      <Suspense fallback={<DotSpinner />}>
        <div className="h-dvh bg-base-white">
          <HeaderWithBtn headerLabel="약속 수정" />
          <GatheringEditForm
            type="edit"
            gathering={gatheringInfo}
            setGathering={setGatheringInfo}
            setStep={setStep}
            mutate={editingFeed}
          />
        </div>
      </Suspense>
    );
  }
  return null;
}
