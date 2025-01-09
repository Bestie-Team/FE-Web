"use client";
import {
  gatheringAnimationStatusAtom,
  gatheringModalStateAtom,
  gatheringSelectedTabAtom,
  newGatheringInfo,
} from "@/atoms/gathering";
import FilterBar from "@/components/shared/FilterBar";
import TabBar from "@/components/shared/tab/TabBar";
import useScrollShadow from "@/hooks/useScrollShadow";
import HeaderReturner from "@/utils/headerReturner";
import clsx from "clsx";
import { Swiper as SwiperType } from "swiper";
import { Suspense, useEffect, useRef } from "react";
import React from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Gathering from "@/components/gathering/Gathering";
import MemoriesBottomSheet from "@/components/shared/bottomSheet/MemoriesBottomSheet";

export default function MyGatheringPage() {
  const resetNewGatheringInfo = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const setAnimateTab = useSetRecoilState(gatheringAnimationStatusAtom);
  const [selectedTab, setSelectedTab] = useRecoilState(
    gatheringSelectedTabAtom
  );

  const hasShadow = useScrollShadow();

  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleTabClick = (tabName: "1" | "2") => {
    if (tabName === "1") {
      handleSlideChange(0);
    }
    if (tabName === "2") {
      handleSlideChange(1);
    }
    setAnimateTab(true);
    setTimeout(() => {
      setSelectedTab(tabName);
      setAnimateTab(false);
    }, 300);
  };

  useEffect(() => {
    resetNewGatheringInfo();
  }, [resetNewGatheringInfo]);

  return (
    <div className="bg-base-white h-screen overflow-y-scroll no-scrollbar">
      <div
        className={clsx(filterWrapperStyle, hasShadow ? "shadow-bottom" : "")}
      >
        {HeaderReturner()}
        <TabBar
          atom={gatheringSelectedTabAtom}
          long="short"
          title1="예정"
          title2="완료"
          onClick={handleTabClick}
        />
        <FilterBar />
      </div>
      <Swiper
        initialSlide={Number(selectedTab) - 1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setSelectedTab(String(swiper.activeIndex + 1) as "1" | "2");
        }}
        slidesPerView={1}
        spaceBetween={2}
        direction="horizontal"
      >
        <SwiperSlide>
          <Suspense fallback={<div>로딩중</div>}>
            <Gathering which="1" />
          </Suspense>
        </SwiperSlide>
        <SwiperSlide>
          <Suspense fallback={<div>로딩중</div>}>
            <Gathering which="2" />
          </Suspense>
        </SwiperSlide>
      </Swiper>
      {modalOpen && (
        <MemoriesBottomSheet
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] pl-[20px] fixed z-10 flex flex-col w-full bg-base-white transition-shadow duration-300";
