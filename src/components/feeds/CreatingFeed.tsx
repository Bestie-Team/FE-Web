import { useEffect, useRef, useState } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import { useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import { recordGatheringAtom } from "@/atoms/record";
import { usePathname } from "next/navigation";
import getHeader from "@/utils/getHeader";
import useGatheringDetail from "../gathering/hooks/useGatheringDetail";
import FeedForm from "./FeedForm";
import clsx from "clsx";
import useMakeGatheringFeed from "./hooks/useMakeFeed";
import useUploadFeedImages from "./hooks/useUploadFeedImages";
import FullPageLoader from "../shared/FullPageLoader";
import { useQueryClient } from "@tanstack/react-query";
import { maxDate, minDate } from "@/constants/time";
import MakingFeedStatus from "./MakingFeedStatus";
import { lightyToast } from "@/utils/toast";

const initialFeedInfo: lighty.CreateGatheringFeedRequest = {
  gatheringId: "",
  imageUrls: [],
  content: "",
};

export default function CreatingFeed() {
  const queryClient = useQueryClient();
  const [isMaking, setIsMaking] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = getHeader(pathname);
  const hasShadow = useScrollShadow(containerRef);
  const selectedGatheringId = useRecoilValue(recordGatheringAtom);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateGatheringFeedRequest>({
    ...initialFeedInfo,
    gatheringId: selectedGatheringId || "",
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
    setFilesToUpload([]);
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
    gatheringId: selectedGatheringId || "",
    onSuccess: handleImageUploadSuccess,
    onError: (error) => console.log(error),
  });

  const { data: selectedGathering } = useGatheringDetail({
    gatheringId: selectedGatheringId ? selectedGatheringId : "",
    enabled: !!selectedGatheringId,
  });

  useEffect(() => {
    if (feedInfo.imageUrls.length > 0) {
      makeGatheringFeed();
    }
  }, [feedInfo.imageUrls]);

  if (!selectedGathering || selectedGatheringId == null) return null;

  if (isMaking) return <MakingFeedStatus isPending={isPending} />;
  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={clsx(styles.headerWrapper, hasShadow ? "shadow-bottom" : "")}
      >
        {header}
      </div>
      {isPending || isUploading ? (
        <FullPageLoader />
      ) : (
        <FeedForm
          uploadImages={uploadImages}
          feedInfo={feedInfo}
          setFeedInfo={setFeedInfo}
          filesToUpload={filesToUpload}
          setFilesToUpload={setFilesToUpload}
          selectedGathering={selectedGathering}
        />
      )}
    </div>
  );
}

const styles = {
  container: "bg-base-white h-screen",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
};
