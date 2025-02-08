"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const header = useMemo(() => getHeader("/feed/edit"), []);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const originalFeedValue = useRecoilValue(selectedFeedInfoAtom);

  const [feedInfo, setFeedInfo] = useState<lighty.CreateGatheringFeedRequest>(
    () => ({
      gatheringId: originalFeedValue?.gathering?.id || "",
      content: originalFeedValue?.content || "",
      imageUrls: originalFeedValue?.images || [],
    })
  );

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
    if (!originalFeedValue) return;

    if (
      feedInfo.imageUrls.length > 0 &&
      (feedInfo.content !== originalFeedValue.content ||
        !arraysEqual(feedInfo.imageUrls, originalFeedValue.images || []))
    ) {
      editingFeed();
    }
  }, [feedInfo.imageUrls, originalFeedValue, editingFeed]);

  if (typeof window === "undefined") {
    return null;
  }

  if (!originalFeedValue) {
    return <FullPageLoader />;
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={clsx(styles.headerWrapper, "shadow-bottom")}>
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

function arraysEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
