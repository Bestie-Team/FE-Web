"use client";
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
} from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import "swiper/css";
import "swiper/css/navigation";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import useFeedAll from "@/components/feeds/hooks/useFeedAll";
import useFeedMine from "@/components/feeds/hooks/useFeedMine";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import {
  modalStateAtom,
  recordModalAtom,
  reportInfoAtom,
  reportModalAtom,
} from "@/atoms/modal";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteFeed from "@/components/feeds/hooks/useDeleteFeed";
import useDeleteComment from "@/components/feeds/hooks/useDeleteComment";
import { selectedCommentIdAtom } from "@/atoms/comment";
import useHideFeed from "@/components/feeds/hooks/useHideFeed";
import { maxDate, minDate } from "@/constants/time";
import { lightyToast } from "@/utils/toast";
import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";
import useReport, {
  ReportContentTypes,
} from "@/components/report/hooks/useReport";
import { useTabs } from "@/hooks/useTabs";
import FeedForDisplay from "@/components/feeds/FeedForDisplay";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import useNotification from "@/components/notice/hooks/useNotification";
import dynamic from "next/dynamic";
import { patchNotificationToken } from "@/remote/users";
import { requestNotificationPermission } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types";
import { bottomSheetStateAtom, selectedFeedIdAtom } from "@/atoms/feed";
import { ScrollAwareHeader } from "@/components/shared/Header/ScrollAwareHeader";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import TabParamHandler from "@/components/shared/TabParamHandler";
import NoFeed from "@/components/feeds/NoFeed";
import { FeedSkeleton } from "@/components/shared/Skeleton/FeedSkeleton";
import { useDropdown, useFriendsBox } from "@/hooks/useDropdown";
import Spacing from "@/components/shared/Spacing";
import FeedCard from "@/components/feeds/FeedCard";
import FeedDropdownMenu from "@/components/shared/DropDownMenu/FeedDropDownMenu";
import OptionsSelectIcon from "@/components/shared/Icon/OptionsSelectIcon";
import InfoBar, { FriendsInfoContainer } from "@/components/feeds/InfoBar";
import { MENU_CONFIGS } from "@/constants/menu-configs";
import MODAL_CONFIGS from "@/constants/modal-configs";

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"), {
  ssr: false,
});

const Report = dynamic(
  () => import("@/components/shared/Modal/Report/Report"),
  {
    ssr: false,
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
    onReportFeed: (reason: ReportContentTypes) => void;
  }) => {
    const setFeedId = useSetRecoilState(selectedFeedIdAtom);
    const [report, setReport] = useRecoilState(reportInfoAtom);
    const [reportModal, setReportModal] = useRecoilState(reportModalAtom);
    const [modalState, setModalState] = useRecoilState(modalStateAtom);

    const closeModal = useCallback(() => {
      setFeedId("");
      setModalState({
        type: null,
        isOpen: false,
      });
    }, []);

    const handleReport = useCallback(() => {
      onReportFeed({ ...report });
      setReportModal({ type: null, isOpen: false });
    }, [report]);

    const modalAction =
      modalState.type === "deleteFeed"
        ? onDeleteFeed
        : modalState.type === "hideFeed"
        ? onHideFeed
        : onDeleteComment;

    return (
      <>
        {modalState.isOpen && modalState.type && (
          <Modal
            title={MODAL_CONFIGS[modalState.type].title}
            content={MODAL_CONFIGS[modalState.type].content}
            left={MODAL_CONFIGS[modalState.type].leftButton}
            right={MODAL_CONFIGS[modalState.type].rightButton}
            action={modalAction}
            onClose={closeModal}
          />
        )}
        {reportModal.isOpen && (
          <Report
            report={report}
            setReport={setReport}
            handleReport={handleReport}
            onClose={() => setReportModal({ type: null, isOpen: false })}
          />
        )}
      </>
    );
  }
);

FeedModals.displayName = "FeedModals";

export default function FeedPage() {
  const queryClient = useQueryClient();
  const { token, userInfo } = useAuth();
  const [selectedFeedId, setSelectedFeedId] = useState("");
  const [selectedFeedWriter, setSelectedFeedWriter] = useState("");
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
      limit: 8,
    }),
    []
  );

  useEffect(() => {
    requestNotificationPermission();
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; notificationToken: string | null } =
        JSON.parse(data);

      if (message.type === WEBVIEW_EVENT.AGREE_NOTIFICATION_PERMISSION) {
        if (message.notificationToken) {
          patchNotificationToken({ token: message.notificationToken });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
    lightyToast.success("신고가 접수되었어요!");
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
    onSuccess: handleReportFeedSuccess,
    onError: () => {
      lightyToast.error("신고 실패");
    },
  });

  const { visible } = useScrollDirection({
    elementRef: selectedTab === "1" ? containerRef : containerRef_m,
    selectedTab,
  });

  useInfiniteScrollByRef({
    isFetching: isFetching_mine,
    loadMore: loadMore_mine,
    targetRef: containerRef_m,
    selectedTab,
  });

  useInfiniteScrollByRef({
    isFetching,
    loadMore,
    targetRef: containerRef,
    selectedTab,
  });
  const mailCount = isNewNotification.filter(
    (notification) => notification.type === "GATHERING_INVITATION_RECEIVED"
  );

  const handleRefreshAll = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
      });
      return true;
    } catch (error) {
      console.error("Refresh failed:", error);
      lightyToast.error("새로고침에 실패했어요");
      return false;
    }
  };
  const handleRefreshMine = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/mine"],
      });
      return true;
    } catch (error) {
      console.error("Refresh failed:", error);
      lightyToast.error("새로고침에 실패했어요");
      return false;
    }
  };

  const {
    btnRef,
    toggleDropdown,
    openedDropdownId,
    dropDownRef,
    closeDropdown,
  } = useDropdown();

  const { openedBoxId, friendsRef, fBtnRef, toggleBox, closeBox } =
    useFriendsBox();

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
          direction="horizontal"
          className="custom-swiper !h-dvh w-full"
        >
          {feedAll && feedAll.length > 0 && (
            <SwiperSlide className="!h-dvh">
              <PullToRefresh
                onRefresh={handleRefreshAll}
                pullingContent={<></>}
                refreshingContent={
                  <div className="flex justify-center pt-safe-top">
                    <div className="p-2">
                      <Spacing size={90} />
                      <DotSpinnerSmall />
                    </div>
                  </div>
                }
              >
                <div ref={containerRef} className={styles.feedWrapper}>
                  <div className="pt-safe-top">
                    {feedAll.map((feed) => (
                      <div key={feed.id} className="relative">
                        <FeedCard
                          feed={feed}
                          onClick={() => {
                            setSelectedFeedId(feed.id);
                            setSelectedFeedWriter(feed.writer.accountId);
                          }}
                        >
                          <InfoBar
                            ref={fBtnRef}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBox(feed.id);
                            }}
                            withMembers={feed.withMembers}
                            feed={feed}
                          />
                          <div
                            className="absolute top-11 right-14"
                            ref={friendsRef}
                          >
                            {openedBoxId == feed.id && (
                              <FriendsInfoContainer
                                withMembers={feed.withMembers}
                                isOpen={openedBoxId === feed.id}
                              />
                            )}
                          </div>
                        </FeedCard>

                        <div
                          style={{ width: 24, height: 24 }}
                          className={styles.optionWrapper}
                        >
                          <div
                            ref={btnRef}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(feed.id);
                              setSelectedFeedId(feed.id);
                            }}
                          >
                            <OptionsSelectIcon />
                          </div>
                          {openedDropdownId === feed.id && (
                            <FeedDropdownMenu
                              feed={feed}
                              ref={dropDownRef}
                              menuItems={
                                MENU_CONFIGS[
                                  feed.writer.accountId === userInfo?.accountId
                                    ? "feed_mine"
                                    : "feed"
                                ].menuItems
                              }
                              className={
                                MENU_CONFIGS[
                                  feed.writer.accountId === userInfo?.accountId
                                    ? "feed_mine"
                                    : "feed"
                                ].className
                              }
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    {isFetching && <DotSpinnerSmall />}
                  </div>
                </div>
              </PullToRefresh>
            </SwiperSlide>
          )}
          {feedAll && feedAll.length === 0 && (
            <SwiperSlide className="!h-dvh">
              <div ref={containerRef} className={styles.feedWrapper}>
                <FeedForDisplay />
              </div>
            </SwiperSlide>
          )}
          {feedMine && feedMine.length > 0 && (
            <SwiperSlide>
              <PullToRefresh
                onRefresh={handleRefreshMine}
                pullingContent={<></>}
                refreshingContent={
                  <div className="flex justify-center pt-safe-top">
                    <div className="p-2">
                      <Spacing size={90} />
                      <DotSpinnerSmall />
                    </div>
                  </div>
                }
              >
                <div ref={containerRef_m} className={styles.feedWrapper}>
                  <div className="pt-safe-top">
                    {feedMine.map((feed) => (
                      <div key={feed.id} className="relative">
                        <FeedCard
                          key={feed.id}
                          feed={feed}
                          onClick={() => {
                            setSelectedFeedId(feed.id);
                            setSelectedFeedWriter(feed.writer.accountId);
                          }}
                        >
                          <InfoBar
                            ref={fBtnRef}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBox(feed.id);
                            }}
                            withMembers={feed.withMembers}
                            feed={feed}
                          />
                          {openedBoxId === feed.id && (
                            <div
                              className="absolute top-11 right-14"
                              ref={friendsRef}
                            >
                              <FriendsInfoContainer
                                withMembers={feed.withMembers}
                                isOpen={openedBoxId === feed.id}
                              />
                            </div>
                          )}
                        </FeedCard>
                        <div
                          style={{ width: 24, height: 24 }}
                          className={styles.optionWrapper}
                        >
                          <div
                            ref={btnRef}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(feed.id);
                              setSelectedFeedId(feed.id);
                            }}
                          >
                            <OptionsSelectIcon />
                          </div>
                          {openedDropdownId === feed.id && (
                            <FeedDropdownMenu
                              feed={feed}
                              ref={dropDownRef}
                              menuItems={MENU_CONFIGS["feed_mine"].menuItems}
                              className={MENU_CONFIGS["feed_mine"].className}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    {isFetching_mine && <DotSpinnerSmall />}
                  </div>
                </div>
              </PullToRefresh>
            </SwiperSlide>
          )}
          {feedMine && feedMine.length === 0 && (
            <SwiperSlide>
              <div ref={containerRef_m} className={styles.feedWrapper}>
                <NoFeed />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    );
  }, [
    selectedTab,
    feedAll,
    isFetching,
    feedMine,
    isFetching_mine,
    swiperRef,
    handleSlideChange,
  ]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  return (
    <div
      className="h-dvh pb-safe-bottom"
      onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
        closeDropdown(e);
        closeBox();
      }}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        closeDropdown(e);
        closeBox();
      }}
    >
      <ScrollAwareHeader
        visible={visible}
        mailCount={mailCount}
        isNewNotification={isNewNotification}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />

      {!isClient ? (
        <div className="h-full w-full pt-[90px] pb-28 flex flex-col">
          <FeedSkeleton />
          <FeedSkeleton />
        </div>
      ) : (
        renderSwipers
      )}

      <TabParamHandler setSelectedTab={setSelectedTab} pathToReplace="/feed" />
      {recordModalOpen && (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      )}
      {bottomSheetState && (
        <CommentContainer
          selectedFeedId={selectedFeedId}
          selectedFeedWriter={selectedFeedWriter}
          onClose={() => setBottomSheetState(false)}
        />
      )}
      <FeedModals
        onReportFeed={reportFeed}
        onDeleteFeed={deleteFeed}
        onDeleteComment={deleteComment}
        onHideFeed={hideFeed}
      />
    </div>
  );
}

const styles = {
  optionWrapper:
    "absolute top-5 right-5 cursor-pointer flex justify-center items-center pt-[5.5px] pb-1",
  feedWrapper: "h-full overflow-y-scroll no-scrollbar pt-[90px] pb-14",
};
