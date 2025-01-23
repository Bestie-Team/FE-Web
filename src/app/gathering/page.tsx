"use client";

import React, { Suspense, useEffect, useRef, memo } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import FilterBar from "@/components/shared/FilterBar";
import Gathering from "@/components/gathering/Gathering";
import useScrollShadow from "@/hooks/useScrollShadow";
import { useRecoilState, useResetRecoilState } from "recoil";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import { useTabs } from "@/hooks/useTabs";
import { GatheringInWhich } from "@/models/gathering";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import Panel from "@/components/shared/Panel/Panel";

type TabName = "1" | "2";

type FilterAndTabsProps = {
  hasShadow: boolean;
  onTabClick: (tabName: TabName) => void;
  selectedTab: TabName;
};

export default function MyGatheringPage() {
  const header = getHeader("/gathering");
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);

  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();
  const { data } = useGatherings({
    cursor: minDate,
    limit: 5,
    minDate,
    maxDate,
  });
  const myGatherings = data?.gatherings;

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div
      ref={containerRef}
      className="bg-base-white h-screen overflow-y-scroll no-scrollbar pt-[48px]"
    >
      {header}
      <FilterAndTabs
        hasShadow={hasShadow}
        onTabClick={handleTabClick}
        selectedTab={selectedTab}
      />
      {myGatherings?.length ? (
        <GatheringSwiper
          selectedTab={selectedTab}
          swiperRef={swiperRef}
          onSlideChange={(index) => handleSlideChange(index)}
        />
      ) : (
        <div>아직 약속이 없네요!</div>
      )}
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </div>
  );
}

const FilterAndTabs = memo(
  ({ hasShadow, onTabClick, selectedTab }: FilterAndTabsProps) => (
    <div
      className={clsx(
        "max-w-[430px] pl-[20px] flex flex-col w-full bg-base-white transition-shadow duration-300",
        hasShadow && "shadow-bottom"
      )}
    >
      <Panel
        selectedTab={selectedTab}
        long="short"
        title1="예정"
        title2="완료"
        onClick={onTabClick}
      />
      <FilterBar />
    </div>
  )
);

const GatheringSwiper = memo(
  ({
    selectedTab,
    swiperRef,
    onSlideChange,
  }: {
    selectedTab: TabName;
    swiperRef: React.MutableRefObject<SwiperType | null>;
    onSlideChange: (index: number) => void;
  }) => (
    <Swiper
      initialSlide={Number(selectedTab) - 1}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
      slidesPerView={1}
      spaceBetween={2}
      direction="horizontal"
    >
      {["예정", "완료"].map((which) => (
        <SwiperSlide key={which}>
          <Suspense fallback={<div>로딩중</div>}>
            <Gathering where={GatheringInWhich.GATHERING} which={which} />
          </Suspense>
        </SwiperSlide>
      ))}
    </Swiper>
  )
);

FilterAndTabs.displayName = "FilterAndTabs";
GatheringSwiper.displayName = "GatheringSwiper";
