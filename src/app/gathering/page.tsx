"use client";

import React, { useEffect } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import Gathering from "@/components/gathering/Gathering";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import { useTabs } from "@/hooks/useTabs";
import {
  Gathering as GatheringType,
  GatheringInWhich,
} from "@/models/gathering";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import Panel from "@/components/shared/Panel/Panel";
import NoGathering from "@/components/gathering/NoGathering";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import Flex from "@/components/shared/Flex";
import { scrollProgressAtom } from "@/atoms/scroll";
import Spacing from "@/components/shared/Spacing";

type TabName = "1" | "2";

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

const GatheringSwiper = ({
  myGatherings,
  selectedTab,
  swiperRef,
  onSlideChange,
}: {
  myGatherings: GatheringType[];
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
        <Spacing size={98} />
        <Gathering
          where={GatheringInWhich.GATHERING}
          which={which}
          myGatherings={myGatherings}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);

Header.displayName = "Header";

export default function MyGatheringPage() {
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();
  const scrollProgress = useRecoilValue(scrollProgressAtom);

  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();
  const { data, isFetching, isError } = useGatherings({
    cursor: minDate,
    limit: 50,
    minDate,
    maxDate,
  });
  const myGatherings = data?.gatherings;

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div>
      <Header
        shadow={scrollProgress > 0.01}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />

      {isFetching || isError ? (
        <DotSpinner width={36} height={36} />
      ) : myGatherings && myGatherings.length > 0 ? (
        <GatheringSwiper
          myGatherings={myGatherings}
          selectedTab={selectedTab}
          swiperRef={swiperRef}
          onSlideChange={(index) => handleSlideChange(index)}
        />
      ) : (
        <NoGathering />
      )}
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </div>
  );
}

const styles = {
  panelWrapper:
    "pt-12 fixed max-w-[430px] px-5 flex w-full bg-base-white transition-shadow duration-300",
};
