"use client";
import { useRecoilState } from "recoil";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/atoms/modal";
import { Suspense } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { bottomSheetStateAtom } from "@/atoms/feed";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";
import Spacing from "@/components/shared/Spacing";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { FeedList } from "@/components/feeds/FeedPage/FeedList";
import useHiddenFeed from "@/components/feeds/hooks/useHiddenFeed";
import { NoFeedHidden } from "@/components/feeds/NoFeed";
import ModalWithReport from "@/components/shared/ModalWithReport";

export default function FeedPage() {
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

  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModalOpen, setReportModalOpen] = useRecoilState(reportModalAtom);

  const [reportContent, setReportContent] = useRecoilState(reportInfoAtom);

  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);

  useInfiniteScroll({ isFetching, loadMore });

  return (
    <div className="min-h-dvh">
      <HeaderWithBtn headerLabel="숨김 피드" bgColor="white">
        <div className={styles.tabContainerStyle}>
          <div className={styles.tabWrapperStyle}>
            <TabButton
              title={`숨김 피드`}
              onMouseDown={() => {}}
              current={true}
              fresh={"never"}
            />
            <BottomLine />
          </div>
        </div>
      </HeaderWithBtn>
      <Suspense>
        <Spacing size={96} />
        <div className="pt-safe-top pb-14">
          {hiddenFeed && hiddenFeed.length < 1 && <NoFeedHidden />}
          {hiddenFeed && hiddenFeed.length > 0 && (
            <FeedList
              feeds={hiddenFeed}
              userInfo={false}
              onFeedSelect={handleFeedSelect}
              isFetching={isFetching}
              isMine={true}
            />
          )}
        </div>
      </Suspense>
      {bottomSheetState && (
        <CommentContainer
          selectedFeedId={feedId}
          onClose={() => setBottomSheetState(false)}
        />
      )}
      <ModalWithReport
        modalState={modalState}
        reportModalOpen={reportModalOpen}
        setReportModalOpen={setReportModalOpen}
        setModalState={setModalState}
        reportContent={reportContent}
        setReportContent={setReportContent}
        displayFeed={displayFeed}
        onReport={reportComment}
        deleteComment={deleteComment}
      />
    </div>
  );
}

const styles = {
  tabContainerStyle: "flex w-full px-5 justify-between items-center",
  tabWrapperStyle: "w-fit",
};
