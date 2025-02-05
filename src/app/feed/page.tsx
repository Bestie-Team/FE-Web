"use client";
import React, { useState, useMemo, useEffect } from "react";
import Feed from "@/components/feeds/Feed";
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
import useDeleteComment from "@/components/feeds/hooks/useDeleteComment";
import { selectedCommentIdAtom } from "@/atoms/comment";
import useHideFeed from "@/components/feeds/hooks/useHideFeed";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { maxDate, minDate } from "@/constants/time";
import { lightyToast } from "@/utils/toast";
import NoFeed from "@/components/feeds/NoFeed";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

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
        <div
          id="filter"
          className={clsx(filterWrapperStyle, shadow ? "shadow-bottom" : "")}
        >
          <Panel
            selectedTab={selectedTab}
            long="short"
            title1="마이"
            title2="전체"
            onClick={handleTabClick}
          />
        </div>
        {getHeader("/feed")}
      </>
    );
  }
);

const FeedModals = React.memo(
  ({
    onDeleteFeed,
    onDeleteComment,
    onHideFeed,
  }: {
    onDeleteFeed: () => void;
    onDeleteComment: () => void;
    onHideFeed: () => void;
  }) => {
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

Header.displayName = "Header";
FeedModals.displayName = "FeedModals";

export default function FeedPage() {
  const queryClient = useQueryClient();
  const isPast = useScrollThreshold();
  const [isClient, setIsClient] = useState(false);
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
      minDate: minDate(),
      maxDate: maxDate(),
      limit: 2,
    }),
    []
  );

  const handleDeleteFeedSuccess = async (data: { message: string }) => {
    lightyToast.success(data.message);
    await queryClient.invalidateQueries({
      queryKey: ["get/feeds/mine", queryParams],
    });
  };

  const handleDeleteCommentSuccess = async () => {
    lightyToast.success("댓글을 삭제했습니다");
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId: selectedFeedId }],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds", queryParams],
      }),
    ]);
  };

  const handleHideFeedSuccess = async () => {
    lightyToast.success("피드를 숨겼어요");
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/mine"],
      }),
    ]);
  };

  const {
    data: feedAll,
    loadMore,
    hasNextPage,
    isFetching,
  } = useFeedAll(queryParams);

  const {
    data: feedMine,
    loadMore: loadMore_mine,
    hasNextPage: hasNextPage_mine,
    isFetching: isFetching_mine,
  } = useFeedMine(queryParams);

  const { mutate: deleteFeed } = useDeleteFeed({
    feedId: selectedFeedId,
    onSuccess: handleDeleteFeedSuccess,
  });

  const { mutate: deleteComment } = useDeleteComment({
    commentId: selectedCommentId,
    onSuccess: handleDeleteCommentSuccess,
  });

  const { mutate: hideFeed } = useHideFeed({
    feedId: selectedFeedId,
    onSuccess: handleHideFeedSuccess,
    onError: () => {
      lightyToast.error("피드를 숨기지 못했어요");
    },
  });

  useInfiniteScroll({ isFetching: isFetching_mine, loadMore: loadMore_mine });
  useInfiniteScroll({ isFetching, loadMore });

  const renderSwipers = useMemo(() => {
    if (!feedAll || !feedMine) {
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
        className="custom-swiper w-full !z-5 pointer-events-auto"
      >
        {/* {feedMine && (
          <SwiperSlide
            id="scrollableDiv1"
            className="h-full overflow-y-auto no-scrollbar pointer-events-auto"
          >
            <InfiniteScroll
              dataLength={feedMine?.length ?? 0}
              hasMore={hasNextPage_mine}
              loader={<DotSpinnerSmall />}
              next={loadMore_mine}
              scrollThreshold="10px"
              scrollableTarget="scrollableDiv1"
              className="pointer-events-auto"
            >
              {feedMine.length > 0 ? (
                <Feed feeds={feedMine} onClickFeed={setSelectedFeedId} />
              ) : (
                <NoFeed />
              )}
            </InfiniteScroll>
          </SwiperSlide>
        )} */}
        {feedMine && (
          <SwiperSlide>
            {feedMine.length > 0 ? (
              <Feed feeds={feedMine} onClickFeed={setSelectedFeedId} />
            ) : (
              <NoFeed />
            )}
          </SwiperSlide>
        )}
        {/* {feedAll && (
          <SwiperSlide
            id="scrollableDiv2"
            className="h-full overflow-y-auto no-scrollbar pointer-events-auto"
          >
            <InfiniteScroll
              dataLength={feedAll?.length ?? 0}
              hasMore={hasNextPage}
              loader={<DotSpinnerSmall />}
              next={loadMore}
              scrollThreshold="10px"
              scrollableTarget="scrollableDiv2"
              className="pointer-events-auto"
            >
              {feedAll.length > 0 ? (
                <Feed feeds={feedAll} onClickFeed={setSelectedFeedId} />
              ) : (
                <NoFeed />
              )}
            </InfiniteScroll>
          </SwiperSlide>
        )} */}
        {feedAll && feedAll.length > 0 ? (
          <SwiperSlide>
            <Feed feeds={feedAll} onClickFeed={setSelectedFeedId} />
          </SwiperSlide>
        ) : (
          <NoFeed />
        )}
      </Swiper>
    );
  }, [
    feedAll,
    feedMine,
    selectedTab,
    swiperRef,
    handleSlideChange,
    hasNextPage,
    hasNextPage_mine,
    loadMore,
    loadMore_mine,
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }
  return (
    <div className="h-full no-scrollbar">
      <Header
        shadow={isPast}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
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
        onDeleteFeed={deleteFeed}
        onDeleteComment={deleteComment}
        onHideFeed={hideFeed}
      />
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] pt-12 px-5 fixed flex flex-col w-full bg-base-white transition-shadow duration-300";
