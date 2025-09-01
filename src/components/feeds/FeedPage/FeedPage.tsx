"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { useRecoilState, useSetRecoilState } from "recoil";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import {
  modalStateAtom,
  recordModalAtom,
  reportInfoAtom,
  reportModalAtom,
} from "@/atoms/modal";
import { useInView } from "react-intersection-observer";
import { useTabs } from "@/hooks/useTabs";
import { bottomSheetStateAtom, selectedFeedInfoAtom } from "@/atoms/feed";
import { ScrollAwareHeader } from "@/components/layout/Header/ScrollAwareHeader";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import TabParamHandler from "@/components/shared/TabParamHandler";
import useFeed from "@/hooks/useFeed";
import { Feed } from "@/models/feed";
import { useIntersectionLoadMore } from "@/components/feeds/hooks/useIntersectionLoadMore";
import { useNotificationListener } from "@/components/feeds/hooks/useNotificationListener";
import { FeedSwiper } from "@/components/feeds/FeedPage/FeedSwiper";
import ModalWithReport from "../../shared/ModalWithReport";

export default function FeedPage() {
  useNotificationListener();

  const [reportContent, setReportContent] = useRecoilState(reportInfoAtom);
  const [reportModalOpen, setReportModalOpen] = useRecoilState(reportModalAtom);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);
  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);
  const setFeedInfo = useSetRecoilState(selectedFeedInfoAtom);

  const {
    feedId,
    setFeedId,
    feedAll,
    feedMine,
    isFetching,
    isFetchingMine,
    loadMore,
    loadMoreMine,
    handleRefreshAll,
    handleRefreshMine,
    deleteFeed,
    deleteComment,
    hideFeed,
    report,
    isNewNotification,
    mailCount,
    userInfo,
  } = useFeed();

  const { selectedTab, handleTabClick, swiperRef, setSelectedTab } = useTabs();
  const scrollContainerRef_m = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const [rootElement_m, setRootElement_m] = useState<HTMLElement | null>(null);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    root: rootElement ?? undefined,
  });
  const { ref: loadMoreMineRef, inView: inViewMine } = useInView({
    threshold: 0.5,
    root: rootElement_m ?? undefined,
  });

  const { visible } = useScrollDirection({
    elementRef: selectedTab === "1" ? scrollContainerRef : scrollContainerRef_m,
    selectedTab,
  });

  useIntersectionLoadMore({ inView, inViewMine, loadMore, loadMoreMine });

  const handleFeedSelect = useCallback(
    (feedId: string, feed: Feed) => {
      setFeedId(feedId);
      setFeedInfo(feed);
    },
    [setFeedId, setFeedInfo]
  );

  useEffect(() => {
    if (swiperRef.current && typeof swiperRef.current.slideTo === "function") {
      const targetIndex = Number(selectedTab) - 1;
      if (swiperRef.current.activeIndex !== targetIndex) {
        swiperRef.current.slideTo(targetIndex);
      }
    }
  }, [selectedTab]);

  useEffect(() => {
    if (scrollContainerRef.current) setRootElement(scrollContainerRef.current);
    if (scrollContainerRef_m.current)
      setRootElement_m(scrollContainerRef_m.current);
  }, []);

  return (
    <div className="h-dvh pb-safe-bottom">
      <ScrollAwareHeader
        visible={visible}
        mailCount={mailCount}
        isNewNotification={isNewNotification}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />
      <FeedSwiper
        feedAll={feedAll}
        feedMine={feedMine}
        isFetching={isFetching}
        isFetchingMine={isFetchingMine}
        handleAll={handleRefreshAll}
        handleMine={handleRefreshMine}
        loadMoreRef={loadMoreRef}
        loadMoreMineRef={loadMoreMineRef}
        handleFeedSelect={handleFeedSelect}
        userInfo={userInfo}
        swiperRef={swiperRef}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        scrollContainerRef={scrollContainerRef}
        scrollContainerRefMine={scrollContainerRef_m}
      />

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
      <ModalWithReport
        modalState={modalState}
        setModalState={setModalState}
        reportContent={reportContent}
        setReportContent={setReportContent}
        deleteFeed={deleteFeed}
        deleteComment={deleteComment}
        hideFeed={hideFeed}
        onReport={report}
        reportModalOpen={reportModalOpen}
        setReportModalOpen={setReportModalOpen}
      />
    </div>
  );
}
