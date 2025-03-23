"use client";
import React, { useEffect, useRef, useCallback } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import "swiper/css";
import "swiper/css/navigation";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { useRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import { recordModalAtom } from "@/atoms/modal";
import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";
import { useTabs } from "@/hooks/useTabs";
import FeedForDisplay from "@/components/feeds/FeedForDisplay";
import { patchNotificationToken } from "@/remote/users";
import { requestNotificationPermission } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types";
import { bottomSheetStateAtom } from "@/atoms/feed";
import { ScrollAwareHeader } from "@/components/shared/Header/ScrollAwareHeader";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import TabParamHandler from "@/components/shared/TabParamHandler";
import NoFeed from "@/components/feeds/NoFeed";
import Spacing from "@/components/shared/Spacing";
import useFeed from "@/components/feeds/hooks/useFeed";
import { FeedList } from "@/components/feeds/FeedList";
import { FeedModals } from "@/components/feeds/FeedModals";

export default function FeedPage() {
  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);
  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);
  const {
    feedId,
    setFeedId,

    feedAll,
    feedMine,

    isFetching,
    isFetching_mine,

    loadMore,
    loadMore_mine,

    handleRefreshAll,
    handleRefreshMine,

    deleteFeed,
    deleteComment,
    hideFeed,
    reportFeed,

    isNewNotification,
    mailCount,

    userInfo,
  } = useFeed();

  const {
    selectedTab,
    handleTabClick,
    handleSlideChange,
    swiperRef,
    setSelectedTab,
  } = useTabs();

  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef_m = useRef<HTMLDivElement>(null);

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

  const handleFeedSelect = useCallback(
    (feedId: string) => {
      setFeedId(feedId);
    },
    [setFeedId]
  );

  return (
    <div className="h-dvh pb-safe-bottom">
      <ScrollAwareHeader
        visible={visible}
        mailCount={mailCount}
        isNewNotification={isNewNotification}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />

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
                  {/**바로 아래의 pb를 높일수록 스크롤에 빨리 반응 */}
                  <div className="pt-safe-top pb-14">
                    <FeedList
                      feeds={feedAll}
                      userInfo={userInfo}
                      onFeedSelect={handleFeedSelect}
                      isFetching={isFetching}
                      loadMore={loadMore}
                    />
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
                    <FeedList
                      feeds={feedMine}
                      userInfo={userInfo}
                      onFeedSelect={handleFeedSelect}
                      isFetching={isFetching_mine}
                      isMine={true}
                      loadMore={loadMore_mine}
                    />
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

      <TabParamHandler setSelectedTab={setSelectedTab} pathToReplace="/feed" />

      {recordModalOpen && (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      )}

      {bottomSheetState && (
        <CommentContainer
          selectedFeedId={feedId}
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
  feedWrapper: "h-full overflow-y-scroll no-scrollbar pt-[90px] pb-14",
};
