"use client";
import { useRecoilState } from "recoil";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/atoms/modal";
import { Suspense } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Modal from "@/components/shared/Modal/Modal";
import { bottomSheetStateAtom } from "@/atoms/feed";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";
import Spacing from "@/components/shared/Spacing";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import MODAL_CONFIGS from "@/constants/modal-configs";
import Report from "@/components/shared/Modal/Report/Report";
import { FeedList } from "@/components/feeds/FeedList";
import useHiddenFeed from "@/components/feeds/hooks/useHiddenFeed";
import { NoFeedHidden } from "@/components/feeds/NoFeed";

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
  const [reportModal, setReportModal] = useRecoilState(reportModalAtom);

  const [report, setReport] = useRecoilState(reportInfoAtom);

  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);

  useInfiniteScroll({ isFetching, loadMore });

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

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
              loadMore={loadMore}
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
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={
            modalState.type === "displayFeed"
              ? () => displayFeed()
              : () => deleteComment()
          }
          onClose={closeModal}
        />
      )}
      {reportModal.isOpen === true && (
        <Report
          type={reportModal.type}
          setReport={setReport}
          report={report}
          handleReport={() => {
            reportComment(report);
            setReportModal((prev) => ({ ...prev, isOpen: false }));
          }}
          onClose={() => setReportModal((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
}

const styles = {
  tabContainerStyle: "flex w-full px-5 justify-between items-center",
  tabWrapperStyle: "w-fit",
};
