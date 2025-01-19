"use client";
import FilterBar from "@/components/shared/FilterBar";
import TabBar from "@/components/shared/Tab/TabBar";
import Feed from "@/components/feed/Feed";
import "swiper/css";
import "swiper/css/navigation";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { useRecoilState } from "recoil";
import { commentModalStateAtom } from "@/atoms/feed";
import { recordModalStateAtom } from "@/atoms/record";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import MemoriesBottomSheet from "@/components/shared/BottomSheet/MemoriesBottomSheet";
import { usePathname } from "next/navigation";
import getHeader from "@/utils/getHeader";
import useFeedAll from "@/components/feeds/hooks/useFeedAll";
import useFeedMine from "@/components/feeds/hooks/useFeedMine";
import { useTabs } from "@/hooks/useTabs";

export default function FeedPage() {
  const [selectedFeed, setSelectedFeed] = useState<string>("");
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const header = getHeader(pathname);
  const hasShadow = useScrollShadow(containerRef);
  const [commentModalOpen, setCommentModalOpen] = useRecoilState(
    commentModalStateAtom
  );
  const [recordModalOpen, setRecordModalOpen] =
    useRecoilState(recordModalStateAtom);
  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();
  const { data: feedAll } = useFeedAll({
    order: "DESC",
    minDate,
    maxDate,
    limit: 10,
  });

  const { data: everyFeed } = useFeedMine({
    order: "DESC",
    minDate,
    maxDate,
    limit: 10,
  });

  return (
    <div
      id="scrollable-container"
      ref={containerRef}
      className="relative overflow-y-scroll no-scrollbar pt-[48px]"
    >
      {header}
      <div
        className={clsx(filterWrapperStyle, hasShadow ? "shadow-bottom" : "")}
      >
        <TabBar
          selectedTab={selectedTab}
          long="medium"
          title1="전체"
          title2="나의 피드"
          onClick={handleTabClick}
        />
        <FilterBar />
      </div>
      {feedAll ? (
        <Swiper
          initialSlide={Number(selectedTab) - 1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            handleSlideChange(swiper.activeIndex);
          }}
          slidesPerView={1}
          spaceBetween={2}
          className="custom-swiper w-full"
        >
          <SwiperSlide>
            <Feed
              type="전체"
              feeds={feedAll.feeds}
              onClickFeed={setSelectedFeed}
            />
          </SwiperSlide>
          {everyFeed ? (
            <SwiperSlide>
              <Feed
                type="나의피드"
                feeds={everyFeed.feeds}
                onClickFeed={setSelectedFeed}
              />
            </SwiperSlide>
          ) : null}
        </Swiper>
      ) : null}
      {recordModalOpen ? (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      ) : null}
      {commentModalOpen ? (
        <CommentContainer
          selectedFeedId={selectedFeed}
          onClose={() => {
            setCommentModalOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] pl-[20px] fixed z-10 flex flex-col w-full bg-base-white transition-shadow duration-300";
