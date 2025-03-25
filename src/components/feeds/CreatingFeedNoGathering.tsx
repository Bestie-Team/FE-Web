import { useEffect, useState } from "react";
import * as lighty from "lighty-type";
import { useRouter } from "next/navigation";
import FeedForm from "./FeedForm";
import useUploadFeedImages from "./hooks/useUploadFeedImages";
import { useQueryClient } from "@tanstack/react-query";
import useMakeFriendsFeed from "./hooks/useMakeFriendsFeed";
import { useRecoilValue } from "recoil";
import { friendsToShareAtom } from "@/atoms/record";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "../shared/Spinner/DotSpinner";

export default function CreatingFeedNoGathering() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const friendsToShare = useRecoilValue(friendsToShareAtom);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateFriendFeedRequest>({
    friendIds: friendsToShare.map((friend) => friend.id),
    imageUrls: [],
    content: "",
  });

  const handleFeedSuccess = async () => {
    router.replace("/feed");
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/mine"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["user/detail"],
      }),
    ]);
  };

  const { mutate: makeFriendsFeed, isPending } = useMakeFriendsFeed({
    feedRequest: feedInfo,
    onSuccess: handleFeedSuccess,
    onError: (error) => {
      lightyToast.error(error.message);
    },
  });

  const { mutate: uploadImages, isPending: isUploading } = useUploadFeedImages({
    files: filesToUpload,
    gatheringId: "",
    onSuccess: (data: { imageUrls: string[]; message: string }) => {
      console.log("FeedImageUploaded", data);
      if (setFeedInfo) {
        setFeedInfo((prev) => ({
          ...(prev as lighty.CreateFriendFeedRequest),
          imageUrls: data.imageUrls,
        }));
      }
    },
    onError: (error) => lightyToast.error(error.message),
  });

  useEffect(() => {
    if (feedInfo.imageUrls.length > 0) {
      makeFriendsFeed();
    }
  }, [feedInfo.imageUrls]);

  return (
    <div className={styles.container}>
      <FeedForm
        uploadImages={uploadImages}
        feedInfo={feedInfo}
        setFeedInfo={setFeedInfo}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
      />
      {(isPending || isUploading) && <DotSpinner />}
    </div>
  );
}

const styles = {
  container: "relative bg-base-white",
};
