import { useEffect, useState } from "react";
import * as lighty from "lighty-type";
import { usePathname } from "next/navigation";
import getHeader from "@/utils/getHeader";
import FeedForm from "./FeedForm";
import clsx from "clsx";
import { toast } from "react-toastify";
import useUploadFeedImages from "./hooks/useUploadFeedImages";
import FullPageLoader from "../shared/FullPageLoader";
import { useQueryClient } from "@tanstack/react-query";
import { maxDate, minDate } from "@/constants/time";
import useMakeFriendsFeed from "./hooks/useMakeFriendsFeed";
import { useRecoilValue } from "recoil";
import { friendsToShareAtom } from "@/atoms/record";
import MakingFeedStatus from "./MakingFeedStatus";

export default function CreatingFeedNoGathering() {
  const queryClient = useQueryClient();
  const [isMaking, setIsMaking] = useState(false);
  const pathname = usePathname();
  const header = getHeader(pathname);
  const friendsToShare = useRecoilValue(friendsToShareAtom);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateFriendFeedRequest>({
    friendIds: friendsToShare.map((friend) => friend.id),
    imageUrls: [],
    content: "",
  });
  const handleFeedSuccess = async (data: { message: string }) => {
    setIsMaking(true);

    await queryClient.invalidateQueries({
      queryKey: [
        "get/feeds/mine",
        {
          order: "DESC",
          minDate: minDate(),
          maxDate: maxDate(),
          limit: 10,
        },
      ],
    });

    toast.success(data.message);
  };

  const { mutate: makeFriendsFeed, isPending } = useMakeFriendsFeed({
    feedRequest: feedInfo,
    onSuccess: handleFeedSuccess,
    onError: (error) => {
      toast.error(error.message);
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

  if (isMaking) return <MakingFeedStatus isPending={isPending} />;

  return (
    <div className={styles.container}>
      <div className={clsx(styles.headerWrapper)}>{header}</div>
      {isPending || isUploading ? (
        <FullPageLoader />
      ) : (
        <FeedForm
          uploadImages={uploadImages}
          feedInfo={feedInfo}
          setFeedInfo={setFeedInfo}
          filesToUpload={filesToUpload}
          setFilesToUpload={setFilesToUpload}
        />
      )}
    </div>
  );
}

const styles = {
  container: "bg-base-white h-screen",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
};
