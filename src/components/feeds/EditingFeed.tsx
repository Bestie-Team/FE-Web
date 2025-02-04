"use client";
import { useEffect, useRef, useState } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import { useRecoilValue } from "recoil";
import getHeader from "@/utils/getHeader";
import FeedForm from "./FeedForm";
import clsx from "clsx";
import useEditFeed from "./hooks/useEditFeed";
import { selectedFeedInfoAtom } from "@/atoms/feed";
import { useRouter } from "next/navigation";
import FullPageLoader from "../shared/FullPageLoader";
import useUploadFeedImages from "./hooks/useUploadFeedImages";
import * as lighty from "lighty-type";
import { lightyToast } from "@/utils/toast";

export default function EditingFeed() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = getHeader("/feed/edit");
  const hasShadow = useScrollShadow(containerRef);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const originalFeedValue = useRecoilValue(selectedFeedInfoAtom);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateGatheringFeedRequest>({
    gatheringId: "",
    content: originalFeedValue?.content || "",
    imageUrls: originalFeedValue?.images || [],
  });

  const { mutate: editingFeed, isPending } = useEditFeed({
    content: feedInfo.content,
    feedId: originalFeedValue?.id || "",
    onSuccess: (data) => {
      router.replace("/feed");
      lightyToast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      console.log(originalFeedValue?.id);
    },
  });

  const { mutate: uploadImages, isPending: isUploading } = useUploadFeedImages({
    files: filesToUpload,
    gatheringId: originalFeedValue?.gathering?.id || "",
    onSuccess: (data: { imageUrls: string[]; message: string }) => {
      console.log("FeedImageUploaded", data);
      if (data.imageUrls) {
        setFeedInfo((prev) => ({
          ...prev,
          images: data.imageUrls,
        }));
      }
      setFilesToUpload([]);
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (
      feedInfo.imageUrls.length > 0 &&
      (feedInfo.content != originalFeedValue?.content ||
        feedInfo.imageUrls != originalFeedValue?.images)
    ) {
      editingFeed();
    }
  }, [feedInfo.imageUrls]);

  if (!originalFeedValue || originalFeedValue == null) return null;

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
          edit={uploadImages}
          originalFeed={originalFeedValue}
          filesToUpload={filesToUpload}
          setFilesToUpload={setFilesToUpload}
          feedInfoToEdit={feedInfo}
          setFeedInfo={setFeedInfo}
        />
      )}
    </div>
  );
}
const styles = {
  container: "bg-base-white h-full",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
};
