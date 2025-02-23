import { useEffect, useMemo, useState } from "react";
import * as lighty from "lighty-type";
import { usePathname, useRouter } from "next/navigation";
import getHeader from "@/utils/getHeader";
import FeedForm from "./FeedForm";
import clsx from "clsx";
import useUploadFeedImages from "./hooks/useUploadFeedImages";
import FullPageLoader from "../shared/FullPageLoader";
import { useQueryClient } from "@tanstack/react-query";
import { maxDate, minDate } from "@/constants/time";
import useMakeFriendsFeed from "./hooks/useMakeFriendsFeed";
import { useRecoilValue } from "recoil";
import { friendsToShareAtom } from "@/atoms/record";
import { lightyToast } from "@/utils/toast";

export default function CreatingFeedNoGathering({
  setStep,
}: {
  setStep: (num: number) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const header = useMemo(() => getHeader(pathname), []);
  const friendsToShare = useRecoilValue(friendsToShareAtom);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateFriendFeedRequest>({
    friendIds: friendsToShare.map((friend) => friend.id),
    imageUrls: [],
    content: "",
  });
  const handleFeedSuccess = async (data: { message: string }) => {
    setStep(0);
    router.replace("/feed?tab=2");
    await queryClient.invalidateQueries({
      queryKey: ["get/feeds/mine"],
    });

    lightyToast.success(data.message);
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
      setFilesToUpload([]);
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (feedInfo.imageUrls.length > 0) {
      makeFriendsFeed();
    }
  }, [feedInfo.imageUrls]);

  if (isPending || isUploading) return <FullPageLoader height="100dvh" />;

  return (
    <div className={styles.container}>
      <div className={clsx(styles.headerWrapper)}>{header}</div>

      <FeedForm
        uploadImages={uploadImages}
        feedInfo={feedInfo}
        setFeedInfo={setFeedInfo}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
      />
    </div>
  );
}

const styles = {
  container: "bg-base-white h-dvh",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
};
