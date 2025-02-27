"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import { useRecoilState, useResetRecoilState } from "recoil";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import { useTabs } from "@/hooks/useTabs";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import Panel from "@/components/shared/Panel/Panel";
import Flex from "@/components/shared/Flex";
import FullPageLoader from "@/components/shared/FullPageLoader";
import dynamic from "next/dynamic";
import { maxDate, minDate } from "@/constants/time";
import useGatheringEnded from "@/components/gathering/hooks/useGatheringEnded";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useQueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";

const Header = React.memo(
  ({
    shadow,
    selectedTab,
    handleTabClick,
  }: {
    shadow: boolean;
    selectedTab: "1" | "2";
    handleTabClick: (tab: "1" | "2") => void;
  }) => {
    return (
      <>
        {getHeader("/gathering")}
        <Flex
          id="filter"
          justify="space-between"
          className={clsx(styles.panelWrapper, shadow && "shadow-bottom")}
        >
          <Panel
            selectedTab={selectedTab}
            long="short"
            title1="예정"
            title2="완료"
            onClick={handleTabClick}
          />
        </Flex>
      </>
    );
  }
);

const GatheringPageSwiper = dynamic(
  () => import("../../components/gathering/GatheringPageSwiper"),
  {
    ssr: false,
  }
);

Header.displayName = "Header";

export default function MyGatheringPage() {
  const isPast = useScrollThreshold();
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();

  const {
    data: myGatherings,
    isFetching,
    loadMore: loadMore,
  } = useGatherings({
    limit: 50,
    minDate: minDate(),
    maxDate: maxDate(),
  });

  const {
    data: ended,
    isFetching: isFetching_e,
    loadMore: loadMore_e,
  } = useGatheringEnded({ limit: 8 });

  useInfiniteScroll({
    isFetching: isFetching_e,
    loadMore: loadMore_e,
  });

  useInfiniteScroll({
    isFetching,
    loadMore,
  });

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  const handleRefresh = async () => {
    try {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["gatherings"],
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

  return (
    <div className="min-h-dvh no-scrollbar">
      <Header
        shadow={isPast}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />
      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent={<></>}
        refreshingContent={
          <div className="flex justify-center pt-[96px]">
            <DotSpinnerSmall />
          </div>
        }
      >
        <GatheringPageSwiper
          isFetching={isFetching}
          isFetching_e={isFetching_e}
          expectingGatherings={myGatherings}
          endedGatherings={ended}
          selectedTab={selectedTab}
          swiperRef={swiperRef}
          onSlideChange={(index) => handleSlideChange(index)}
        />
      </PullToRefresh>
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </div>
  );
}

const styles = {
  panelWrapper:
    "pt-12 fixed max-w-[430px] px-5 flex w-full bg-base-white transition-shadow duration-300",
};
