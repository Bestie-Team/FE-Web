"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { GatheringInWhich } from "@/models/gathering";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import { useRecoilState, useResetRecoilState } from "recoil";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import { useTabs } from "@/hooks/useTabs";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import Panel from "@/components/shared/Panel/Panel";
import Flex from "@/components/shared/Flex";
import { maxDate, minDate } from "@/constants/time";
import useGatheringEnded from "@/components/gathering/hooks/useGatheringEnded";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useQueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import Schedule from "@/components/schedule/Schedule";
import NoGathering from "@/components/gathering/NoGathering";
import Gathering from "@/components/gathering/Gathering";
import Spacing from "@/components/shared/Spacing";

export default function MyGatheringPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef_m = useRef<HTMLDivElement>(null);
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

  useInfiniteScrollByRef({
    isFetching,
    loadMore,
    targetRef: containerRef_m,
  });

  useInfiniteScrollByRef({
    isFetching: isFetching_e,
    loadMore: loadMore_e,
    targetRef: containerRef,
  });

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

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
  const GatheringPageSwiper = useMemo(() => {
    return (
      <Swiper
        initialSlide={Number(selectedTab) - 1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
        slidesPerView={1}
        spaceBetween={2}
        direction="horizontal"
        className="!h-dvh w-full overflow-y-scroll no-scrollbar"
      >
        <SwiperSlide>
          <div
            ref={containerRef_m}
            className="h-full overflow-y-auto no-scrollbar pt-[107px] pb-32"
          >
            <Schedule
              expectingGatherings={myGatherings}
              isFetching={isFetching}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {(ended && ended.length < 1) || !ended ? (
            <NoGathering type="ENDED" />
          ) : (
            <div
              ref={containerRef}
              className="h-full overflow-y-auto no-scrollbar pt-[107px] pb-32"
            >
              <Spacing size={98} />
              <Gathering
                ended
                message
                isFetching={isFetching_e}
                where={GatheringInWhich.GATHERING}
                gatherings={ended}
              />
            </div>
          )}
        </SwiperSlide>
      </Swiper>
    );
  }, [
    myGatherings,
    ended,
    selectedTab,
    swiperRef,
    handleSlideChange,
    isFetching,
    isFetching_e,
  ]);

  return (
    <>
      <Header
        shadow={isPast}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />
      {(!isClient || !myGatherings || !ended) && <DotSpinner />}
      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent={
          <div className="flex justify-center pt-[96px]">
            <DotSpinner />
          </div>
        }
      >
        {GatheringPageSwiper}
      </PullToRefresh>
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </>
  );
}

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
Header.displayName = "Header";

const styles = {
  panelWrapper:
    "pt-12 fixed max-w-[430px] px-5 flex w-full bg-base-white transition-shadow duration-300",
};
