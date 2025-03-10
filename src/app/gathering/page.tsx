"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
import Gathering from "@/components/gathering/Gathering";
import { useRouter, useSearchParams } from "next/navigation";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";

export default function GatheringPage() {
  const gatheringRef = useRef<HTMLDivElement>(null);
  // const router = useRouter();
  const isPast = useScrollThreshold();
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const {
    selectedTab,
    setSelectedTab,
    handleTabClick,
    handleSlideChange,
    swiperRef,
  } = useTabs();

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

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  // useEffect(() => {
  //   if (ended && ended.length > 0) {
  //     ended.slice(6).forEach((end) => {
  //       router.prefetch(`/gathering/${end.id}`);
  //       console.log(end.name);
  //     });
  //   }
  // }, [router]);

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

  const TabParamHandler = ({
    setSelectedTab,
  }: {
    setSelectedTab: (num: "1" | "2") => void;
  }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
      const tabParam = searchParams?.get("tab");
      if (tabParam === "1" || tabParam === "2") {
        setSelectedTab(tabParam);
        router.replace("/gathering");
      }
    }, [searchParams, setSelectedTab]);

    return null;
  };

  useInfiniteScrollByRef({
    isFetching: isFetching_e,
    loadMore: loadMore_e,
    targetRef: gatheringRef,
    selectedTab,
  });

  const GatheringPageSwiper = useMemo(() => {
    return (
      <div className="h-dvh">
        <Swiper
          key={selectedTab}
          initialSlide={Number(selectedTab) - 1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
          slidesPerView={1}
          spaceBetween={2}
          direction="horizontal"
          className="!h-dvh w-full"
        >
          <SwiperSlide>
            <div className="pt-[107px] h-full overflow-y-scroll no-scrollbar pb-10">
              <Schedule expectingGatherings={myGatherings} />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!h-dvh">
            <div
              ref={gatheringRef}
              className="h-full overflow-y-scroll gathering no-scrollbar pb-36 pt-[87px]"
            >
              <Gathering
                ended
                message
                isFetching={isFetching_e || isFetching}
                where={GatheringInWhich.GATHERING}
                gatherings={ended || []}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  }, [myGatherings, ended, selectedTab, swiperRef, handleSlideChange]);

  return (
    <div className="h-dvh">
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
            <DotSpinnerSmall />
          </div>
        }
      >
        {GatheringPageSwiper}
      </PullToRefresh>
      <Suspense fallback={null}>
        <TabParamHandler setSelectedTab={setSelectedTab} />
      </Suspense>
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </div>
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
