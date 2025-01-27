"use client";
import React, { useState, useMemo, useCallback } from "react";
import Feed from "@/components/feed/Feed";
import "swiper/css";
import "swiper/css/navigation";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { useRecoilState, useRecoilValue } from "recoil";
import { commentModalStateAtom } from "@/atoms/feed";
import { Swiper, SwiperSlide } from "swiper/react";
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
import { scrollProgressAtom } from "@/atoms/scroll";

const Header = React.memo(() => {
  return getHeader("/feed");
});

const FilterPanel = React.memo(
  ({
    scrollProgress,
    selectedTab,
    onTabClick,
  }: {
    scrollProgress: number;
    selectedTab: "1" | "2";
    onTabClick: (tab: "1" | "2") => void;
  }) => {
    return (
      <div
        id="filter"
        className={clsx(
          filterWrapperStyle,
          scrollProgress > 0.1 ? "shadow-bottom" : ""
        )}
      >
        <Panel
          selectedTab={selectedTab}
          long="medium"
          title1="전체"
          title2="나의 피드"
          onClick={onTabClick}
        />
      </div>
    );
  }
);

const FeedModals = React.memo(
  ({
    selectedFeedId,
    onDeleteFeed,
    onDeleteComment,
    onHideFeed,
  }: {
    selectedFeedId: string;
    onDeleteFeed: () => void;
    onDeleteComment: () => void;
    onHideFeed: () => void;
  }) => {
    console.log(selectedFeedId);
    const [deleteModalOpen, setDeleteModalOpen] =
      useRecoilState(feedDeleteModalAtom);
    const [commentDeleteModalOpen, setCommentDeleteModalOpen] = useRecoilState(
      commentDeleteModalAtom
    );
    const [feedHideModalOpen, setFeedHideModalOpen] =
      useRecoilState(feedHideModalAtom);

    return (
      <>
        {deleteModalOpen && (
          <Modal
            title="피드를 삭제하시겠어요?"
            content="피드 정보가 전부 삭제되며 이는 복구할 수 없어요."
            left="취소"
            right="삭제하기"
            action={onDeleteFeed}
            onClose={() => setDeleteModalOpen(false)}
          />
        )}
        {commentDeleteModalOpen && (
          <Modal
            title="댓글을 삭제하시겠어요?"
            content="댓글 정보가 전부 삭제되며 이는 복구할 수 없어요."
            left="취소"
            right="삭제하기"
            action={onDeleteComment}
            onClose={() => setCommentDeleteModalOpen(false)}
          />
        )}
        {feedHideModalOpen && (
          <Modal
            title="해당 피드를 숨기시겠어요?"
            left="취소"
            right="숨기기"
            action={onHideFeed}
            onClose={() => setFeedHideModalOpen(false)}
          />
        )}
      </>
    );
  }
);
export default function FeedPage() {
  const queryClient = useQueryClient();
  const scrollProgress = useRecoilValue(scrollProgressAtom);
  const [selectedFeedId, setSelectedFeedId] = useState("");
  const selectedCommentId = useRecoilValue(selectedCommentIdAtom);
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();
  const [commentModalOpen, setCommentModalOpen] = useRecoilState(
    commentModalStateAtom
  );
  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);
  const queryParams = useMemo(
    () => ({
      order: "DESC" as const,
      minDate: new Date("2025-01-01").toISOString(),
      maxDate: new Date("2025-12-31").toISOString(),
      limit: 10,
    }),
    []
  );

  const { data: feedAll, isFetching } = useFeedAll({ ...queryParams });
  const { data: feedMine, isFetching: isFetchingMine } = useFeedMine({
    ...queryParams,
  });

  const handleDeleteFeed = useCallback(async () => {
    const { mutate } = useDeleteFeed({
      feedId: selectedFeedId,
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["get/feeds/mine", queryParams],
        });
      },
    });
    mutate();
  }, [selectedFeedId, queryClient, queryParams]);

  const handleDeleteComment = useCallback(async () => {
    const { mutate } = useDeleteComment({
      commentId: selectedCommentId,
      onSuccess: async () => {
        toast.success("댓글을 삭제했습니다");
        await queryClient.invalidateQueries({
          queryKey: ["get/comments", { feedId: selectedFeedId }],
        });
        await queryClient.invalidateQueries({
          queryKey: ["get/feeds", queryParams],
        });
      },
    });
    mutate();
  }, [selectedCommentId, selectedFeedId, queryClient, queryParams]);

  const handleHideFeed = useCallback(async () => {
    const { mutate } = useHideFeed({
      feedId: selectedFeedId,
      onSuccess: async () => {
        toast.success("피드를 숨겼어요");
        await queryClient.invalidateQueries({
          queryKey: ["get/feeds/all", queryParams],
        });
      },
      onError: () => {
        toast.error("피드를 숨기지 못했어요");
      },
    });
    mutate();
  }, [selectedFeedId, queryClient, queryParams]);

  const renderSwipers = useMemo(() => {
    if (isFetching || isFetchingMine) {
      return <DotSpinner />;
    }

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
        className="custom-swiper w-full !z-5"
      >
        {feedAll && (
          <SwiperSlide>
            <Feed feeds={feedAll?.feeds} onClickFeed={setSelectedFeedId} />
          </SwiperSlide>
        )}
        {feedMine && (
          <SwiperSlide>
            <Feed feeds={feedMine.feeds} onClickFeed={setSelectedFeedId} />
          </SwiperSlide>
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
    <div>
      <Header />
      <FilterPanel
        scrollProgress={scrollProgress}
        selectedTab={selectedTab}
        onTabClick={handleTabClick}
      />
      {renderSwipers}

      {recordModalOpen && (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      )}
      {commentModalOpen && (
        <CommentContainer
          selectedFeedId={selectedFeedId}
          onClose={() => setCommentModalOpen(false)}
        />
      )}
      <FeedModals
        selectedFeedId={selectedFeedId}
        onDeleteFeed={handleDeleteFeed}
        onDeleteComment={handleDeleteComment}
        onHideFeed={handleHideFeed}
      />
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] pt-12 px-5 fixed flex flex-col w-full bg-base-white transition-shadow duration-300";
