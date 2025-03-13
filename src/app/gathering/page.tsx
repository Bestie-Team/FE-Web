"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { GatheringInWhich } from "@/models/gathering";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import { useRecoilState, useResetRecoilState } from "recoil";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import { useTabs } from "@/hooks/useTabs";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import Panel from "@/components/shared/Panel/Panel";
import Flex from "@/components/shared/Flex";
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
import { useReactNativeWebView } from "@/components/shared/providers/ReactNativeWebViewProvider";

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
  const { isReactNativeWebView } = useReactNativeWebView();

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
    selectedTab,
  });

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="h-dvh">
      <Header>
        <Panel
          selectedTab={selectedTab}
          long="short"
          title1="예정"
          title2="완료"
          onClick={setSelectedTab}
        />
      </Header>
      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent={
          <div className="flex justify-center pt-[107px]">
            <div className="p-4">
              <DotSpinnerSmall />
            </div>
          </div>
        }
      >
        {selectedTab === "1" ? (
          <div
            className={clsx(
              "mt-[107px] h-dvh overflow-y-scroll no-scrollbar pb-10",
              isReactNativeWebView ? "pt-safe-top" : ""
            )}
          >
            <Schedule expectingGatherings={myGatherings} />
          </div>
        ) : (
          <div
            ref={gatheringRef}
            className={clsx(
              "h-full overflow-y-scroll gathering no-scrollbar pb-36 pt-[87px]"
            )}
          >
            <Gathering
              ended
              message
              isFetching={isFetching_e || isFetching}
              where={GatheringInWhich.GATHERING}
              gatherings={ended || []}
              className={
                isReactNativeWebView ? "mt-safe-top pb-safe-bottom" : ""
              }
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

const Header = React.memo(({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {getHeader("/gathering")}
      <Flex
        id="filter"
        justify="space-between"
        className={clsx(styles.panelWrapper, "pt-safe-top")}
      >
        {children}
      </Flex>
    </>
  );
});

Header.displayName = "Header";

const styles = {
  panelWrapper:
    "mt-12 fixed max-w-[430px] px-5 flex w-full bg-base-white transition-shadow duration-300",
};
