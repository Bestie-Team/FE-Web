"use client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import FullPageLoader from "@/components/shared/FullPageLoader";
import useEditGathering from "@/components/gathering/hooks/useEditGathering";
import { lightyToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { selectedGatheringInfoAtom } from "@/atoms/gathering";
import GatheringEditForm from "@/components/gathering/GatheringEditForm";
import EditGatheringStatus from "@/components/gathering/EditGatheringStatus";
import { useQueryClient } from "@tanstack/react-query";

export default function GatheringEditPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);
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
    setIsClient(true);

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
      router.replace("/gathering");
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["gatherings"],
      });
    },
    onError: (error) => {
      lightyToast.error(error.message);
    },
  });

  if (!originalGatheringValue || originalGatheringValue == null) return null;

  if (!isClient) {
    return <FullPageLoader />;
  }

  if (isPending || step === 0) {
    return <EditGatheringStatus isPending={isPending} />;
  }
  if (step === 1) {
    return (
      <GatheringEditForm
        type="edit"
        gathering={gatheringInfo}
        setGathering={setGatheringInfo}
        setStep={setStep}
        mutate={editingFeed}
      />
    );
  }
}
