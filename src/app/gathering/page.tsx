"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { GatheringInWhich } from "@/models/gathering";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import { useRecoilState, useResetRecoilState } from "recoil";
import clsx from "clsx";
import { useTabs } from "@/hooks/useTabs";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import { maxDate, minDate } from "@/constants/time";
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

const MemoriesBottomSheet = dynamic(
  () => import("@/components/shared/BottomDrawer/MemoriesBottomSheet"),
  { ssr: false }
);

export default function GatheringPage() {
  const queryClient = useQueryClient();
  const gatheringRef = useRef<HTMLDivElement>(null);
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const { selectedTab, setSelectedTab } = useTabs();
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: myGatherings, isFetching } = useGatherings({
    limit: 50,
    minDate: minDate(),
    maxDate: maxDate(),
  });
  const {
    data: ended,
    isFetching: isFetching_e,
    loadMore: loadMore_e,
  } = useGatheringEnded({ limit: 8 });

  const { visible } = useScrollDirection({
    elementRef: gatheringRef,
    selectedTab,
  });

  const handleRefresh = async () => {
    try {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["gatherings", minDate(), maxDate()],
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
    targetRef: gatheringRef,
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
          <div className="flex justify-center p-4">
            <DotSpinnerSmall />
          </div>
        }
      >
        {selectedTab === "1" ? (
          <div
            className={
              "h-full overflow-y-scroll no-scrollbar pb-10 pt-safe-top"
            }
          >
            <Schedule expectingGatherings={myGatherings} />
          </div>
        ) : (
          <div
            ref={gatheringRef}
            className={"h-full overflow-y-scroll gathering no-scrollbar pb-36"}
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
