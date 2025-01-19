"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import FilterBar from "@/components/shared/FilterBar";
import Gathering from "@/components/gathering/Gathering";
import useScrollShadow from "@/hooks/useScrollShadow";
import { usePathname } from "next/navigation";
import { useRecoilState, useResetRecoilState } from "recoil";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import { useTabs } from "@/hooks/useTabs";
import { GatheringInWhich } from "@/models/gathering";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import TabBar from "@/components/shared/Panel/Panel";

export default function MyGatheringPage() {
  const pathname = usePathname();
  const header = getHeader(pathname);

  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);

  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);

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
      <GatheringSwiper
        selectedTab={selectedTab}
        swiperRef={swiperRef}
        onSlideChange={(index) => handleSlideChange(index)}
      />
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </div>
  );
}

function FilterAndTabs({
  hasShadow,
  onTabClick,
  selectedTab,
}: {
  hasShadow: boolean;
  onTabClick: (tabName: "1" | "2") => void;
  selectedTab: "1" | "2";
}) {
  return (
    <div
      className={clsx(
        "max-w-[430px] pl-[20px] flex flex-col w-full bg-base-white transition-shadow duration-300",
        hasShadow ? "shadow-bottom" : ""
      )}
    >
      <TabBar
        selectedTab={selectedTab}
        long="short"
        title1="예정"
        title2="완료"
        onClick={onTabClick}
      />
      <FilterBar />
    </div>
  );
}

function GatheringSwiper({
  selectedTab,
  swiperRef,
  onSlideChange,
}: {
  selectedTab: string;
  swiperRef: React.MutableRefObject<SwiperType | null>;
  onSlideChange: (index: number) => void;
}) {
  return (
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
  );
}
