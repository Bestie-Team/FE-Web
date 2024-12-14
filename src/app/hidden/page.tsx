"use client";
import FilterBar from "@/components/shared/FilterBar";
import NavBar from "@/components/shared/NavBar";
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
import HeaderReturner from "@/utils/headerReturner";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import TabButton from "@/components/shared/tab/TabButton";

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
        <div className="px-[20px]">
          <div
            style={{
              backgroundColor: "#fff",
            }}
            className={tabContainerStyle}
          >
            <div className={tabWrapperStyle}>
              <TabButton
                title={"숨김 피드 3"}
                onClick={() => {}}
                current={true}
                fresh={"never"}
              />
              <BottomLine />
            </div>
          </div>
          <FilterBar />
        </div>
      </div>

      <Feed which="1" />

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
  "max-w-[430px] fixed z-10 flex flex-col w-full bg-base-white transition-shadow duration-300";

const tabContainerStyle = "max-w-[430px] w-full";
const tabWrapperStyle = "relative flex gap-[16px]";

export function BottomLine() {
  return (
    <div
      className={`absolute bottom-0 w-[71px] h-[2px] bg-grayscale-900 transition-transform`}
    />
  );
}
