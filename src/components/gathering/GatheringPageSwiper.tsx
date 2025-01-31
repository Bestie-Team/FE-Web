import React from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "../shared/Spacing";
import Gathering from "./Gathering";
import {
  Gathering as GatheringType,
  GatheringInWhich,
} from "@/models/gathering";

type TabName = "1" | "2";

const GatheringPageSwiper = React.memo(
  ({
    expectingGatherings,
    endedGatherings,
    selectedTab,
    swiperRef,
    onSlideChange,
  }: {
    expectingGatherings: GatheringType[];
    endedGatherings: GatheringType[];
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
      <SwiperSlide>
        <Spacing size={98} />
        <Gathering
          where={GatheringInWhich.GATHERING}
          gatherings={expectingGatherings}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Spacing size={98} />
        <Gathering
          where={GatheringInWhich.GATHERING}
          gatherings={endedGatherings}
        />
      </SwiperSlide>
    </Swiper>
  )
);
GatheringPageSwiper.displayName = "GatheringPageSwiper";

export default GatheringPageSwiper;
