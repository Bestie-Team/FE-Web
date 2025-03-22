import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import { recordGatheringAtom } from "@/atoms/record";
import { useRouter } from "next/navigation";
import useGatheringDetail from "../gathering/hooks/useGatheringDetail";
import FeedForm from "./FeedForm";
import useMakeGatheringFeed from "./hooks/useMakeFeed";
import useUploadFeedImages from "./hooks/useUploadFeedImages";
import { useQueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "../shared/Spinner/DotSpinner";

const initialFeedInfo: lighty.CreateGatheringFeedRequest = {
  gatheringId: "",
  imageUrls: [],
  content: "",
};

export default function CreatingFeed() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = useRecoilValue(recordGatheringAtom);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateGatheringFeedRequest>({
    ...initialFeedInfo,
    gatheringId: id || "",
  });

  const handleFeedSuccess = async (data: { message: string }) => {
    router.replace("/feed");
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["gatherings/no-feed"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/mine"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["user/detail"],
      }),
    ]);

    lightyToast.success(data.message);
  };

  const handleImageUploadSuccess = (data: {
    imageUrls: string[];
    message: string;
  }) => {
    setFeedInfo((prev) => ({
      ...prev,
      imageUrls: data.imageUrls,
    }));
  };

  const { mutate: makeGatheringFeed, isPending } = useMakeGatheringFeed({
    feedRequest: feedInfo,
    onSuccess: handleFeedSuccess,
    onError: (error) => {
      lightyToast.error(error.message);
    },
  });

  const { mutate: uploadImages, isPending: isUploading } = useUploadFeedImages({
    files: filesToUpload,
    gatheringId: id || "",
    onSuccess: handleImageUploadSuccess,
    onError: (error) => {
      lightyToast.error(error.message);
    },
  });

  const { data: selectedGathering } = useGatheringDetail({
    id,
  });

  useEffect(() => {
    if (feedInfo.imageUrls.length > 0) {
      makeGatheringFeed();
    }
  }, [feedInfo.imageUrls, id]);

  if (!selectedGathering || id == "") return;

  return (
    <div className="relative">
      <FeedForm
        uploadImages={uploadImages}
        feedInfo={feedInfo}
        setFeedInfo={setFeedInfo}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
        selectedGathering={selectedGathering}
      />
      {(isPending || isUploading) && <DotSpinner />}
    </div>
  );
}
