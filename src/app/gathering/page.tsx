"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
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
import { GatheringHeader } from "@/components/layout/Header/ScrollAwareHeader";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import useGatheringAll from "@/components/gathering/hooks/useGatheringAll";
import Spacing from "@/components/shared/Spacing";
import NoGathering from "@/components/gathering/NoGathering";
import { useScrollRestorationOfRef } from "@/hooks/useScrollRestorationOfRef";

const MemoriesBottomSheet = dynamic(
  () => import("@/components/shared/BottomDrawer/MemoriesBottomSheet"),
  { ssr: false }
);

export default function GatheringPage() {
  const queryClient = useQueryClient();
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const { selectedTab, setSelectedTab } = useTabs();
  const tab1ContainerRef = useRef<HTMLDivElement>(null);
  const tab2ContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    data: ended,
    isFetching: isFetching_e,
    loadMore: loadMore_e,
  } = useGatheringEnded({ limit: 8 });

  const { data: gatheringAll, isFetching } = useGatheringAll();

  const { restoreScrollPosition: restoreTab1 } = useScrollRestorationOfRef(
    "gathering-scroll-tab1",
    tab1ContainerRef
  );

  const { restoreScrollPosition: restoreTab2 } = useScrollRestorationOfRef(
    "gathering-scroll-tab2",
    tab2ContainerRef
  );

  // 탭 변경 시 해당 탭의 스크롤 위치 복원
  useEffect(() => {
    if (selectedTab === "1" && tab1ContainerRef.current) {
      restoreTab1();
    } else if (selectedTab === "2" && tab2ContainerRef.current) {
      restoreTab2();
    }
  }, [selectedTab, restoreTab1, restoreTab2]);

  const { visible } = useScrollDirection({
    elementRef: selectedTab === "1" ? tab1ContainerRef : tab2ContainerRef,
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

  useEffect(() => {
    if (!isInitialized && (gatheringAll || ended)) {
      setIsInitialized(true);

      // 데이터 로딩 후 스크롤 위치 복원
      setTimeout(() => {
        if (selectedTab === "1" && tab1ContainerRef.current) {
          restoreTab1();
        } else if (selectedTab === "2" && tab2ContainerRef.current) {
          restoreTab2();
        }
      }, 500);
    }
  }, [
    isInitialized,
    gatheringAll,
    ended,
    selectedTab,
    restoreTab1,
    restoreTab2,
  ]);

  return (
    <div className="h-dvh pb-safe-bottom">
      <GatheringHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        className={clsx(
          "bg-base-white/80 backdrop-blur-md transition-transform duration-300 ease-in-out z-20",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      />
      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent={<></>}
        refreshingContent={
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
            className={"h-dvh overflow-y-scroll no-scrollbar pb-14 pt-safe-top"}
          >
            <Schedule expectingGatherings={gatheringAll} />
          </div>
        ) : (
          <div
            ref={tab2ContainerRef}
            className="h-dvh overflow-y-scroll no-scrollbar gathering"
          >
            {ended && ended.length > 0 && (
              <Gathering
                ended
                message
                isFetching={isFetching_e || isFetching}
                where={GatheringInWhich.GATHERING}
                gatherings={ended}
                className={"mt-safe-top pb-safe-bottom"}
              />
            )}
            {ended && ended.length === 0 && <NoGathering type="ENDED" />}
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
