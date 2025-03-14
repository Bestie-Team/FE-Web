"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import FeedForm from "@/components/feeds/FeedForm";
import useEditFeed from "@/components/feeds/hooks/useEditFeed";
import { selectedFeedInfoAtom } from "@/atoms/feed";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/components/shared/FullPageLoader";
import * as lighty from "lighty-type";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { useQueryClient } from "@tanstack/react-query";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";

export default function EditingFeed() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
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
    <div className={"bg-base-white h-dvh"} ref={containerRef}>
      <HeaderWithBtn headerLabel="피드 수정" />
      <div className="pt-safe-top">
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
