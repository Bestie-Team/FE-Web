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
import * as lighty from "lighty-type";
import { lightyToast } from "@/utils/toast";

export default function EditingFeed() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = useMemo(() => getHeader("/feed/edit"), []);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const originalFeedValue = useRecoilValue(selectedFeedInfoAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!originalFeedValue) {
      router.replace("/feed");
      lightyToast.error("피드 정보를 찾을 수 없습니다.");
    }
  }, [originalFeedValue, router]);

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

  if (!isClient) {
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
      {isPending ? (
        <FullPageLoader />
      ) : (
        <FeedForm
          edit={editingFeed}
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
