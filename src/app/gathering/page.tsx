"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { GatheringInWhich } from "@/models/gathering";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import { useRecoilState, useResetRecoilState } from "recoil";
import clsx from "clsx";
import { useTabs } from "@/hooks/useTabs";
import useGatheringEnded from "@/components/gathering/hooks/useGatheringEnded";
import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useQueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";
import Schedule from "@/components/schedule/Schedule";
import Gathering from "@/components/gathering/Gathering";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import dynamic from "next/dynamic";
import TabParamHandler from "@/components/shared/TabParamHandler";
import { GatheringHeader } from "@/components/shared/Header/ScrollAwareHeader";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import useGatheringAll from "@/components/gathering/hooks/useGatheringAll";
import Spacing from "@/components/shared/Spacing";

const MemoriesBottomSheet = dynamic(
  () => import("@/components/shared/BottomDrawer/MemoriesBottomSheet"),
  { ssr: false }
);

export default function GatheringPage() {
  const queryClient = useQueryClient();
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const { selectedTab, setSelectedTab } = useTabs();
  const containerRef = useRef<HTMLDivElement>(null);
  const tab1ContainerRef = useRef<HTMLDivElement>(null);
  const tab2ContainerRef = useRef<HTMLDivElement>(null);
  const { data: gatheringAll, isFetching } = useGatheringAll();

  const {
    data: ended,
    isFetching: isFetching_e,
    loadMore: loadMore_e,
  } = useGatheringEnded({ limit: 8 });

  const { visible } = useScrollDirection({
    elementRef: containerRef,
    selectedTab,
  });

  const handleRefresh = async () => {
    try {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["gatherings/all"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["gatherings/ended"],
        }),
      ]);
      return true;
    } catch (error) {
      console.error("Refresh failed:", error);
      lightyToast.error("새로고침에 실패했어요");
      return false;
    }
  };

  useInfiniteScrollByRef({
    isFetching: isFetching_e,
    loadMore: loadMore_e,
    targetRef: tab2ContainerRef,
    selectedTab,
  });

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="h-dvh" ref={containerRef}>
      <GatheringHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        className={clsx(
          "pt-safe-top bg-base-white/80 backdrop-blur-md transition-transform duration-300 ease-in-out z-20",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      />
      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent={
          <div className="flex justify-center pt-safe-top">
            <div className="p-2">
              <Spacing size={90} />
              <DotSpinnerSmall />
            </div>
          </div>
        }
      >
        {selectedTab === "1" ? (
          <div
            ref={tab1ContainerRef}
            className={
              "h-full overflow-y-scroll no-scrollbar pb-10 pt-safe-top"
            }
          >
            <Schedule expectingGatherings={gatheringAll} />
          </div>
        ) : (
          <div
            ref={tab2ContainerRef}
            className={"h-full overflow-y-scroll gathering no-scrollbar"}
          >
            <Gathering
              ended
              message
              isFetching={isFetching_e || isFetching}
              where={GatheringInWhich.GATHERING}
              gatherings={ended || []}
              className={"mt-safe-top pb-safe-bottom"}
            />
          </div>
        )}
      </PullToRefresh>
      <Suspense>
        <TabParamHandler
          setSelectedTab={setSelectedTab}
          pathToReplace="/gathering"
        />
      </Suspense>
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </div>
  );
}
