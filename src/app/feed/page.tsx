"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import FilterBar from "@/components/shared/FilterBar";
import Feed from "@/components/feed/Feed";
import "swiper/css";
import "swiper/css/navigation";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { useRecoilState, useRecoilValue } from "recoil";
import { commentModalStateAtom } from "@/atoms/feed";
import { Swiper, SwiperSlide } from "swiper/react";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import useFeedAll from "@/components/feeds/hooks/useFeedAll";
import useFeedMine from "@/components/feeds/hooks/useFeedMine";
import { useTabs } from "@/hooks/useTabs";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import Panel from "@/components/shared/Panel/Panel";
import Modal from "@/components/shared/Modal/Modal";
import {
  commentDeleteModalAtom,
  feedDeleteModalAtom,
  feedHideModalAtom,
  recordModalAtom,
} from "@/atoms/modal";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteFeed from "@/components/feeds/hooks/useDeleteFeed";
import { toast } from "react-toastify";
import useDeleteComment from "@/components/feeds/hooks/useDeleteComment";
import { selectedCommentIdAtom } from "@/atoms/comment";
import useHideFeed from "@/components/feeds/hooks/useHideFeed";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

export default function FeedPage() {
  const [selectedFeedId, setSelectedFeedId] = useState("");
  const selectedCommentId = useRecoilValue(selectedCommentIdAtom);
  const [commentDeleteModalOpen, setCommentDeleteModalOpen] = useRecoilState(
    commentDeleteModalAtom
  );
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = getHeader("/feed");
  const hasShadow = useScrollShadow(containerRef);
  const [commentModalOpen, setCommentModalOpen] = useRecoilState(
    commentModalStateAtom
  );
  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);
  const [deleteModalOpen, setDeleteModalOpen] =
    useRecoilState(feedDeleteModalAtom);
  const [feedHideModalOpen, setFeedHideModalOpen] =
    useRecoilState(feedHideModalAtom);
  const minDate = useMemo(() => new Date("2025-01-01").toISOString(), []);
  const maxDate = useMemo(() => new Date("2025-12-31").toISOString(), []);
  const order = "DESC";
  const limit = 10;
  const queryClient = useQueryClient();

  const { data: feedAll, isFetching } = useFeedAll({
    order: "DESC",
    minDate,
    maxDate,
    limit: 10,
  });

  const { data: feedMine, isFetching: isFetchingMine } = useFeedMine({
    order: "DESC",
    minDate,
    maxDate,
    limit: 10,
  });

  const { mutate: deleteFeed } = useDeleteFeed({
    feedId: selectedFeedId,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: [
          "get/feeds/mine",
          {
            order: "DESC",
            minDate: minDate.slice(0, 10),
            maxDate: maxDate.slice(0, 10),
            limit: 10,
          },
        ],
      });
    },
  });

  const { mutate: deleteComment } = useDeleteComment({
    commentId: selectedCommentId,
    onSuccess: async () => {
      toast.success("댓글을 삭제했습니다");
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId: selectedFeedId }],
      });
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds", { order, minDate, maxDate, limit }],
      });
    },
  });

  const { mutate: hideFeed } = useHideFeed({
    feedId: selectedFeedId,
    onSuccess: async () => {
      toast.success("피드를 숨겼어요");
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all", { order, minDate, maxDate, limit }],
      });
    },
    onError: () => {
      toast.error("피드를 숨기지 못했어요");
    },
  });

  // useEffect(() => {
  //   if (!isFetching && !isFetchingMine) {
  //     setScrollReady(true);
  //   }
  // }, [feedAll, feedMine, isFetching, isFetchingMine]);

  const renderSwipers = useMemo(() => {
    return (
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
        className="custom-swiper w-full !z-0"
      >
        {isFetching ? (
          <DotSpinner />
        ) : (
          feedAll && (
            <SwiperSlide>
              <Feed feeds={feedAll?.feeds} onClickFeed={setSelectedFeedId} />
            </SwiperSlide>
          )
        )}

        {isFetchingMine ? (
          <DotSpinner />
        ) : (
          feedMine && (
            <SwiperSlide>
              <Feed feeds={feedMine.feeds} onClickFeed={setSelectedFeedId} />
            </SwiperSlide>
          )
        )}
      </Swiper>
    );
  }, [
    feedAll,
    feedMine,
    selectedTab,
    swiperRef,
    handleSlideChange,
    isFetching,
    isFetchingMine,
  ]);

  return (
    <div id="scrollable-container" ref={containerRef} className="pt-[48px]">
      {header}
      <div
        style={{
          zIndex: 1,
        }}
        className={clsx(filterWrapperStyle, hasShadow ? "shadow-bottom" : "")}
      >
        <Panel
          selectedTab={selectedTab}
          long="medium"
          title1="전체"
          title2="나의 피드"
          onClick={handleTabClick}
        />
        <FilterBar />
      </div>
      {renderSwipers}
      {recordModalOpen ? (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      ) : null}
      {commentModalOpen && (
        <CommentContainer
          selectedFeedId={selectedFeedId}
          onClose={() => setCommentModalOpen(false)}
        />
      )}
      {deleteModalOpen ? (
        <Modal
          title="피드를 삭제하시겠어요?"
          content="피드 정보가 전부 삭제되며 이는 복구할 수 없어요."
          left="취소"
          right="삭제하기"
          action={() => deleteFeed()}
          onClose={() => setDeleteModalOpen(false)}
        />
      ) : null}
      {commentDeleteModalOpen ? (
        <Modal
          title="댓글을 삭제하시겠어요?"
          content="댓글 정보가 전부 삭제되며 이는 복구할 수 없어요."
          left="취소"
          right="삭제하기"
          action={() => deleteComment()}
          onClose={() => setCommentDeleteModalOpen(false)}
        />
      ) : null}
      {feedHideModalOpen ? (
        <Modal
          title="해당 피드를 숨기시겠어요?"
          left="취소"
          right="숨기기"
          action={() => hideFeed()}
          onClose={() => setFeedHideModalOpen(false)}
        />
      ) : null}
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] pl-[20px] fixed flex flex-col w-full bg-base-white transition-shadow duration-300";
