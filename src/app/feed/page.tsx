"use client";
import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Feed from "@/components/feeds/Feed";
import PullToRefresh from "react-simple-pull-to-refresh";
import "swiper/css";
import "swiper/css/navigation";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { useRecoilState, useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import useFeedAll from "@/components/feeds/hooks/useFeedAll";
import useFeedMine from "@/components/feeds/hooks/useFeedMine";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import Panel from "@/components/shared/Panel/Panel";
import {
  modalStateAtom,
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
import { useRouter, useSearchParams } from "next/navigation";
import { useTabs } from "@/hooks/useTabs";
import FeedForDisplay from "@/components/feeds/FeedForDisplay";
import MailIcon from "@/components/shared/Icon/MailIcon";
import NoticeIcon from "@/components/shared/Icon/NoticeIcon";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import useNotification from "@/components/notice/hooks/useNotification";
import { DotWithNumberIcon } from "@/components/shared/Icon/DotIcon";
import dynamic from "next/dynamic";
import { bottomSheetStateAtom } from "@/atoms/feed";

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"), {
  ssr: false,
});

const Report = dynamic(
  () => import("@/components/shared/Modal/Report/Report"),
  {
    ssr: false,
  }
);

const TabParamHandler = ({
  setSelectedTab,
}: {
  setSelectedTab: (num: "1" | "2") => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam === "1" || tabParam === "2") {
      setSelectedTab(tabParam);
      router.replace("/feed");
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
          className={clsx(
            styles.filterWrapperStyle,
            shadow ? "shadow-bottom" : ""
          )}
        >
          <Panel
            selectedTab={selectedTab}
            long="short"
            title1="전체"
            title2="마이"
            onClick={handleTabClick}
            year={false}
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
    const [modalState, setModalState] = useRecoilState(modalStateAtom);
    const [feedReportModalOpen, setFeedReportModalOpen] =
      useRecoilState(reportModalAtom);

    const closeModal = () => {
      setModalState({
        type: null,
        isOpen: false,
      });
    };

    const MODAL_CONFIGS = {
      deleteFeed: {
        title: "피드를 삭제하시겠어요?",
        content: "피드 정보가 전부 삭제되며 이는 복구할 수 없어요.",
        leftButton: "취소",
        rightButton: "삭제하기",
        action: () => onDeleteFeed(),
      },
      deleteFeedComment: {
        title: "댓글을 삭제하시겠어요?",
        content: "댓글 정보가 전부 삭제되며 이는 복구할 수 없어요.",
        leftButton: "취소",
        rightButton: "나가기",
        action: () => onDeleteComment(),
      },

      hideFeed: {
        title: "해당 피드를 숨기시겠어요?",
        leftButton: "취소",
        rightButton: "숨기기",
        action: () => onHideFeed(),
      },
    };

    return (
      <>
        {modalState.isOpen && modalState.type && (
          <Modal
            title={MODAL_CONFIGS[modalState.type].title}
            content={MODAL_CONFIGS[modalState.type].content}
            left={MODAL_CONFIGS[modalState.type].leftButton}
            right={MODAL_CONFIGS[modalState.type].rightButton}
            action={MODAL_CONFIGS[modalState.type].action}
            onClose={closeModal}
          />
        )}
        {feedReportModalOpen && (
          <Report
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
  const { token } = useAuth();
  const isPast = useScrollThreshold();
  const [isClient, setIsClient] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState("");
  const router = useRouter();
  const selectedCommentId = useRecoilValue(selectedCommentIdAtom);
  const {
    selectedTab,
    handleTabClick,
    handleSlideChange,
    swiperRef,
    setSelectedTab,
  } = useTabs();
  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);
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

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

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
        queryKey: ["get/feeds/hidden"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/mine"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
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

  const {
    data: feedAll,
    loadMore,
    isFetching,
  } = useFeedAll({ ...queryParams, enabled: !!token });

  const {
    data: feedMine,
    loadMore: loadMore_mine,
    isFetching: isFetching_mine,
  } = useFeedMine({ ...queryParams, enabled: !!token });

  const { data: noti = [] } = useNotification();

  const isNewNotification = noti.filter((n) => n.readAt == null);

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

  const mailCount = isNewNotification.filter(
    (notification) => notification.type === "GATHERING_INVITATION_RECEIVED"
  );

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
                className="h-full overflow-y-auto no-scrollbar pt-[90px] pb-28"
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
              <div
                ref={containerRef}
                className="h-full overflow-y-auto no-scrollbar pt-[90px] pb-28"
              >
                <FeedForDisplay />
              </div>
            </SwiperSlide>
          )}
          {feedMine && (
            <SwiperSlide>
              {feedMine.length > 0 ? (
                <div
                  ref={containerRef_m}
                  className="h-full overflow-y-auto no-scrollbar pt-[90px] pb-28"
                >
                  <Feed
                    feeds={feedMine}
                    onClickFeed={setSelectedFeedId}
                    isFetching={isFetching_mine}
                  />
                </div>
              ) : (
                <SwiperSlide>
                  <div
                    ref={containerRef_m}
                    className="h-full overflow-y-auto no-scrollbar pt-[90px] pb-28"
                  >
                    <NoFeed />
                  </div>
                </SwiperSlide>
              )}
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    );
  }, [feedAll, feedMine, selectedTab, swiperRef, handleSlideChange]);

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
    <div className="relative h-dvh no-scrollbar">
      <div
        style={{ zIndex: 99 }}
        className="flex fixed right-0 top-0 h-12 items-center gap-1 pr-5"
      >
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            router.push("/invitation");
          }}
          className={styles.iconWrapperStyle}
        >
          <MailIcon
            className="relative"
            width="24"
            height="24"
            color="#0A0A0A"
          />
          {mailCount.length >= 1 && (
            <DotWithNumberIcon count={isNewNotification.length} />
          )}
        </div>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            router.push("/notice");
          }}
          className={styles.iconWrapperStyle}
        >
          <NoticeIcon color="#0A0A0A" />
          {isNewNotification.length >= 1 && (
            <DotWithNumberIcon count={isNewNotification.length} />
          )}
        </div>
      </div>
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
      {bottomSheetState && (
        <CommentContainer
          selectedFeedId={selectedFeedId}
          onClose={() => setBottomSheetState(false)}
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

const styles = {
  filterWrapperStyle:
    "max-w-[430px] pt-12 px-5 fixed flex flex-col w-full bg-base-white transition-shadow duration-300",
  iconWrapperStyle:
    "relative flex justify-center items-center w-10 h-10 p-2 cursor-pointer  hover:animate-shrink-grow-less",
};
