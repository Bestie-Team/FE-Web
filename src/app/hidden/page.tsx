"use client";
import { useRecoilState } from "recoil";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/atoms/modal";
import { Suspense, useEffect, useRef, useState } from "react";
import { bottomSheetStateAtom } from "@/atoms/feed";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import useHiddenFeed from "@/components/feeds/hooks/useHiddenFeed";
import FeedModals from "@/components/feeds/FeedModals";
import HiddenFeedPageHeader from "@/components/hidden/HiddenFeedPageHeader";
import HiddenFeedListSection from "@/components/hidden/HiddenFeedListSection";
import { useIntersectionLoadMore } from "@/components/feeds/hooks/useIntersectionLoadMore";
import { useInView } from "react-intersection-observer";

export default function HiddenPage() {
  const {
    hiddenFeed,
    isFetching,
    loadMore,
    displayFeed,
    reportComment,
    deleteComment,
    handleFeedSelect,
    feedId,
  } = useHiddenFeed();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModalOpen, setReportModalOpen] = useRecoilState(reportModalAtom);
  const [reportContent, setReportContent] = useRecoilState(reportInfoAtom);
  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    root: rootElement ?? undefined,
  });

  useIntersectionLoadMore({ inView, loadMore });

  useEffect(() => {
    if (scrollContainerRef.current) setRootElement(scrollContainerRef.current);
  }, []);

  return (
    <div className="min-h-dvh">
      <HiddenFeedPageHeader />

      <Suspense>
        <HiddenFeedListSection
          loadMoreRef={loadMoreRef}
          scrollContainerRef={scrollContainerRef}
          hiddenFeed={hiddenFeed}
          isFetching={isFetching}
          onFeedSelect={handleFeedSelect}
        />
      </Suspense>

      {bottomSheetState && (
        <CommentContainer
          selectedFeedId={feedId}
          onClose={() => setBottomSheetState(false)}
        />
      )}

      <FeedModals
        modalState={modalState}
        setModalState={setModalState}
        reportModalOpen={reportModalOpen}
        setReportModalOpen={setReportModalOpen}
        reportContent={reportContent}
        setReportContent={setReportContent}
        displayFeed={displayFeed}
        deleteComment={deleteComment}
        onReport={reportComment}
      />
    </div>
  );
}
