"use client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import InviteFriends from "@/components/friends/InviteFriends";
// import GatheringFormContainer from "@/components/gathering/GatheringFormContainer";
import MakingGatheringStatus from "@/components/gathering/MakeGatheringStatus";
import FullPageLoader from "@/components/shared/FullPageLoader";
import useEditGathering from "@/components/gathering/hooks/useEditGathering";
import { lightyToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { GatheringDetailResponse } from "@/models/gathering";
import { selectedGatheringInfoAtom } from "@/atoms/gathering";

export default function GatheringEditPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1);
  //   const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const originalGatheringValue = useRecoilValue(selectedGatheringInfoAtom);
  const INITIAL_FORM_STATE: GatheringDetailResponse = {
    id: originalGatheringValue?.id || "",
    name: originalGatheringValue?.name || "",
    description: originalGatheringValue?.description || "",
    gatheringDate: originalGatheringValue?.gatheringDate || "",
    address: originalGatheringValue?.address || "",
    invitationImageUrl: originalGatheringValue?.invitationImageUrl || "",
    hostUser: { id: "", accountId: "", name: "", profileImageUrl: null },
    members: [{ id: "", accountId: "", name: "", profileImageUrl: null }],
  };
  const [gatheringInfo, setGatheringInfo] =
    useState<GatheringDetailResponse>(INITIAL_FORM_STATE);

  const { mutate: editingFeed, isPending } = useEditGathering({
    gathering: gatheringInfo,
    gatheringId: originalGatheringValue?.id || "",
    onSuccess: (data) => {
      router.replace("/gathering");
      lightyToast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      console.log(originalGatheringValue?.id);
    },
  });

  //   const { mutate: uploadImage, isPending: isUploading } =
  //     useUploadInvitationImage({
  //       file: fileToUpload as File,
  //       onSuccess: (data: { imageUrl: string; message: string }) => {
  //         console.log("FeedImageUploaded", data);
  //         if (data.imageUrl) {
  //           setGatheringInfo((prev) => ({
  //             ...prev,
  //             images: data.imageUrl,
  //           }));
  //         }
  //         setFileToUpload(null);
  //       },
  //       onError: (error) => {
  //         lightyToast.error(error.message);
  //       },
  //     });

  useEffect(() => {
    if (
      gatheringInfo.invitationImageUrl !=
        originalGatheringValue?.invitationImageUrl ||
      gatheringInfo.name != originalGatheringValue?.name ||
      gatheringInfo.description != originalGatheringValue?.description ||
      gatheringInfo.address !== originalGatheringValue.address
    ) {
      editingFeed();
    }
  }, [gatheringInfo.invitationImageUrl]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!originalGatheringValue || originalGatheringValue == null) return null;

  if (!isClient) {
    return <FullPageLoader />;
  }

  if (isPending || step === 0) {
    return <MakingGatheringStatus isPending={isPending} />;
  }
  //   if (step === 1) {
  //     return (
  //       <GatheringFormContainer
  //         type="edit"
  //         gathering={gatheringInfo}
  //         setGathering={setGatheringInfo}
  //         setStep={setStep}
  //         mutate={editingFeed}
  //       />
  //     );
  //   }

  if (step === 2) {
    return <InviteFriends setStep={setStep} type="gathering" />;
  }
}
