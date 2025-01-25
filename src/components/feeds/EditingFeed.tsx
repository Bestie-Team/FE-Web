"use client";
import { useEffect, useRef, useState } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import { useRecoilValue } from "recoil";
import getHeader from "@/utils/getHeader";
import { toast } from "react-toastify";
import FeedForm from "./FeedForm";
import clsx from "clsx";
import useEditFeed from "./hooks/useEditFeed";
import { selectedFeedInfoAtom } from "@/atoms/feed";
import { useRouter } from "next/navigation";
import FullPageLoader from "../shared/FullPageLoader";
import useUploadFeedImages from "./hooks/useUploadFeedImages";

export default function EditingFeed() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = getHeader("/feed/edit");
  const hasShadow = useScrollShadow(containerRef);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const selectedFeedInfo = useRecoilValue(selectedFeedInfoAtom);
  const [feedInfo, setFeedInfo] = useState<{
    content: string;
    images: string[];
  }>({
    content: selectedFeedInfo?.content || "",
    images: selectedFeedInfo?.images || [],
  });

  const { mutate: editingFeed, isPending } = useEditFeed({
    content: feedInfo.content,
    feedId: selectedFeedInfo?.id || "",
    onSuccess: (data) => {
      toast.success(data.message);
      router.replace("/feed");
    },
    onError: (error) => {
      console.log(error);
      console.log(selectedFeedInfo?.id);
    },
  });

  const { mutate: uploadImages, isPending: isUploading } = useUploadFeedImages({
    files: filesToUpload,
    gatheringId: selectedFeedInfo?.gathering?.id || "",
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
    if (feedInfo.images.length > 0) {
      editingFeed();
    }
  }, [feedInfo.images]);

  if (!selectedFeedInfo || selectedFeedInfo == null) return null;

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={clsx(styles.headerWrapper, hasShadow ? "shadow-bottom" : "")}
      >
        {header}
      </div>
      <FeedForm
        edit={uploadImages}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
        feedInfoToEdit={feedInfo}
        setFeedInfoToEdit={setFeedInfo}
      />
      {(isPending || isUploading) && <FullPageLoader />}
    </div>
  );
}
const styles = {
  container: "bg-base-white h-screen",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
};
