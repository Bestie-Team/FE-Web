"use client";
import FilterBar from "@/components/shared/FilterBar";
import NavBar from "@/components/shared/NavBar";
import TabBar from "@/components/shared/tab/TabBar";
import Feed from "../../components/feed/Feed";
import CommentContainer from "@/components/shared/comments/CommentContainer";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  animationStatusAtom,
  commentModalStateAtom,
  feedSelectedTabAtom,
} from "@/atoms/feed";
import BottomSheet from "@/components/shared/bottomSheet/BottomSheet";
import { recordModalStateAtom } from "@/atoms/record";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";
import HeaderReturner from "@/utils/HeaderReturner";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";

export default function FeedPage() {
  const hasShadow = useScrollShadow();
  const swiperRef = useRef<any>(null);
  const setSelectedTab = useSetRecoilState(feedSelectedTabAtom);
  const setAnimateTab = useSetRecoilState(animationStatusAtom);
  const [commentModalOpen, setCommentModalOpen] = useRecoilState(
    commentModalStateAtom
  );
  const [recordModalOpen, setRecordModalOpen] =
    useRecoilState(recordModalStateAtom);

  const handleSlideChange = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // 원하는 슬라이드로 이동
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

  return (
    <div className="relative">
      <div
        className={clsx(filterWrapperStyle, hasShadow ? "shadow-bottom" : "")}
      >
        {HeaderReturner()}
        <TabBar
          atom={feedSelectedTabAtom}
          long="medium"
          title1="전체"
          title2="나의 피드"
          onClick={handleTabClick}
        />
        <FilterBar />
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setSelectedTab(String(swiper.activeIndex + 1) as "1" | "2");
        }}
        slidesPerView={1}
        spaceBetween={2}
        className="custom-swiper w-full"
      >
        <SwiperSlide>
          <Feed which="1" />
        </SwiperSlide>
        <SwiperSlide>
          <Feed which="2" />
        </SwiperSlide>
      </Swiper>
      <NavBar />
      {recordModalOpen ? (
        <BottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      ) : null}
      {commentModalOpen ? (
        <CommentContainer
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
