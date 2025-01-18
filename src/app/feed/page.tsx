"use client";
import FilterBar from "@/components/shared/FilterBar";
import TabBar from "@/components/shared/tab/TabBar";
import Feed from "@/components/feed/Feed";
import "swiper/css";
import "swiper/css/navigation";
import CommentContainer from "@/components/shared/comments/CommentContainer";
import { useRecoilState } from "recoil";
import { commentModalStateAtom } from "@/atoms/feed";
import { recordModalStateAtom } from "@/atoms/record";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import MemoriesBottomSheet from "@/components/shared/bottomSheet/MemoriesBottomSheet";
import { usePathname } from "next/navigation";
import getHeader from "@/utils/getHeader";
import { useFeedTabs } from "@/hooks/useFeedTabs";
import useFeed from "@/components/feeds/hooks/useFeed";

export default function FeedPage() {
  const [selectedFeed, setSelectedFeed] = useState<string>("");
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useFeedTabs();
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
  const { data: feed } = useFeed({
    order: "DESC",
    minDate,
    maxDate,
    limit: 10,
  });

  return (
    <div
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
      {feed ? (
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
            <Feed which="1" feeds={feed?.feeds} onClickFeed={setSelectedFeed} />
          </SwiperSlide>
          {/* <SwiperSlide>
            <Feed which="2" />
          </SwiperSlide> */}
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
