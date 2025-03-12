"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import getHeader from "@/utils/getHeader";
import FeedForm from "@/components/feeds/FeedForm";
import clsx from "clsx";
import useEditFeed from "@/components/feeds/hooks/useEditFeed";
import { selectedFeedInfoAtom } from "@/atoms/feed";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/components/shared/FullPageLoader";
import * as lighty from "lighty-type";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { useQueryClient } from "@tanstack/react-query";

export default function EditingFeed() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = useMemo(() => getHeader("/feed/edit"), []);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const originalFeedValue = useRecoilValue(selectedFeedInfoAtom);

  useEffect(() => {
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
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["get/feeds/mine"] });
      router.replace("/feed");
      lightyToast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      console.log(originalFeedValue?.id);
    },
  });

  if (!originalFeedValue) {
    return null;
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={clsx(styles.headerWrapper, "shadow-bottom")}>
        {header}
      </div>
      <div className={"pt-safe-top"}>
        {isPending ? (
          <FullPageLoader />
        ) : (
          <Suspense fallback={<DotSpinner />}>
            <FeedForm
              edit={editingFeed}
              originalFeed={originalFeedValue}
              filesToUpload={filesToUpload}
              setFilesToUpload={setFilesToUpload}
              feedInfoToEdit={feedInfo}
              setFeedInfo={setFeedInfo}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: "bg-base-white h-full",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
};
