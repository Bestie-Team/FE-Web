"use client";
import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Feed from "@/components/feeds/Feed";
import PullToRefresh from "react-simple-pull-to-refresh";
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
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import Panel from "@/components/shared/Panel/Panel";
import Modal from "@/components/shared/Modal/Modal";
import {
  commentDeleteModalAtom,
  feedDeleteModalAtom,
  feedHideModalAtom,
  recordModalAtom,
  reportModalAtom,
} from "@/atoms/modal";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteFeed from "@/components/feeds/hooks/useDeleteFeed";
import useDeleteComment from "@/components/feeds/hooks/useDeleteComment";
import { selectedCommentIdAtom } from "@/atoms/comment";
import useHideFeed from "@/components/feeds/hooks/useHideFeed";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { maxDate, minDate } from "@/constants/time";
import { lightyToast } from "@/utils/toast";
import NoFeed from "@/components/feeds/NoFeed";
import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import useReport from "@/components/report/hooks/useReport";
import ReportModal from "@/components/shared/Modal/ReportModal";
import NavBar from "@/components/shared/NavBar";
import { useSearchParams } from "next/navigation";
import { useTabs } from "@/hooks/useTabs";

const TabParamHandler = ({
  setSelectedTab,
}: {
  setSelectedTab: (num: "1" | "2") => void;
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "1" || tabParam === "2") {
      setSelectedTab(tabParam);
    }
  }, [searchParams, setSelectedTab]);

  return null;
};

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
            title1="전체"
            title2="마이"
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
    onReportFeed,
  }: {
    onDeleteFeed: () => void;
    onDeleteComment: () => void;
    onHideFeed: () => void;
    onReportFeed: (reason: { reason: string }) => void;
  }) => {
    const [deleteModalOpen, setDeleteModalOpen] =
      useRecoilState(feedDeleteModalAtom);
    const [commentDeleteModalOpen, setCommentDeleteModalOpen] = useRecoilState(
      commentDeleteModalAtom
    );
    const [feedHideModalOpen, setFeedHideModalOpen] =
      useRecoilState(feedHideModalAtom);

    const [feedReportModalOpen, setFeedReportModalOpen] =
      useRecoilState(reportModalAtom);

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
        {feedReportModalOpen && (
          <ReportModal
            action={onReportFeed}
            onClose={() => setFeedReportModalOpen(false)}
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
  const {
    selectedTab,
    handleTabClick,
    handleSlideChange,
    swiperRef,
    setSelectedTab,
  } = useTabs();
  const [commentModalOpen, setCommentModalOpen] = useRecoilState(
    commentModalStateAtom
  );
  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef_m = useRef<HTMLDivElement>(null);

  const queryParams = useMemo(
    () => ({
      order: "DESC" as const,
      minDate: minDate(),
      maxDate: maxDate(),
      limit: 10,
    }),
    []
  );

  const handleDeleteFeedSuccess = async (data: { message: string }) => {
    lightyToast.success(data.message);
    await queryClient.invalidateQueries({
      queryKey: ["get/feeds/mine"],
    });
  };

  const handleDeleteCommentSuccess = async () => {
    lightyToast.success("댓글을 삭제했습니다");
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId: selectedFeedId }],
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

  const handleReportFeedSuccess = async () => {
    lightyToast.success("피드를 신고했어요");
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
      }),
    ]);
  };

  const { data: feedAll, loadMore, isFetching } = useFeedAll(queryParams);

  const {
    data: feedMine,
    loadMore: loadMore_mine,
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

  const { mutate: reportFeed } = useReport({
    report: { reportedId: selectedFeedId, type: "FEED" },
    onSuccess: handleReportFeedSuccess,
    onError: () => {
      lightyToast.error("피드신고 실패");
    },
  });

  useInfiniteScrollByRef({
    isFetching: isFetching_mine,
    loadMore: loadMore_mine,
    targetRef: containerRef_m,
  });

  useInfiniteScrollByRef({
    isFetching,
    loadMore,
    targetRef: containerRef,
  });

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(Number(selectedTab) - 1);
    }
  }, [selectedTab, swiperRef]);

  const renderSwipers = useMemo(() => {
    return (
      <div className="h-dvh">
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
          className="custom-swiper !h-dvh w-full !z-5 overflow-y-scroll no-scrollbar"
        >
          {feedAll && feedAll.length > 0 ? (
            <SwiperSlide>
              <div
                ref={containerRef}
                className="h-full overflow-y-auto no-scrollbar pt-[90px]"
              >
                <Feed
                  feeds={feedAll}
                  onClickFeed={setSelectedFeedId}
                  isFetching={isFetching}
                />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <NoFeed />
            </SwiperSlide>
          )}
          {feedMine && (
            <SwiperSlide>
              {feedMine.length > 0 ? (
                <div
                  ref={containerRef_m}
                  className="h-full overflow-y-auto no-scrollbar pt-[90px]"
                >
                  <Feed
                    feeds={feedMine}
                    onClickFeed={setSelectedFeedId}
                    isFetching={isFetching_mine}
                  />
                </div>
              ) : (
                <SwiperSlide>
                  <NoFeed />
                </SwiperSlide>
              )}
            </SwiperSlide>
          )}
          <NavBar />
        </Swiper>
      </div>
    );
  }, [feedAll, feedMine, selectedTab, swiperRef, handleSlideChange]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRefresh = async () => {
    try {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["get/feeds/all"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["get/feeds/mine"],
        }),
      ]);

      return true;
    } catch (error) {
      console.error("Refresh failed:", error);
      lightyToast.error("새로고침에 실패했어요");
      return false;
    }
  };

  return (
    <div className="h-dvh no-scrollbar">
      <Header
        shadow={isPast}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />
      {(!isClient || !feedMine || !feedAll) && <DotSpinner />}
      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent={
          <div className="flex justify-center pt-[96px]">refreshing</div>
        }
      >
        {renderSwipers}
      </PullToRefresh>
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
        onReportFeed={reportFeed}
        onDeleteFeed={deleteFeed}
        onDeleteComment={deleteComment}
        onHideFeed={hideFeed}
      />
      <Suspense fallback={null}>
        <TabParamHandler setSelectedTab={setSelectedTab} />
      </Suspense>
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] pt-12 px-5 fixed flex flex-col w-full bg-base-white transition-shadow duration-300";
